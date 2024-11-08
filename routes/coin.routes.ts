import express from 'express';
import { getCoins, getCoinById } from '../controllers/coin.controllers';

const router = express.Router();

router.get('/coins', getCoins);
router.get('/coins/:id', getCoinById);

export default router;