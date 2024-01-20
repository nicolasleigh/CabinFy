import express from 'express';
import { signUp } from '../auth/signUp.js';
import passport from 'passport';
const router = express.Router();
import '../auth/strategy.js';
import { signIn } from '../auth/signIn.js';
import { signOut } from '../auth/signOut.js';

router.post('/login', passport.authenticate('local'), signIn);

router.post('/signup', signUp);

router.get('/logout', signOut);

export default router;
