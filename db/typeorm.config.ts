import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { DataSource } from 'typeorm';
config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default new DataSource({
  type: 'mongodb',
  url: process.env.MONGO_DB_URL,
  entities: [`${__dirname}/../src/**/*.entity{.ts,.js}`],
  synchronize: process.env.ENV === 'dev',
  logging: process.env.ENV === 'dev',
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
  migrationsTableName: 'migrations',
  useNewUrlParser: true,
  useUnifiedTopology: true,
  cache: true
});