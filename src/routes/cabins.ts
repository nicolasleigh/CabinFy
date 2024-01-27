import express, { NextFunction, Request, Response } from 'express';
import {
  imagesUploader,
  resizeImage,
  resizeImages,
  uploader,
} from '../middleware/resize.js';
import {
  createCabin,
  deleteCabin,
  duplicateCabin,
  getCabin,
  getCabins,
  updateCabin,
} from '../controllers/cabins.js';
import { hasImage } from '../middleware/hasImage.js';
const router = express.Router();

router.get('/', getCabins);
router.get('/:id', getCabin);
router.post(
  '/',
  imagesUploader.fields([
    { name: 'image', maxCount: 1 },
    { name: 'images', maxCount: 4 },
  ]),
  resizeImages,
  createCabin
);
router.post('/:id/duplicate', duplicateCabin);
router.patch(
  '/:id',
  uploader.single('image'),
  hasImage,
  resizeImage,
  updateCabin
);
router.delete('/:id', deleteCabin);

export default router;
