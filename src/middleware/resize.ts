import { NextFunction, Request, Response } from 'express';
import multer, { FileFilterCallback } from 'multer';
import sharp from 'sharp';
import { v4 as uuid } from 'uuid';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.memoryStorage();

const imagesStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads/'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const filter = (
  req: Request,
  file: { mimetype: string },
  cb: FileFilterCallback
) => {
  if (file.mimetype.split('/')[0] === 'image') {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed!'));
  }
};

export const uploader = multer({
  storage,
  fileFilter: filter,
});

export const imagesUploader = multer({
  storage: imagesStorage,
  fileFilter: filter,
});

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
  const coverPath = path.join(__dirname, `../../uploads/cover-${uuid()}.webp`);
  const filePaths = Array(4)
    .fill('')
    .map(() => path.join(__dirname, `../../uploads/${uuid()}.webp`));

  // const filePath = path.join(__dirname, `../../uploads/${uuid()}.webp`);
  // console.log(req.files.image[0]);
  // console.log(req.files.images);

  await sharp(req.files?.image[0].path)
    .resize(720, 480)
    .webp({ lossless: true })
    .toFile(coverPath);

  await req.files?.images.map((e: any, index: any) => {
    sharp(e.path).resize(720, 480).webp().toFile(filePaths[index]);
  });

  await fs.promises.unlink(req.files?.image[0].path);

  req.files?.images.map(async (e: any) => await fs.promises.unlink(e.path));

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
