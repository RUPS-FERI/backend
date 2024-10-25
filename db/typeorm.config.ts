import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { DataSource } from 'typeorm';
config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mongoUri =  `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@mongo:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`

export default new DataSource({
  type: 'mongodb',
  host: 'mongo',
  url: mongoUri,
  entities: [`${__dirname}/../src/**/*Entity{.ts,.js}`],
  logging: process.env.ENV === 'dev',
  synchronize: process.env.ENV === 'dev',
  useNewUrlParser: true,
  cache: true
});