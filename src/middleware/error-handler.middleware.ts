import { type Request, type Response } from 'express';

export const globalErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
) => {
  res.json({
    status: 500,
    message: error.message,
  });
};
