import { NextFunction, Request, Response } from 'express';
import prisma from '../../prisma/client';

export const getSettings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const settings = await prisma.settings.findUnique({
    where: { id: 1 },
  });
  res.json(settings);
};

export const updateSetting = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;
  let minBookingLength;
  let maxBookingLength;
  let maxGuestsPerBooking;
  let breakfastPrice;
  if (data.minBookingLength) {
    minBookingLength = parseInt(data.minBookingLength);
  }
  if (data.maxBookingLength) {
    maxBookingLength = parseInt(data.maxBookingLength);
  }
  if (data.maxGuestsPerBooking) {
    maxGuestsPerBooking = parseInt(data.maxGuestsPerBooking);
  }
  if (data.breakfastPrice) {
    breakfastPrice = parseInt(data.breakfastPrice);
  }

  const updatedSettings = await prisma.settings.update({
    where: { id: 1 },
    data: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    },
  });
  res.json(updatedSettings);
};

export const createSetting = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = req.body;
  const newSetting = await prisma.settings.create({
    data: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    },
  });
  res.json(newSetting);
};
