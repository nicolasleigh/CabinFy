import express from 'express';
import {
  // deleteGuest,
  getGuest,
  getGuests,
  // getRefreshToken,
  loginGuest,
  logoutGuest,
  signupGuest,
} from '../controllers/guests.js';
import passport from 'passport';
const router = express.Router();

router.get('/', getGuests);
router.get(
  '/single',
  passport.authenticate('jwt', { session: false }),
  getGuest
);
// router.get('/token', getRefreshToken);
// router.post('/', createGuest);
// router.delete('/:id', deleteGuest);
router.get('/logout', logoutGuest);
router.post('/signup', signupGuest);
router.post(
  '/login',
  passport.authenticate('login-guest', { session: false }),
  loginGuest
);

export default router;
