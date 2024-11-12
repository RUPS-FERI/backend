import type { Request, Response } from 'express';
import { CoinEntity } from '../_common/entities/index.js';
import { NotFoundError } from '../_common/errors/index.js';
import { CoinPriceEntity } from '../_common/entities/index.js';
import { HttpStatusCode } from '../_common/utils/index.js';

export const getCoins = async (req: Request, res: Response) => {
  const pageNumber = +(req.query.page as string);
  const pageSize = +(req.query.size as string);
  const search = (req.query.search as string) || '';

  const filteredCoins = await CoinEntity.find({
    $or: [
      { name: { $regex: search, $options: 'i' } },
      { code: { $regex: search, $options: 'i' } },
    ],
  })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .select('name code content slug')
    .populate({
      path: 'content',
      populate: {
        path: 'files',
        populate: {
          path: 'mimeType extension',
        },
      },
    })
    .populate({
      path: 'content',
      populate: {
        path: 'links',
      },
    });

  const totalCoins = await CoinEntity.countDocuments({
    $or: [
      { name: { $regex: search, $options: 'i' } },
      { code: { $regex: search, $options: 'i' } },
    ],
  });

  const coinsWithLastPrice: object[] = Array(filteredCoins.length);
  for (let i = 0; i < filteredCoins.length; i++) {
    const coin = filteredCoins[i]!;
    const lastPrice = await CoinPriceEntity.findOne({ coin: coin._id }, null, {
      sort: { date: -1 },
    });
    coinsWithLastPrice[i] = {
      ...coin.toObject(),
      prices: [lastPrice],
    };
  }

  res
    .status(HttpStatusCode.OK)
    .json({ coins: coinsWithLastPrice, totalAmount: totalCoins });
};

export const getCoinById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const coin = await CoinEntity.findById(id).populate({
    path: 'content',
    populate: {
      path: 'files link',
    },
  });

  if (!coin) {
    throw new NotFoundError({ message: 'Coin not found' });
  }

  const prices = await CoinPriceEntity.find({ coin: id })
    .sort('date')
    .limit(20);

  res.status(HttpStatusCode.OK).json({
    coin: {
      ...coin,
      prices: prices,
    },
  });
};
