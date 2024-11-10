import type { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../errors/UnauthorizedError.js';
import { varifyJwt } from '../utils/jwt.util.js';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    throw new UnauthorizedError({ message: 'Token not found' });
  }

  req.user = varifyJwt(token);
  next();
};
