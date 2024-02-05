import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import 'dotenv/config';
import mountRoutes from './src/routes/index.js';
import passport from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { config } from './src/utils/sessionConfig.js';

export const app = express();

passport.serializeUser<any, any>((user, done) => {
  // @ts-ignore
  done(null, {
    uid: user.uid,
    avatar: user.avatar,
    email: user.email,
    username: user.username,
    role: user.role,
  });
});

passport.deserializeUser<any, any>((user, done) => {
  done(null, {
    uid: user.uid,
    avatar: user.avatar,
    email: user.email,
    username: user.username,
    role: user.role,
  });
});

// if (app.get('env') === 'production') {
//   app.set('trust proxy', 1);
//   config.cookie.secure = true;
// }

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static('uploads'));
app.use(session(config));
app.use(passport.initialize());
app.use(passport.session());

mountRoutes(app);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
