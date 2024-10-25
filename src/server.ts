import dotenv from 'dotenv';

import app from './app.js';

dotenv.config();

const port = process.env.APP_PORT || 3000;

// dataSource.initialize().then(() => {
//   console.log('Database Connected Successfully');

app.listen(port, () => {
  console.log(`REST API running on port : ${port} (${process.env.ENV})`);
});
// })
// .catch((err) => console.log('DB connection error : ', err))
