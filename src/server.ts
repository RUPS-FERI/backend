import dotenv from 'dotenv';

import app from './app.js';
import dataSource from '../db/typeorm.config.js';

dotenv.config();

const port = process.env.APP_PORT || 3000;

dataSource.initialize().then(() => {
  console.log('Database Connected Successfully');

  app.listen(port, () => {
    console.log(`REST API running on port : ${port} (${process.env.ENV})`);
  });
})


