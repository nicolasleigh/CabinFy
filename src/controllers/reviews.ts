import prisma from '../../prisma/client.js';
import { Request, Response } from 'express';
import { reviewSchema } from '../../prisma/validation.js';

export const getReviews = async (req: Request, res: Response) => {
  const { cabinId } = req.params;
  if (!cabinId) return res.json({ error: 'Invalid cabin id' });

  const reviews = await prisma.reviews.findMany({
    where: {
      cabinId: parseInt(cabinId),
    },
    include: {
      guest: {
        select: {
          uid: true,
          fullName: true,
        },
      },
    },
  });
  res.json(reviews);
};

export const createReview = async (req: Request, res: Response) => {
  // @ts-ignore
  const { uid } = req.user;
  if (!uid) return res.json({ error: 'Invalid user id' });

  const result = reviewSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.issues[0].message });
  }

  const { rating, comment } = result.data;
  const { cabinId } = req.body;
  if (!cabinId) return res.json({ error: 'Invalid cabin id' });

  try {
    const review = await prisma.reviews.create({
      data: {
        guestId: uid,
        cabinId: parseInt(cabinId),
        rating,
        comment,
      },
    });
    res.json(review);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getRate = async (req: Request, res: Response) => {
  try {
    const group = await prisma.reviews.groupBy({
      by: ['cabinId'],
      _avg: {
        rating: true,
      },
      orderBy: {
        cabinId: 'asc',
      },
    });
    res.json(group);
  } catch (error) {
    res.status(400).json(error);
  }
};
