import { NextFunction, Request, Response } from 'express';
import { resizeImage, uploader } from '../middleware/resize.js';
import { updateCabin } from '../controllers/cabins.js';

export const hasImage = (req: Request, res: Response, next: NextFunction) => {
  if (!req.file) {
    updateCabin(req, res, next);
    return;
  }
  next();
};
