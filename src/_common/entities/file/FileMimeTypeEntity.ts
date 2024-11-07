import { model, Schema } from 'mongoose';

const FileMimeTypeEntitySchema = new Schema(
  {
    type: { type: String, required: true, unique: true },
  },
  { timestamps: true },
);

export const FileMimeTypeEntity = model(
  'FileMimeType',
  FileMimeTypeEntitySchema,
);
