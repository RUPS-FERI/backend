import { model, Schema, Document, Types } from 'mongoose';
import type { CallbackWithoutResultAndOptionalError } from 'mongoose'
import { genSalt, hash} from 'bcrypt'

interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    dateOfBirth: Date;
    profileImage: Types.ObjectId;
}

const userSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    profileImage: { type: Schema.Types.ObjectId, ref: 'File', required: true }
});

userSchema.pre<IUser>('save', async function (next : CallbackWithoutResultAndOptionalError) {

    if (!this.isModified('password')) return next();

    const salt = await genSalt();
    this.password = await hash(this.password, salt);

    next();
});

export const UserEntity = model<IUser>('User', userSchema);
