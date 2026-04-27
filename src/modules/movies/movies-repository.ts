import { Knex } from 'knex';
import type { Movie } from './movies-types.js';

export class MovieRepository {
  constructor(private readonly db: Knex) {}

  async getById(id: number): Promise<Movie | null> {
    const row = await this.db('movies')
      .where({ id })
      .first();

    return row?.data ?? null;
  }

  async save(movie: any): Promise<void> {
    await this.db('movies')
      .insert({
        id: movie.id,
        title: movie.title,
        data: JSON.stringify(movie),
      })
      .onConflict('id')
      .ignore();
  }
}