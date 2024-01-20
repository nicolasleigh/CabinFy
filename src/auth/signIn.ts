import { NextFunction, Request, Response } from 'express';

export const signIn = (req: Request, res: Response, next: NextFunction) => {
  const data = {
    uid: req.user?.uid,
    username: req.user?.username,
    avatar: req.user?.avatar,
    email: req.user?.email,
    role: req.user?.role,
  };
  res.json(data);
};
