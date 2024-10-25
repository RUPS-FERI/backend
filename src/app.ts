import express from 'express';
import { cors, globalErrorHandler } from './_common/middlewares/index.js';

import learnRoute from './learn/learn.route.js';

const app = express();

app.use(express.json()); // Use json body parse
app.use(cors);

app.use('/api/learn', learnRoute);

app.use(globalErrorHandler);

export default app;
