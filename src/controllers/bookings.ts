import { NextFunction, Request, Response } from 'express';
import prisma from '../../prisma/client.js';

export const createBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    cabinId,
    guestId,
    startDate,
    endDate,
    hasBreakfast,
    numGuests,
    numNights,
    totalPrice,
    cabinPrice,
    extrasPrice,
    isPaid,
    observation,
    status,
  } = req.body;
  const booking = await prisma.bookings.create({
    data: {
      cabinId: parseInt(cabinId),
      guestId: parseInt(guestId),
      startDate,
      endDate,
      hasBreakfast,
      isPaid,
      numGuests: parseInt(numGuests),
      numNights: parseInt(numNights),
      status,
      observation,
      cabinPrice: parseFloat(cabinPrice),
      extrasPrice: parseFloat(extrasPrice),
      totalPrice: parseFloat(totalPrice),
    },
  });
  res.json(booking);
};
