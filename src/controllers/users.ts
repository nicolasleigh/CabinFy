import { NextFunction, Request, Response } from 'express';
import prisma from '../../prisma/client.js';
import { salt } from '../auth/signup-admin.js';
import crypto from 'node:crypto';
import { Resend } from 'resend';

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.json(req.user);
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;
  if (!password) {
    try {
      const data = await prisma.users.update({
        // @ts-ignore
        where: { uid: req.user?.uid },
        data: {
          username,
        },
      });
      const user = {
        uid: data.uid,
        username: data.username,
        avatar: data.avatar,
        email: data.email,
        role: data.role,
      };
      // @ts-ignore
      req.session.passport.user = user;
      req.session.save();
      return res.json({});
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  crypto.pbkdf2(
    password,
    salt,
    100000,
    32,
    'sha512',
    async (err, hashedPassword) => {
      const data = await prisma.users.update({
        // @ts-ignore
        where: { uid: req.user?.uid },
        data: {
          username,
          password: hashedPassword.toString('hex'),
          salt,
        },
      });
      const user = {
        uid: data.uid,
        username: data.username,
        avatar: data.avatar,
        email: data.email,
        role: data.role,
      };
      // @ts-ignore
      req.session.passport.user = user;
      req.session.save();
      return res.json({});
    }
  );
};

export const updateAvatar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { filePath } = req.body;
  try {
    const fileName = filePath.split('/').pop();
    const data = await prisma.users.update({
      // @ts-ignore
      where: { uid: req.user.uid },
      data: {
        avatar: fileName,
      },
    });
    const user = {
      uid: data.uid,
      username: data.username,
      avatar: data.avatar,
      email: data.email,
      role: data.role,
    };
    // @ts-ignore
    req.session.passport.user = user;
    req.session.save();
    return res.json({});
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const forgetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { email } = req.body;
  const user = await prisma.users.findUnique({
    where: {
      email: email.toLowerCase(),
    },
  });
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const token = crypto.randomBytes(32).toString('hex');
  const expire = +new Date() + 5 * 60 * 1000; // 5 minutes

  const newUser = await prisma.users.update({
    where: {
      email: email.toLowerCase(),
    },
    data: {
      token,
      token_exp: new Date(expire),
    },
  });
  const { error } = await resend.emails.send({
    from: `Nicolas-Hotel@linze.me`,
    to: email,
    subject: 'Rest Password',
    html: `<p>Click the following link to reset your password: <br> <a href=${process.env.PASS_RESET_BASE_URL}${newUser.uid}/${token}>rest password link</a> <p>`,
  });

  if (error) return res.status(500).json({ error: 'Fail to send email' });

  res.json({ message: 'Email sent' });
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { uid, token } = req.params;
  const { password } = req.body;

  const user = await prisma.users.findUnique({
    where: {
      uid,
    },
  });
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  if (user.token !== token) {
    return res.status(404).json({ error: 'Token not found' });
  }

  if (user.token_exp! < new Date()) {
    return res.status(404).json({ error: 'Token expired' });
  }

  crypto.pbkdf2(
    password,
    salt,
    100000,
    32,
    'sha512',
    async (err, hashedPassword) => {
      const newUser = await prisma.users.update({
        where: {
          uid,
        },
        data: {
          password: hashedPassword.toString('hex'),
          salt,
          token: null,
          token_exp: null,
        },
      });
      req.logIn(newUser, (err) => {
        if (err) {
          return next(err);
        }
        return res.json(newUser);
      });
    }
  );
};
