import express from 'express';
import { getCoins, getCoinById } from './coin.controllers.js';
import { queryParamValidator } from '../_common/middlewares/index.js';

const router = express.Router();

router.get(
  '/',
  [
    queryParamValidator([
      { name: 'page', type: 'number', required: true },
      { name: 'size', type: 'number', required: true },
    ]),
  ],
  getCoins,
);

router.get('/:id', getCoinById);

export default router;
