import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import type { Request, Response } from 'express';
import { UserEntity } from '../_common/entities/auth/UserEntity.js';
import { FileEntity } from '../_common/entities/index.js';
import { FileMimeTypeEntity } from '../_common/entities/index.js';
import { FileExtensionEntity } from '../_common/entities/index.js';
import { NotFoundError } from '../_common/errors/NotFoundError.js';
import { HttpStatusCode } from '../_common/utils/index.js';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT || '';

export const signup = async (req: Request, res: Response): Promise<void> => {
    const { username, email, password, dateOfBirth, profileImage } = req.body;

    const fileExt = await FileExtensionEntity.findOne({ extension: 'png'});
    const mType = await FileMimeTypeEntity.findOne({ type: 'image/png' });

    if(!fileExt){
        throw new NotFoundError({ message: 'File extension not found' });
    }

    if(!mType){
        throw new NotFoundError({ message: 'Mime type not found' });
    }

    let imageFile = new FileEntity({
            name : "profileImage", 
            size : 0, 
            data : profileImage,
            extension : fileExt._id,
            mimeType : mType._id
        }
    );
    imageFile = await imageFile.save();

    // Create new user
    const user = new UserEntity({ 
            username: username,
            email: email,
            password: password,
            dateOfBirth: dateOfBirth, 
            profileImage: imageFile._id 
        }
    );
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ 
            username: user.username,
            email: user.email,
            dateOfBirth: user.dateOfBirth 
        }, 
        JWT_SECRET, 
        { expiresIn: '30m' }
    );
    res.status(HttpStatusCode.CREATED).json({ token });
};

export const signin = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;

    const user = await UserEntity.findOne({ $or: [{ username: username }, { email: username }] });
    if (!user) {
        throw new NotFoundError({ message: 'Invalid credentials' });
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
        throw new NotFoundError({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ 
            username: user.username,
            email: user.email,
            dateOfBirth: user.dateOfBirth 
        }, 
        JWT_SECRET, 
        { expiresIn: '30m' }
    );
    res.status(HttpStatusCode.OK).json({ token });
};