import { NextFunction, Request, Response } from 'express';
import prisma from '../../prisma/client.js';
import { settingSchema } from '../../prisma/validation.js';

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
  const result = settingSchema.safeParse(req.body);
  if (!result.success) {
    console.log(result.error);
    return res.status(400).json({ error: result.error.issues[0].message });
  }
  const {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = result.data;

  try {
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
  } catch (error) {
    return res.json(error);
  }
};

// export const createSetting = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const {
//     minBookingLength,
//     maxBookingLength,
//     maxGuestsPerBooking,
//     breakfastPrice,
//   } = req.body;
//   const newSetting = await prisma.settings.create({
//     data: {
//       minBookingLength,
//       maxBookingLength,
//       maxGuestsPerBooking,
//       breakfastPrice,
//     },
//   });
//   res.json(newSetting);
// };
