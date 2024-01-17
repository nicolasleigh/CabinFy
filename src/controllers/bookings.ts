import { NextFunction, Request, Response } from 'express';
import prisma from '../../prisma/client.js';
import { RequestHandler } from 'express';
import { DateValues } from 'date-fns';

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

interface Query {
  filter: {
    field: string;
    value: string;
  };
  sortBy: {
    field: string;
    direction: string;
  };
  page: number;
}

export const getBookings = async (
  req: Request<{}, {}, {}, Query>,
  res: Response,
  next: NextFunction
) => {
  const { filter, sortBy, page } = req.query;

  const bookings = await prisma.bookings.findMany({
    where: {
      [filter?.field]: filter?.value,
    },
    orderBy: {
      [sortBy.field]: sortBy.direction,
    },
    include: {
      guest: true,
      cabin: true,
    },
    skip: (page - 1) * 10,
    take: 10,
  });

  const count = await prisma.bookings.count({
    where: {
      [filter?.field]: filter?.value,
    },
  });

  res.json({ bookings, count });
};

export const getBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const booking = await prisma.bookings.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      guest: true,
      cabin: true,
    },
  });
  res.json(booking);
};

export const updateBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { isPaid, status, hasBreakfast, extrasPrice, totalPrice } = req.body;
  const booking = await prisma.bookings.update({
    where: {
      id: parseInt(id),
    },
    data: {
      isPaid,
      status,
      hasBreakfast,
      extrasPrice: extrasPrice && parseFloat(extrasPrice),
      totalPrice: totalPrice && parseFloat(totalPrice),
    },
  });
  res.json(booking);
};

export const deleteBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const booking = await prisma.bookings.delete({
    where: {
      id: parseInt(id),
    },
  });
  res.json(booking);
};

interface DateQuery {
  date: string;
}

export const getBookingsAfterDate = async (
  req: Request<{}, {}, {}, DateQuery>,
  res: Response,
  next: NextFunction
) => {
  const { date } = req.query;
  const bookings = await prisma.bookings.findMany({
    where: {
      created_at: {
        gte: date,
      },
    },
    select: {
      created_at: true,
      totalPrice: true,
      extrasPrice: true,
    },
  });
  res.json(bookings);
};

export const getStaysAfterDate = async (
  req: Request<{}, {}, {}, DateQuery>,
  res: Response,
  next: NextFunction
) => {
  const { date } = req.query;
  const bookings = await prisma.bookings.findMany({
    where: {
      created_at: {
        gte: date,
        lte: new Date().toISOString(),
      },
    },
    include: {
      guest: true,
    },
  });
  res.json(bookings);
};

export const getTodayActivity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const today = new Date().toISOString().slice(0, 10);
  const bookings = await prisma.bookings.findMany({
    where: {
      OR: [
        {
          startDate: {
            equals: new Date(today),
          },
          status: {
            equals: 'unconfirmed',
          },
        },
        {
          endDate: {
            equals: new Date(today),
          },
          status: {
            equals: 'checked-in',
          },
        },
      ],
    },
    include: {
      guest: true,
    },
    orderBy: {
      created_at: 'asc',
    },
  });
  res.json(bookings);
};
