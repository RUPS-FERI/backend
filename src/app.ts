import express from 'express';
import { cors, globalErrorHandler } from './_common/middlewares/index.js';

const app = express();

app.use(express.json()); // Use json body parse
app.use(cors);
app.use(globalErrorHandler);

export default app;
