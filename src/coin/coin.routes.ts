import express from 'express';
import { getCoins, getCoinById } from './coin.controllers.js';

const router = express.Router();

router.get('/', getCoins);
router.get('/:id', getCoinById);

export default router;