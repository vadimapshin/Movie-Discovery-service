import { pool } from '../database/client.js';

export async function getMovieById(id) {
  const result = await pool.query('SELECT * FROM movies WHERE id = $1', [id]);

  return result.rows[0];
}

export async function saveMovie(movie) {
  await pool.query(
    `INSERT INTO movies (id, title, data)
     VALUES ($1, $2, $3)
     ON CONFLICT (id) DO NOTHING`,
    [movie.id, movie.title, movie],
  );
}
