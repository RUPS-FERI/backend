import {Request, Response} from "express";
import {Coin} from "../models/coin";

const coins: Coin[] = [
    {
        id: "1",
        name: "Bitcoin",
        code: "BTC",
        files: ["btc.png"],
        slug: "bitcoin",
        prices: Array.from({ length: 50 }, (_, i) => i * 1000),
    },
    {
        id: "2",
        name: "Ethereum",
        code: "ETH",
        files: ["eth.png"],
        slug: "ethereum",
        prices: Array.from({ length: 50 }, (_, i) => i * 500),
    },
];

export const getCoins = (req: Request, res: Response) => {
    const { page = 1, size = 10, search } = req.query;

    const pageNumber = parseInt(page as string, 10);
    const pageSize = parseInt(size as string, 10);

    let filteredCoins = coins;

    try {
        if (search) {
            const searchStr = (search as string).toLowerCase();
            filteredCoins = coins.filter((coin) => coin.name.toLowerCase().includes(searchStr) || coin.code.toLowerCase().includes(searchStr));
        }

        const startIndex = (pageNumber - 1) * pageSize;
        const paginatedCoins = filteredCoins.slice(startIndex, startIndex + pageSize);

        const result = paginatedCoins.map(({name, code, files, slug}) => ({
            name,
            code,
            files,
            slug,
        }));

        res.json(result);
        res.status(200).json({ message: "Successful"});
    } catch (error) {
        return res.status(500).json({ message: 'Unsuccessful' });
    }
};

export const getCoinById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const coin = await coins.find((coin) => coin.id === id);

        if (!coin) {
            return res.status(404).json({message: 'Coin not found'});
        }

        const result = {
            ...coin,
            prices: coin.prices.slice(-20),
        };

        res.json(result);
        res.status(200).json({ message: "Successful"});
    } catch (error) {
        return res.status(500).json({ message: 'Unsuccessful' });
    }
};