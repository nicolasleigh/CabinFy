import { NextFunction, Request, Response } from 'express';
import prisma from '../../prisma/client.js';
import { salt } from '../auth/signUp.js';
import crypto from 'node:crypto';

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
  // console.log(req.user);
  return res.json(req.user);
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;
  if (!password) {
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
};
