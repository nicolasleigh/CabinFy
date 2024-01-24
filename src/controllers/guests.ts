import { NextFunction, Request, Response } from 'express';
import prisma from '../../prisma/client.js';
import crypto from 'node:crypto';
import { salt } from '../auth/signUp.js';
import { v4 as uuid } from 'uuid';

export const getGuests = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const guests = await prisma.guests.findMany();
  res.json(guests);
};

export const createGuest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { fullName, email, nationalId } = req.body;
  const guest = await prisma.guests.create({
    data: {
      fullName,
      email,
      nationalId,
    },
  });
  res.json(guest);
};

export const deleteGuest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const guest = await prisma.guests.delete({
    where: {
      id: Number(id),
    },
  });
  res.json(guest);
};

export const signupGuest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { fullName, email, password, user } = req.body;
  const ip = req.ip;
  const exist = await prisma.guests.findUnique({
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
      const user = await prisma.guests.create({
        data: {
          fullName,
          email: email.toLowerCase(),
          password: hashedPassword.toString('hex'),
          salt,
          ip,
          uid: uuid(),
        },
      });
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        // res.redirect('/');
        return res.json(user);
      });
    }
  );
};
