import { Knex } from 'knex';

export class MovieRepository {
  constructor(private readonly db: Knex) {}

  async getById(id: number) {
    const row = await this.db('movies')
      .where({ id })
      .first();

    return row?.data ?? null;
  }

  async save(movie: any) {
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