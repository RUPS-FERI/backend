import dotenv from 'dotenv';

import app from './app.js';
import dbConnection from '../db/db.config.js';

dotenv.config();

const port = process.env.APP_PORT || 3000;

async function main() {
  try {
    await dbConnection;
    app.listen(port, () => {
      console.log(`REST API running on port : ${port} (${process.env.ENV})`);
    });
  } catch (err) {
    console.log('DB connection error : ', err);
  }
}

main();