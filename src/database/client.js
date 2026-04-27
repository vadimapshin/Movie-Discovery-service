import pg from 'pg';
import { env } from '../env/index.js';

const { Pool } = pg;

export const pool = new Pool({
  connectionString: env.DATABASE_URL,
});
