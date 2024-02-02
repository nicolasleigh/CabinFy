import { NextFunction, Request, Response } from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { v4 as uuid } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const resizeImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const filePath = path.join(__dirname, `../../uploads/${uuid()}.webp`);

  await sharp(req.file?.buffer)
    .resize(720, 480)
    .webp({ lossless: true })
    .toFile(filePath);

  req.body.filePath = filePath;
  next();
};

export const resizeImages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const image = req.files?.image;
  const images = req.files?.images;
  let coverPath;
  let filePaths;

  // const filePath = path.join(__dirname, `../../uploads/${uuid()}.webp`);
  // console.log(req.files.image[0]);
  // console.log(req.files.images);

  if (image) {
    coverPath = path.join(__dirname, `../../uploads/cover-${uuid()}.webp`);

    await sharp(image[0].path)
      .resize(720, 480)
      .webp({ lossless: true })
      .toFile(coverPath);

    await fs.promises.unlink(image[0].path);
  }

  if (images?.length) {
    filePaths = Array(4)
      .fill('')
      .map(() => path.join(__dirname, `../../uploads/${uuid()}.webp`));

    await images.map((e: any, index: any) => {
      sharp(e.path).resize(720, 480).webp().toFile(filePaths[index]);
    });

    images.map(async (e: any) => await fs.promises.unlink(e.path));
  }

  req.body.coverPath = coverPath;
  req.body.filePaths = filePaths;
  next();
};

export const resizeAvatar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const filePath = path.join(__dirname, `../../uploads/${uuid()}.webp`);

  await sharp(req.file?.buffer).resize(240, 240).webp().toFile(filePath);

  req.body.filePath = filePath;
  next();
};
