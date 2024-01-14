import express from 'express';
import {
  createSetting,
  getSettings,
  updateSetting,
} from '../controllers/settings';
const router = express.Router();

router.get('/', getSettings);
router.post('/', createSetting);
router.patch('/', updateSetting);

export default router;
