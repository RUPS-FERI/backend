import { model, Schema } from 'mongoose';

const FileExtensionEntitySchema = new Schema(
  {
    extension: { type: String, required: true, unique: true },
  },
  { timestamps: true },
);

export const FileExtensionEntity = model(
  'FileExtension',
  FileExtensionEntitySchema,
);
