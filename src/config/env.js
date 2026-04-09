import dotenv from 'dotenv';

dotenv.config();

if (!process.env.TMDB_API_KEY) {
  throw new Error('TMDB_API_KEY is not set');
}

export const config = {
  TMDB_API_KEY: process.env.TMDB_API_KEY,
  PORT: process.env.PORT || 3000,
};
