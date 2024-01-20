import express from 'express';
import {
  getUser,
  isAuthenticated,
  updateAvatar,
  updateUser,
} from '../controllers/users.js';
import { resizeAvatar, uploader } from '../middleware/resize.js';
const router = express.Router();

router.get('/', isAuthenticated, getUser);
router.patch('/', isAuthenticated, updateUser);
router.patch(
  '/avatar',
  isAuthenticated,
  uploader.single('avatar'),
  resizeAvatar,
  updateAvatar
);

export default router;
