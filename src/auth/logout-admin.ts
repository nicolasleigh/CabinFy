import { NextFunction, Request, Response } from 'express';
import prisma from '../../prisma/client.js';

export const signOut = (req: Request, res: Response, next: NextFunction) => {
  res.clearCookie('connect.sid');
  // console.log(req.session);

  return new Promise(async (resolve, reject) => {
    return req.session.destroy(async (err) => {
      if (err) {
        return reject(Error('Logout failed: ' + err.message));
      }

      try {
        await prisma.session.deleteMany({
          where: {
            data: { contains: `"uid":"${req.session?.passport?.user.uid}"` },
          },
        });
      } catch (error) {
        return reject(Error('Logout failed'));
      }
      res.json({ message: 'You are logged out!' });

      return resolve({ value: true });
    });
  });
};
