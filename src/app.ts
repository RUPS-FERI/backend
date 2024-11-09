import 'express-async-errors';
import express from 'express';
import { cors, globalErrorHandler } from './_common/middlewares/index.js';
import { authRoutes } from './auth/auth.routes.js';

const app = express();

app.use(express.json()); // Use json body parse
app.use(cors);

app.use('/api/auth', authRoutes);

app.use(globalErrorHandler);

export default app;