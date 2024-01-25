import express from 'express';
import { signUp } from '../auth/signup-admin.js';
import passport from 'passport';
const router = express.Router();
import '../auth/strategy.js';
import { signIn } from '../auth/login-admin.js';
import { signOut } from '../auth/logout-admin.js';
import { forgetPassword, resetPassword } from '../controllers/users.js';

router.post('/login', passport.authenticate('login-admin'), signIn);
router.post('/signup', signUp);
router.post('/reset-password/:uid/:token', resetPassword);
router.post('/forget-password', forgetPassword);
router.get('/logout', signOut);

export default router;
