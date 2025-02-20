import express from 'express';
import {
  getUser,
  isAuthenticated,
  updateAvatar,
  updateUser,
} from '../controllers/users.js';
import { resizeAvatar } from '../middleware/resize.js';
import { uploadAvatar } from '../middleware/uploadFile.js';
const router = express.Router();

router.get('/', isAuthenticated, getUser);
router.patch('/', isAuthenticated, updateUser);
router.patch(
  '/avatar',
  isAuthenticated,
  uploadAvatar,
  resizeAvatar,
  updateAvatar
);

export default router;
