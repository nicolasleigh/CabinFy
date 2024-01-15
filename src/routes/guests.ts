import express from 'express';
import { createGuest, getGuests } from '../controllers/guests.js';
const router = express.Router();

router.get('/', getGuests);
router.post('/', createGuest);

export default router;
