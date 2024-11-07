import { Schema, model } from 'mongoose';

const LinkEntitySchema = new Schema(
  {
    name: { type: String, required: true, default: '' },
    link: { type: String, required: true, default: '' },
  },
  { timestamps: true },
);

export const LinkEntity = model('Link', LinkEntitySchema);
