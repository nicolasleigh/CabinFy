import express from 'express';
import { signUp } from '../auth/signUp.js';
import passport from 'passport';
const router = express.Router();
import '../auth/strategy.js';
import { signIn } from '../auth/signIn.js';
import { signOut } from '../auth/signOut.js';
import { forgetPassword, resetPassword } from '../controllers/users.js';

router.post('/login', passport.authenticate('local'), signIn);
router.post('/signup', signUp);
router.post('/reset-password/:uid/:token', resetPassword);
router.post('/forget-password', forgetPassword);
router.get('/logout', signOut);

export default router;
