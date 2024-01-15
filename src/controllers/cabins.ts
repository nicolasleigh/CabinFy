import { NextFunction, Request, Response } from 'express';
import prisma from '../../prisma/client.js';

export const getCabins = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cabins = await prisma.cabins.findMany();
  res.json(cabins);
};

export const createCabin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, description, maxCapacity, regularPrice, discount, filePath } =
    req.body;
  const fileName = filePath.split('/').pop();
  const cabin = await prisma.cabins.create({
    data: {
      name,
      description,
      maxCapacity: parseInt(maxCapacity),
      regularPrice: parseFloat(regularPrice),
      discount: parseFloat(discount),
      image: fileName,
    },
  });
  res.json(cabin);
};

export const updateCabin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, description, maxCapacity, regularPrice, discount, filePath } =
    req.body;
  let fileName;
  if (filePath) fileName = filePath.split('/').pop();

  const cabin = await prisma.cabins.update({
    where: { id: parseInt(req.params.id) },
    data: {
      name,
      description,
      maxCapacity: parseInt(maxCapacity),
      regularPrice: parseFloat(regularPrice),
      discount: parseFloat(discount),
      image: fileName,
    },
  });
  res.json(cabin);
};

export const duplicateCabin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cabin = await prisma.cabins.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  let newCabin;
  if (cabin) {
    newCabin = await prisma.cabins.create({
      data: {
        name: cabin.name + ' Copy',
        description: cabin.description,
        maxCapacity: cabin.maxCapacity,
        regularPrice: cabin.regularPrice,
        discount: cabin.discount,
        image: cabin.image,
      },
    });
  }
  res.json(newCabin);
};

export const deleteCabin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cabin = await prisma.cabins.delete({
    where: { id: parseInt(req.params.id) },
  });
  res.json(cabin);
};
