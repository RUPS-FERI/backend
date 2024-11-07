import { model, Schema } from 'mongoose';

const CoinContentEntitySchema = new Schema(
  {
    links: [{ type: Schema.Types.ObjectId, ref: 'Link' }],
    files: [{ type: Schema.Types.ObjectId, ref: 'File' }],
  },
  { timestamps: true },
);

export const CoinContentEntity = model('CoinContent', CoinContentEntitySchema);
