import 'dotenv/config';

function required(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`${key} is not set`);
  }
  return value;
}

export const env = {
  TMDB_API_KEY: required('TMDB_API_KEY'),
  TMDB_BASE_URL: required('TMDB_BASE_URL'),
  DATABASE_URL: required('DATABASE_URL'),
  PORT: Number(process.env.PORT) || 3000,
};