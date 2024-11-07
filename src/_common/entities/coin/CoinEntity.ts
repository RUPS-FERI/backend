import { model, Schema } from 'mongoose';

const CoinEntitySchema = new Schema(
  {
    externalId: { type: Number, required: true },
    code: { type: String, required: true },
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: {
      type: Schema.Types.ObjectId,
      ref: 'CoinContent',
      required: true,
    },
  },
  { timestamps: true },
);

export const CoinEntity = model('Coin', CoinEntitySchema);
