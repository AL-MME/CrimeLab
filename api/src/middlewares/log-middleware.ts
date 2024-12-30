import { Request, Response, NextFunction } from 'express';

export const logMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const date = new Date();
  console.log(`[${date.toISOString()}] ${req.method} ${req.url}`);
  next();
};
