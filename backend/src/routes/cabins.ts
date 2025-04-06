import express from "express";
import {
  createCabin,
  deleteCabin,
  duplicateCabin,
  getCabin,
  getCabins,
  updateCabin,
  updateCabinWithoutImage,
} from "../controllers/cabins.js";
import { uploadNone } from "../middleware/uploadFile.js";
import { uploadImage } from "../middleware/multer.js";
const router = express.Router();

router.get("/", getCabins);
router.get("/:id", getCabin);
router.post(
  "/",
  uploadImage.fields([
    { name: "image", maxCount: 1 },
    { name: "images", maxCount: 4 },
  ]),
  createCabin
);
router.post("/:id/duplicate", duplicateCabin);
router.patch("/without-image/:id", uploadNone, updateCabinWithoutImage);
router.patch(
  "/:id",
  uploadImage.fields([
    { name: "image", maxCount: 1 },
    { name: "images", maxCount: 4 },
  ]),
  updateCabin
);
router.delete("/:id", deleteCabin);

export default router;
