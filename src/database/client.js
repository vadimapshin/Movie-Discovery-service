import pg from 'pg';
import { config } from '../config/env.js';

const { Pool } = pg;

export const pool = new Pool({
  connectionString: String(config.DATABASE_URL),
});
console.log('DB URL:', config.DATABASE_URL);
