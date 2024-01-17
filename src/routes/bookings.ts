import express from 'express';
import {
  createBooking,
  deleteBooking,
  getBooking,
  getBookings,
  getBookingsAfterDate,
  getStaysAfterDate,
  getTodayActivity,
  updateBooking,
} from '../controllers/bookings.js';
const router = express.Router();

router.get('/', getBookings);
router.get('/after-date', getBookingsAfterDate);
router.get('/stays-after-date', getStaysAfterDate);
router.get('/today-activity', getTodayActivity);
router.get('/:id', getBooking);
router.patch('/:id', updateBooking);
router.post('/', createBooking);
router.delete('/:id', deleteBooking);

export default router;
