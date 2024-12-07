import dotenv from 'dotenv';
dotenv.config();

export const config = {
  databaseUrl: process.env.DATABASE_URL || 'sqlite::memory:',
  mlModelPath: process.env.ML_MODEL_PATH || './models',
  secretKey: process.env.SECRET_KEY || 'your-secret-key',
  algorithm: 'HS256',
  accessTokenExpireMinutes: 30
};