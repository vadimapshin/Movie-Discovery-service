import { pool } from '../database/client.js';

export async function getMovieById(id) {
  try {
    const { rows } = await pool.query(`SELECT * FROM movies WHERE id = $1`, [id]);

    return rows[0]?.data ?? null;
  } catch (err) {
    console.error('[Repository] getMovieById failed', err);
    throw err;
  }
}

export async function saveMovie(movie) {
  try {
    await pool.query(
      `INSERT INTO movies (id, title, data)
       VALUES ($1, $2, $3)
       ON CONFLICT (id) DO NOTHING`,
      [movie.id, movie.title, JSON.stringify(movie)],
    );
  } catch (err) {
    console.error('[Repository] saveMovie failed', err);
    throw err;
  }
}
