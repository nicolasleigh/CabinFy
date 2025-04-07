import { NextFunction, Request, Response } from "express";
import prisma from "../../prisma/client.js";
import { cabinSchema } from "../../prisma/validation.js";
import cloudinary from "../utils/cloudinary.js";

export const getCabins = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cabins = await prisma.cabins.findMany();
    res.json(cabins);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getCabin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cabin = await prisma.cabins.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    res.json(cabin);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const createCabin = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.files) {
    return res.status(400).json("File is missing");
  }

  const result = cabinSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.issues[0].message });
  }
  const { name, location, bedroom, regularPrice, discount } = result.data;
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const image = files.image;
  const images = files.images;

  let coverImageUrl = "";
  let imagesUrlJson = [];

  if (image[0]) {
    const { secure_url: url } = await cloudinary.uploader.upload(image[0].path, {
      transformation: {
        width: 720,
        height: 480,
      },
      folder: "cabins",
    });
    coverImageUrl = url;
  }

  if (images) {
    for (let i = 0; i < images.length; i++) {
      const { secure_url: url } = await cloudinary.uploader.upload(images[i].path, {
        transformation: {
          width: 720,
          height: 480,
        },
        folder: "cabins",
      });
      imagesUrlJson.push({ url: url });
    }
  }

  try {
    const cabin = await prisma.cabins.create({
      data: {
        name,
        location,
        bedroom,
        regularPrice,
        discount,
        image: coverImageUrl,
        images: imagesUrlJson,
      },
    });
    res.json(cabin);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const updateCabin = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.files) {
    return res.status(400).json("File is missing");
  }
  const result = cabinSchema.safeParse(req.body);
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const image = files.image;
  const images = files.images;

  if (!result.success) {
    return res.status(400).json({ error: result.error.issues[0].message });
  }
  const { name, location, bedroom, regularPrice, discount } = result.data;
  // const { filePaths, coverPath } = req.body;

  const cabin = await prisma.cabins.findUnique({ where: { id: parseInt(req.params.id) } });

  let coverImageUrl = cabin?.image;
  let imagesUrls: { url: string }[] = cabin?.images as { url: string }[];

  if (image && image[0]) {
    const { secure_url: url } = await cloudinary.uploader.upload(image[0].path, {
      transformation: {
        width: 720,
        height: 480,
      },
      folder: "cabins",
    });
    coverImageUrl = url;
  }

  if (images) {
    imagesUrls = [];
    for (let i = 0; i < images.length; i++) {
      const { secure_url: url } = await cloudinary.uploader.upload(images[i].path, {
        transformation: {
          width: 720,
          height: 480,
        },
        folder: "cabins",
      });
      imagesUrls.push({ url: url });
    }
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
        image: coverImageUrl,
        images: imagesUrls,
      },
    });
    res.json(cabin);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const updateCabinWithoutImage = async (req: Request, res: Response, next: NextFunction) => {
  const result = cabinSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ error: result.error.issues[0].message });
  }
  const { name, location, bedroom, regularPrice, discount } = result.data;

  try {
    const cabin = await prisma.cabins.update({
      where: { id: parseInt(req.params.id) },
      data: {
        name,
        location,
        bedroom,
        regularPrice,
        discount,
      },
    });
    res.json(cabin);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const duplicateCabin = async (req: Request, res: Response, next: NextFunction) => {
  const cabin = await prisma.cabins.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  if (!cabin) return res.status(404).json({ error: "Cabin not found" });
  try {
    const newCabin = await prisma.cabins.create({
      data: {
        name: cabin.name + " Copy",
        location: cabin.location,
        bedroom: cabin.bedroom,
        regularPrice: cabin.regularPrice,
        discount: cabin.discount,
        image: cabin.image,
        // @ts-ignore
        images: cabin.images,
      },
    });
    res.json(newCabin);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const deleteCabin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cabin = await prisma.cabins.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json(cabin);
  } catch (error) {
    res.status(400).json(error);
  }
};
