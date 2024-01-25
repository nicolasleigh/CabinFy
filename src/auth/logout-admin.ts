import { NextFunction, Request, Response } from 'express';

export const signOut = (req: Request, res: Response, next: NextFunction) => {
  res.clearCookie('connect.sid');
  res.json({});
};
