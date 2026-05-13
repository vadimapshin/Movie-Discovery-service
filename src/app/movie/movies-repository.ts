import { Knex } from 'knex';
import { DatabaseError } from '../errors/database-error.js';
import type { Movie } from './movies-types.js';

export class MovieRepository {
  constructor(private readonly db: Knex) {}

  async getById(id: number): Promise<Movie | null> {
    try {
      const row = await this.db('movies')
        .where({ id })
        .first();

      return row?.data ?? null;
    } catch (err) {
      throw new DatabaseError(
        'MovieRepository.getById',
        err as Error,
      );
    }
  }

  async save(movie: Movie): Promise<void> {
    try {
      await this.db('movies')
        .insert({
          id: movie.id,
          title: movie.title,
          data: JSON.stringify(movie),
        })
        .onConflict('id')
        .ignore();
    } catch (err) {
      throw new DatabaseError(
        'MovieRepository.save',
        err as Error,
      );
    }
  }
}