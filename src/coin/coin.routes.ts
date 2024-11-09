import express from 'express';
import { getCoins, getCoinById } from './coin.controllers.js';

const router = express.Router();

router.get('/coins', getCoins);
router.get('/coins/:id', getCoinById);

export default router;