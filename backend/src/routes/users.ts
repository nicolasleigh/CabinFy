import express from "express";
import { getUser, isAuthenticated, updateAvatar, updateUser } from "../controllers/users.js";
import { uploadImage } from "../middleware/multer.js";
const router = express.Router();

router.get("/", isAuthenticated, getUser);
router.patch("/", isAuthenticated, updateUser);
router.patch("/avatar", isAuthenticated, uploadImage.single("avatar"), updateAvatar);

export default router;
