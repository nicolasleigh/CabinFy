import express from 'express';
import {
  createBooking,
  deleteBooking,
  getBooking,
  getBookingByCabinId,
  getBookings,
  getBookingsAfterDate,
  getStaysAfterDate,
  getTodayActivity,
  updateBooking,
} from '../controllers/bookings.js';
import passport from 'passport';
const router = express.Router();

router.get('/', getBookings);
router.get('/after-date', getBookingsAfterDate);
router.get('/stays-after-date', getStaysAfterDate);
router.get('/today-activity', getTodayActivity);
router.get('/:id', getBooking);
router.get('/cabin/:id', getBookingByCabinId);
router.patch('/:id', updateBooking);
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  createBooking
);
router.delete('/:id', deleteBooking);

export default router;
