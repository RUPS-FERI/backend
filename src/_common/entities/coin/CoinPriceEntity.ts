import { Schema, model } from 'mongoose';

const CoinPriceEntitySchema = new Schema(
  {
    date: { type: Date, required: true, default: () => 'CURRENT_TIMESTAMP' },
    price: { type: Number, required: true },
    volume: { type: Number, required: true },
    marketCap: { type: Number, required: true },
    coin: {
      type: Schema.Types.ObjectId,
      ref: 'Coin',
      required: true,
    },
  },
  { timestamps: true },
);

export const CoinPriceEntity = model('Price', CoinPriceEntitySchema);
