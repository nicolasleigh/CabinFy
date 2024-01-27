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

export const getCabin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cabin = await prisma.cabins.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  res.json(cabin);
};

export const createCabin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    name,
    description,
    bedroom,
    regularPrice,
    discount,
    filePaths,
    coverPath,
  } = req.body;
  console.log(filePaths, coverPath);
  const coverName = coverPath.split('/').pop();
  const fileNameJson = [
    { fileName: filePaths[0].split('/').pop() },
    { fileName: filePaths[1].split('/').pop() },
    { fileName: filePaths[2].split('/').pop() },
    { fileName: filePaths[3].split('/').pop() },
  ];
  const cabin = await prisma.cabins.create({
    data: {
      name,
      description,
      bedroom: parseInt(bedroom),
      regularPrice: parseFloat(regularPrice),
      discount: parseFloat(discount),
      image: coverName,
      images: fileNameJson,
    },
  });
  res.json(cabin);
};

export const updateCabin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, description, bedroom, regularPrice, discount, filePath } =
    req.body;
  let fileName;
  if (filePath) fileName = filePath.split('/').pop();

  const cabin = await prisma.cabins.update({
    where: { id: parseInt(req.params.id) },
    data: {
      name,
      description,
      bedroom: parseInt(bedroom),
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
        bedroom: cabin.bedroom,
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
