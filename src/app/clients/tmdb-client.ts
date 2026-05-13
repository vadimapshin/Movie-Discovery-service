import fp from 'fastify-plugin';
import { ExternalApiError } from '../errors/external-api-error.js';
import type { TmdbMovie, TmdbSearchResponse } from '../movie/movies-types.js';

interface TmdbClient {
  searchMovies(query: string, page?: number): Promise<TmdbSearchResponse>;
  getMovieDetails(id: number): Promise<TmdbMovie>;
}

export default fp(async (fastify) => {
  const tmdbClient: TmdbClient = {
    async searchMovies(query: string, page = 1) {
      const url = `${fastify.config.TMDB_BASE_URL}/search/movie?api_key=${fastify.config.TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=${page}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new ExternalApiError(`TMDb API error: ${response.status} ${response.statusText}`);
      }

      return response.json();
    },

    async getMovieDetails(id: number) {
      const url = `${fastify.config.TMDB_BASE_URL}/movie/${id}?api_key=${fastify.config.TMDB_API_KEY}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new ExternalApiError(`TMDb API error: ${response.status} ${response.statusText}`);
      }

      return response.json();
    },
  };

  fastify.decorate('tmdbClient', tmdbClient);
});

declare module 'fastify' {
  interface FastifyInstance {
    tmdbClient: TmdbClient;
  }
}