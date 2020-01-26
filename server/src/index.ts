import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config({ path: './config.env' });

import app from './app';

const DB = String(process.env.DATABASE_LOCAL);
const PORT = process.env.PORT || 3000;

const server = async () => {
  try {
    await mongoose
          .connect(DB, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
          })
          .then(() => console.log('DB connection!'));

    app.listen(PORT, () => {
      console.log(`App running on port ${PORT}...`);
    });
  } catch (e) {
    console.error('Server Error', e.message);
    process.exit(1);
  }
};

server();
