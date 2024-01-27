import prisma from '../../prisma/client.js';
import { Request, Response } from 'express';

export const getReviews = async (req: Request, res: Response) => {
  const reviews = await prisma.reviews.findMany({
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
  const { guestId, cabinId, rating, comment } = req.body;
  const review = await prisma.reviews.create({
    data: {
      guestId: guestId,
      cabinId: parseInt(cabinId),
      rating: parseInt(rating),
      comment,
    },
  });
  res.json(review);
};
