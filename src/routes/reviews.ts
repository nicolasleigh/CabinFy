import express from 'express';
import { createReview, getReviews } from '../controllers/reviews.js';
import passport from 'passport';

const router = express.Router();

router.get('/:cabinId', getReviews);
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  createReview
);

export default router;
