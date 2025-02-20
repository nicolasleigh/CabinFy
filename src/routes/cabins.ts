import express from 'express';
import {
  createCabin,
  deleteCabin,
  duplicateCabin,
  getCabin,
  getCabins,
  updateCabin,
} from '../controllers/cabins.js';
import { resizeImages } from '../middleware/resize.js';
import { uploadFiles, uploadNone } from '../middleware/uploadFile.js';
const router = express.Router();

router.get('/', getCabins);
router.get('/:id', getCabin);
router.post('/', uploadFiles, resizeImages, createCabin);
router.post('/:id/duplicate', duplicateCabin);
router.patch('/without-image/:id', uploadNone, updateCabin);
router.patch('/:id', uploadFiles, resizeImages, updateCabin);
router.delete('/:id', deleteCabin);

export default router;
