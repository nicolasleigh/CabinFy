import express from 'express';
import { createReview, getRate, getReviews } from '../controllers/reviews.js';
import passport from 'passport';

const router = express.Router();

router.get('/:cabinId', getReviews);
router.get('/', getRate);
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  createReview
);

export default router;
