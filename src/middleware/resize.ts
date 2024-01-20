import { NextFunction, Request, Response } from 'express';
import multer, { FileFilterCallback } from 'multer';
import sharp from 'sharp';
import { v4 as uuid } from 'uuid';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.memoryStorage();

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
