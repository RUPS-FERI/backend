import { compare } from 'bcrypt';
import type { Request, Response } from 'express';
import {
  FileMimeTypeEntity,
  FileExtensionEntity,
  FileEntity,
  UserEntity,
} from '../_common/entities/index.js';
import { NotFoundError } from '../_common/errors/index.js';
import { HttpStatusCode } from '../_common/utils/index.js';
import { generateJWTToken } from '../_common/utils/jwt.util.js';

export const signup = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password, dateOfBirth, profileImage } = req.body;

  const fileExt = await FileExtensionEntity.findOne({ extension: 'png' });
  const mType = await FileMimeTypeEntity.findOne({ type: 'image/png' });

  if (!fileExt) {
    throw new NotFoundError({ message: 'File extension not found' });
  }

  if (!mType) {
    throw new NotFoundError({ message: 'Mime type not found' });
  }

  const imageFile = await FileEntity.create({
    name: 'profileImage',
    size: 0,
    data: profileImage,
    extension: fileExt._id,
    mimeType: mType._id,
  });

  const user = await UserEntity.create({
    username: username,
    email: email,
    password: password,

    dateOfBirth: dateOfBirth,
    profileImage: imageFile._id,
  });

  const token = await generateJWTToken({ ...user, id: user._id as string });
  res.set(HttpStatusCode.CREATED).json({
    token: token,
  });
};

export const signin = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  const user = await UserEntity.findOne({
    $or: [{ username: username }, { email: username }],
  });
  if (!user) {
    throw new NotFoundError({ message: 'Invalid credentials' });
  }

  const isMatch = await compare(password, user.password);
  if (!isMatch) {
    throw new NotFoundError({ message: 'Invalid credentials' });
  }

  const token = await generateJWTToken({ ...user, id: user._id as string });
  res.status(HttpStatusCode.OK).json({
    token: token,
  });
};
