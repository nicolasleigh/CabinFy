import prisma from '../../prisma/client.js';
import crypto from 'node:crypto';
import { NextFunction, Request, Response } from 'express';
import { v4 as uuid } from 'uuid';

export const salt = crypto.randomBytes(16).toString('hex');

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password, user } = req.body;
  const ip = req.ip;
  const exist = await prisma.users.findUnique({
    where: {
      email: email.toLowerCase(),
    },
  });
  if (exist) {
    return res.status(400).json({ error: 'Email already exists!' });
  }
  crypto.pbkdf2(
    password,
    salt,
    100000,
    32,
    'sha512',
    async (err, hashedPassword) => {
      if (err) {
        return next(err);
      }
      const user = await prisma.users.create({
        data: {
          username,
          email: email.toLowerCase(),
          password: hashedPassword.toString('hex'),
          salt,
          ip,
          uid: uuid(),
        },
      });
      req.login(user, (err) => {
        if (err) {
          return next(err);
        }
        const data = {
          uid: user.uid,
          username: user.username,
          avatar: user.avatar,
          email: user.email,
          role: user.role,
        };
        return res.json(data);
      });
    }
  );
};
