import { model, Schema } from 'mongoose';

const FileEntitySchema = new Schema(
  {
    name: { type: String, required: true },
    size: { type: Number, required: true },
    data: {
      data: Buffer,
      contentType: String,
    },
    extension: {
      type: Schema.Types.ObjectId,
      ref: 'FileExtension',
      required: true,
    },
    mimeType: {
      type: Schema.Types.ObjectId,
      ref: 'FileMimeType',
      required: true,
    },
  },
  { timestamps: true },
);

export const FileEntity = model('File', FileEntitySchema);
