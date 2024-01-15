import { NextFunction, Request, Response } from 'express';
import prisma from '../../prisma/client.js';

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
