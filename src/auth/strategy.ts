import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import crypto from 'node:crypto';
import prisma from '../../prisma/client.js';

passport.use(
  'local',
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
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
        function (err, hashedPassword) {
          if (err) {
            return done(err, false);
            // return done(
            //   {
            //     error:
            //       'Your login details could not be verified. Please try again.',
            //   },
            //   false
            // );
          }
          if (
            !crypto.timingSafeEqual(
              Buffer.from(user.password, 'hex'),
              hashedPassword
            )
          ) {
            // return done(null, false, {
            //   message: 'Incorrect email or password.',
            // });
            return done('Incorrect email or password.', false);
            // return done(
            //   {
            //     error:
            //       'Your login details could not be verified. Please try again.',
            //   },
            //   false
            // );
          }
          return done(null, user);
        }
      );
    }
  )
);
