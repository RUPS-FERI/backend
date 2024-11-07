import { config } from 'dotenv';
import mongoose from 'mongoose';

config();

const mongoUri = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@mongo:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;

export default mongoose.connect(mongoUri);
