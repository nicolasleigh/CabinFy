import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import crypto from 'node:crypto';
import prisma from '../../prisma/client.js';

passport.use(
  'login-admin',
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },

    async (email, password, done) => {
      try {
        const user = await prisma.users.findUnique({
          where: {
            email: email.toLowerCase(),
          },
        });
        if (!user) {
          return done('Incorrect email or password.', false);
        }

        crypto.pbkdf2(
          password,
          user.salt,
          100000,
          32,
          'sha512',
          (err, hashedPassword) => {
            if (err) {
              return done(err, false);
            }
            if (
              !crypto.timingSafeEqual(
                Buffer.from(user.password, 'hex'),
                hashedPassword
              )
            ) {
              return done('Incorrect email or password.', false);
            }
            const data = {
              uid: user.uid,
              username: user.username,
              avatar: user.avatar,
              email: user.email,
              role: user.role,
            };
            return done(null, data);
          }
        );
      } catch (error) {
        done(error, false);
      }
    }
  )
);

passport.use(
  'login-guest',
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
      try {
        const guest = await prisma.guests.findUnique({
          where: {
            email: email.toLowerCase(),
          },
        });
        if (!guest) {
          return done('Incorrect email or password.', false);
        }

        crypto.pbkdf2(
          password,
          guest.salt,
          100000,
          32,
          'sha512',
          (err, hashedPassword) => {
            if (err) {
              return done(err, false);
            }
            if (
              !crypto.timingSafeEqual(
                Buffer.from(guest.password, 'hex'),
                hashedPassword
              )
            ) {
              return done('Incorrect email or password.', false);
            }
            const data = {
              uid: guest.uid,
              fullName: guest.fullName,
              email: guest.email,
            };
            return done(null, data);
          }
        );
      } catch (error) {
        done(error, false);
      }
    }
  )
);

const cookieExtractor = (req: any) => {
  let jwt = null;
  if (req && req.cookies) {
    jwt = req.cookies['jwt-access'];
  }
  return jwt;
};

passport.use(
  new JwtStrategy(
    {
      secretOrKey: process.env.JWT_ACCESS_SECRET,
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: cookieExtractor,
    },
    async (payload, done) => {
      try {
        const { uid, email, fullName } = payload;
        // const guest = await prisma.guests.findUnique({
        //   where: {
        //     uid: payload.sub.uid,
        //   },
        // });
        if (!uid) {
          return done('No such user', false);
        }
        // const data = {
        //   uid: guest.uid,
        //   fullName: guest.fullName,
        //   email: guest.email,
        // };
        return done(null, { uid, email, fullName });
      } catch (error) {
        return done(error, false);
      }
    }
  )
);
