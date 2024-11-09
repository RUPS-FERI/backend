import jwt from 'jsonwebtoken';
import type { JwtPayload } from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../errors/UnauthorizedError.js'
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT as string;

export const authMiddleware = (req: Request, res: Response, next : NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token)
    {
        throw new UnauthorizedError({ message: "Token not found"});
    }

    try{
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload & {
            id: string;
            username: string;
            email: string;
        };

        req.user = {
            id: decoded.id,
            username: decoded.username,
            email: decoded.email, 
    };
    }catch(err)
    {
        throw new UnauthorizedError({ message: "Invalid token."});
    }
    
    next();

};