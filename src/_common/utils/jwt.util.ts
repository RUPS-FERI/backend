import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../errors/UnauthorizedError.js';

export interface JWTPayload {
  id: string;
  username: string;
  email: string;
  dateOfBirth: Date;
}

export const generateJWTToken = async (payload: JWTPayload) => {
  return jwt.sign(
    {
      id: payload.id,
      username: payload.username,
      email: payload.email,
      dateOfBirth: payload.dateOfBirth,
    },
    process.env.JWT!,
    { expiresIn: '30m' },
  );
};

export const varifyJwt = (token: string) => {
  try {
    const decodedToken = jwt.verify(token, process.env.JWT!);
    return decodedToken as JWTPayload;
  } catch (error) {
    throw new UnauthorizedError({ message: 'Invalid token.' });
  }
};
