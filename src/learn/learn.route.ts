import { Router, type Request, type Response } from 'express';
import { HttpStatusCode } from '../_common/utils/index.js';
import { queryValidator } from '../_common/middlewares/validators/query-validator.middleware.js';
import {getLearn, postLearn} from "./learn.controller.js";

const router = Router();

router.get('/', getLearn);

router.post('/', [queryValidator(['number', 'age'])], postLearn);

export default router;
