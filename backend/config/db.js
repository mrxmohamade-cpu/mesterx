const mongoose = require('mongoose');

const MAX_RETRIES = Number(process.env.DB_MAX_RETRIES || 10);
const RETRY_DELAY_MS = Number(process.env.DB_RETRY_DELAY_MS || 5000);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const connectDB = async () => {
  let attempt = 1;

  while (attempt <= MAX_RETRIES) {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 5000
      });
      console.log('MongoDB connected');
      return;
    } catch (error) {
      const isLastAttempt = attempt === MAX_RETRIES;
      console.error(
        `[DB] Failed to connect (attempt ${attempt}/${MAX_RETRIES}): ${error.message}`
      );

      if (isLastAttempt) {
        throw new Error(
          'Could not connect to MongoDB. Please check MONGO_URI and ensure MongoDB is running.'
        );
      }

      await sleep(RETRY_DELAY_MS);
      attempt += 1;
    }
  }
};

module.exports = { connectDB, mongoose };
