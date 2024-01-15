import express, { NextFunction, Request, Response } from 'express';
import { resizeImage, uploader } from '../middleware/resize.js';
import {
  createCabin,
  deleteCabin,
  duplicateCabin,
  getCabins,
  updateCabin,
} from '../controllers/cabins.js';
import { hasImage } from '../middleware/hasImage.js';
const router = express.Router();

router.get('/', getCabins);
router.post('/', uploader.single('image'), resizeImage, createCabin);
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
