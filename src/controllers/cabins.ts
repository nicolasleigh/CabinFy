import { NextFunction, Request, Response } from 'express';
import prisma from '../../prisma/client.js';
import { cabinSchema } from '../../prisma/validation.js';

export const getCabins = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cabins = await prisma.cabins.findMany();
    res.json(cabins);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getCabin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cabin = await prisma.cabins.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    res.json(cabin);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const createCabin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = cabinSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.issues[0].message });
  }
  const { name, location, bedroom, regularPrice, discount } = result.data;
  const { filePaths, coverPath } = req.body;
  let coverName;
  let fileNameJson;
  if (coverPath) {
    coverName = coverPath.split('/').pop();
  }
  if (filePaths) {
    fileNameJson = [
      { fileName: filePaths[0].split('/').pop() },
      { fileName: filePaths[1].split('/').pop() },
      { fileName: filePaths[2].split('/').pop() },
      { fileName: filePaths[3].split('/').pop() },
    ];
  }

  try {
    const cabin = await prisma.cabins.create({
      data: {
        name,
        location,
        bedroom,
        regularPrice,
        discount,
        image: coverName,
        images: fileNameJson,
      },
    });
    res.json(cabin);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const updateCabin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = cabinSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.issues[0].message });
  }
  const { name, location, bedroom, regularPrice, discount } = result.data;
  const { filePaths, coverPath } = req.body;

  let coverName;
  let fileNameJson;
  if (coverPath) {
    coverName = coverPath.split('/').pop();
  }
  if (filePaths) {
    fileNameJson = [
      { fileName: filePaths[0].split('/').pop() },
      { fileName: filePaths[1].split('/').pop() },
      { fileName: filePaths[2].split('/').pop() },
      { fileName: filePaths[3].split('/').pop() },
    ];
  }

  try {
    const cabin = await prisma.cabins.update({
      where: { id: parseInt(req.params.id) },
      data: {
        name,
        location,
        bedroom,
        regularPrice,
        discount,
        image: coverName,
        images: fileNameJson,
      },
    });
    res.json(cabin);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const duplicateCabin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cabin = await prisma.cabins.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  if (!cabin) return res.status(404).json({ error: 'Cabin not found' });
  try {
    const newCabin = await prisma.cabins.create({
      data: {
        name: cabin.name + ' Copy',
        location: cabin.location,
        bedroom: cabin.bedroom,
        regularPrice: cabin.regularPrice,
        discount: cabin.discount,
        image: cabin.image,
        images: cabin.images,
      },
    });
    res.json(newCabin);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const deleteCabin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cabin = await prisma.cabins.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json(cabin);
  } catch (error) {
    res.status(400).json(error);
  }
};
