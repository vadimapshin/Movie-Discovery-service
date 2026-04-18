import dotenv from 'dotenv';

dotenv.config();

if (!process.env.TMDB_API_KEY) {
  throw new Error('TMDB_API_KEY is not set');
}

export const config = {
  TMDB_API_KEY: process.env.TMDB_API_KEY,
  TMDB_BASE_URL: process.env.TMDB_BASE_URL,
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT || 3000,
};
