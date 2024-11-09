import type {Request, Response} from "express";
import {CoinEntity} from "../_common/entities/index.js";
import {NotFoundError} from "../_common/errors/index.js";
import {CoinPriceEntity} from "../_common/entities/index.js";

export const getCoins = async (req: Request, res: Response) => {
    const { page = 1, size = 10, search } = req.query;

    const pageNumber = parseInt(page as string, 10);
    const pageSize = parseInt(size as string, 10);

    const query: any = {};
    if (search) {
        const searchStr = (search as string).toLowerCase();
        query.$or = [
            { name: { $regex: searchStr, $options: 'i' } },
            { code: { $regex: searchStr, $options: 'i' } },
        ];
    }

    const filteredCoins = await CoinEntity.find(query).skip((pageNumber - 1) * pageSize).limit(pageSize).select('name code files slug').exec();

    res.status(200).json(filteredCoins);
};

export const getCoinById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const coin = await CoinEntity.findById(id).populate({
        path: 'content',
        populate: {
            path: 'files'
        }
    });

    if (!coin) {
        throw new NotFoundError({message: "Coin not found"});
    }

    const prices = await CoinPriceEntity.find({coin: id}).sort('date').limit(20);
    const result = {
        coin,
        prices
    };

    res.status(200).json(result);
};