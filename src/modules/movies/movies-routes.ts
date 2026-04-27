import type { FastifyInstance } from 'fastify';
import { MovieRepository } from './movies-repository.js';
import { MovieService } from './movies-service.js';

export async function moviesRoutes(fastify: FastifyInstance) {
  const movieRepository = new MovieRepository(fastify.knex);
  const movieService = new MovieService(movieRepository, fastify.redis);

  fastify.get('/movies/search', async (request) => {
    const { query, page = 1 } = request.query as {
      query: string;
      page?: number;
    };

    return movieService.searchMovies(query, page);
  });

  fastify.get('/movies/:id', async (request) => {
    const { id } = request.params as {
      id: number;
    };

    return movieService.getMovie(id);
  });
}