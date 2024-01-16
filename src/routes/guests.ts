import express from 'express';
import { createGuest, deleteGuest, getGuests } from '../controllers/guests.js';
const router = express.Router();

router.get('/', getGuests);
router.post('/', createGuest);
router.delete('/:id', deleteGuest);

export default router;
