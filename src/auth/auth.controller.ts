import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import type { Request, Response } from 'express';
import { UserEntity } from '../_common/entities/auth/UserEntity.js';
import { FileEntity } from '../_common/entities/index.js';
import { FileMimeTypeEntity } from '../_common/entities/index.js';
import { FileExtensionEntity } from '../_common/entities/index.js';
import { config } from 'dotenv';
import { HttpStatusCode } from '../_common/utils/http/HttpStatusCode.js';
import { NotFoundError } from '../_common/errors/NotFoundError.js';
import { AlreadyExistsError } from '../_common/errors/AlreadyExistsError.js';

config();

const JWT_SECRET = process.env.JWT || '';

export const signup = async (req: Request, res: Response): Promise<void> => {
    const { username, email, password, dateOfBirth, profileImage } = req.body;

    // Check if user already exists
    let user = await UserEntity.findOne({ $or: [{ username }, { email }] });
    if (user) {
        throw new AlreadyExistsError({ message: 'User already exists' });
    }

    let fileExt = await FileExtensionEntity.findOne({ extension: 'png'});
    let mType = await FileMimeTypeEntity.findOne({ type: 'image/png' });

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
    user = new UserEntity({ 
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
    res.json({ token });
};

export const signin = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;

    const user = await UserEntity.findOne({ username });
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
    res.json({ token });
};