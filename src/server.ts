import dotenv from 'dotenv';

//@ts-ignore
import  cron  from 'node-cron';

import app from './app.js';
import dbConnection from '../db/db.config.js';
import { updatePrices } from './coin/coin.controllers.js';

dotenv.config();

const port = process.env.APP_PORT || 3000;

async function main() {
  try {
    await dbConnection;
    app.listen(port, () => {
      console.log(`REST API running on port : ${port} (${process.env.ENV})`);
    });
    cron.schedule('* */1 * * *', () => {
      updatePrices();
      console.log("Updated prices of coins")
    });
  } catch (err) {
    console.log('DB connection error : ', err);
  }
}

main();