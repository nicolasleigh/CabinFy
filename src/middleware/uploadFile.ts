import { NextFunction, Request, Response } from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.memoryStorage();
const imagesStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../'));
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

const imagesUploader = multer({
  storage: imagesStorage,
  fileFilter: filter,
  limits: { fileSize: 10000000 },
});

const avatarUploader = multer({
  storage,
  fileFilter: filter,
  limits: { fileSize: 1500000 },
});

export const uploadFiles = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const upload = imagesUploader.fields([
    { name: 'image', maxCount: 1 },
    { name: 'images', maxCount: 4 },
  ]);

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log(err);
      return res.status(400).json({ error: err.message });
    } else if (err) {
      console.log(err);
      return res.status(400).json({ error: err.message });
    }
    next();
  });
};

export const uploadAvatar = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const upload = avatarUploader.single('avatar');

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log(err);
      return res.status(400).json({ error: err.message });
    } else if (err) {
      console.log(err);
      return res.status(400).json({ error: err.message });
    }
    next();
  });
};

export const uploadNone = multer().none();
