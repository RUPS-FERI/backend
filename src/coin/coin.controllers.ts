import type { Request, Response } from 'express';
import { CoinEntity } from '../_common/entities/index.js';
import { NotFoundError } from '../_common/errors/index.js';
import { CoinPriceEntity } from '../_common/entities/index.js';
import { HttpStatusCode } from '../_common/utils/index.js';
//@ts-ignore
import axios from 'axios';

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

  res.status(HttpStatusCode.OK).json({ coins: filteredCoins });
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
    coin: coin,
    prices: prices,
  });
};

export const updatePrices = async () => {
  const coins = await CoinEntity.find();
  
  console.log(coins);
  
  for (const coin of coins) {
    const { id, externalId } = coin;
    
    try {
      const respose = await axios.get(`https://api.coinmarketcap.com/data-api/v3/cryptocurrency/detail/chart?id=${externalId}&range=7D`);

      const coinPriceData = respose.data.data.points;
      const newPrice = coinPriceData[Object.keys(coinPriceData).pop() as string].v[0];

      await CoinPriceEntity.updateOne({ coin: id }, { $set: { price: newPrice } });
    } catch (error) {
      console.error("Error fetching coin price data:", error);
    }
  }
}