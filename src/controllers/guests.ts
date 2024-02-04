import { NextFunction, Request, Response } from 'express';
import prisma from '../../prisma/client.js';
import crypto from 'node:crypto';
import { salt } from '../auth/signup-admin.js';
import { v4 as uuid } from 'uuid';
import jwt from 'jsonwebtoken';
import { guestSchema } from '../../prisma/validation.js';

export const accessTokenExp = '1d';
// export const refreshTokenExp = '30d';
export const accessCookieExp = 1 * 24 * 60 * 60 * 1000;
// export const refreshCookieExp = 30 * 24 * 60 * 60 * 1000;

export const getGuests = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const guests = await prisma.guests.findMany();
  res.json(guests);
};

export const getGuest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json(req.user);
};

// export const createGuest = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const { fullName, email, nationalId } = req.body;
//   const guest = await prisma.guests.create({
//     data: {
//       fullName,
//       email,
//     },
//   });
//   res.json(guest);
// };

// export const deleteGuest = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const { id } = req.params;
//   const guest = await prisma.guests.delete({
//     where: {
//       id: Number(id),
//     },
//   });
//   res.json(guest);
// };

export const signupGuest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = guestSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.issues[0].message });
  }
  const { fullName, email, password } = result.data;

  const ip = req.ip;
  const exist = await prisma.guests.findUnique({
    where: {
      email: email.toLowerCase(),
    },
  });
  if (exist) {
    return res.status(400).json({ error: 'Email already exists!' });
  }
  crypto.pbkdf2(
    password,
    salt,
    100000,
    32,
    'sha512',
    async (err, hashedPassword) => {
      if (err) {
        return next(err);
      }
      const guest = await prisma.guests.create({
        data: {
          fullName,
          email: email.toLowerCase(),
          password: hashedPassword.toString('hex'),
          salt,
          ip,
          uid: uuid(),
        },
      });

      req.login(guest, { session: false }, async (error) => {
        if (error) return next(error);

        const accessToken = jwt.sign(
          { uid: guest.uid, email: guest.email, fullName: guest.fullName },
          process.env.JWT_ACCESS_SECRET!,
          {
            expiresIn: accessTokenExp,
          }
        );
        // const refreshToken = jwt.sign(
        //   { uid: guest.uid },
        //   process.env.JWT_REFRESH_SECRET!,
        //   {
        //     expiresIn: refreshTokenExp,
        //   }
        // );
        // res.cookie('jwt-refresh', refreshToken, {
        //   httpOnly: true,
        //   // secure: true,   //! for https
        //   maxAge: refreshCookieExp,
        // });
        res.cookie('jwt-access', accessToken, {
          httpOnly: true,
          secure: true, //! for https
          maxAge: accessCookieExp,
        });

        const data = {
          uid: guest.uid,
          fullName: guest.fullName,
          email: guest.email,
          // accessToken,
        };

        return res.json(data);
      });
    }
  );
};

export const loginGuest = (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  const { uid, email, fullName } = req.user;
  const accessToken = jwt.sign(
    { uid, email, fullName },
    process.env.JWT_ACCESS_SECRET!,
    {
      expiresIn: accessTokenExp,
    }
  );
  // const refreshToken = jwt.sign({ uid }, process.env.JWT_REFRESH_SECRET!, {
  //   expiresIn: refreshTokenExp,
  // });
  // res.cookie('jwt-refresh', refreshToken, {
  //   httpOnly: true,
  //   // secure: true,   //! for https
  //   maxAge: refreshCookieExp,
  // });
  res.cookie('jwt-access', accessToken, {
    httpOnly: true,
    secure: true, //! for https
    maxAge: accessCookieExp,
  });

  const data = {
    uid,
    email,
    fullName,
    // accessToken,
  };

  return res.json(data);
};

// export const getRefreshToken = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const refreshToken = req.cookies.jwt;
//   if (!refreshToken) {
//     return res.status(401).json({ error: 'You are not authenticated!' });
//   }
//   let payload: any;
//   try {
//     payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!);
//   } catch (err) {
//     return res.status(401).json({ error: 'You are not authenticated!' });
//   }
//   const guest = await prisma.guests.findUnique({
//     where: {
//       uid: payload.uid,
//     },
//   });
//   if (!guest) {
//     return res.status(401).json({ error: 'You are not authenticated!' });
//   }
//   const accessToken = jwt.sign(
//     { uid: guest.uid, email: guest.email, fullName: guest.fullName },
//     process.env.JWT_ACCESS_SECRET!,
//     {
//       expiresIn: accessTokenExp,
//     }
//   );
//   res.cookie('jwt-access', accessToken, {
//     httpOnly: true,
//     // secure: true,   //! for https
//     maxAge: accessCookieExp,
//   });
//   const data = {
//     uid: guest.uid,
//     fullName: guest.fullName,
//     email: guest.email,
//     // accessToken,
//   };
//   return res.json(data);
// };

export const logoutGuest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // res.clearCookie('jwt-refresh');
  res.clearCookie('jwt-access');
  res.json({ message: 'You are logged out!' });
};
