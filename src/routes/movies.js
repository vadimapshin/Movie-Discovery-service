import { getMovie, searchMoviesService } from '../services/moviesService.js';

export async function moviesRoutes(fastify) {
  fastify.get(
    '/movies/search',
    {
      schema: {
        querystring: {
          type: 'object',
          properties: {
            query: { type: 'string', minLength: 1 },
            page: { type: 'integer', minimum: 1, default: 1 },
          },
          required: ['query'],
        },
      },
    },
    async (request) => {
      const { query, page } = request.query;
      return searchMoviesService(query, page);
    },
  );
  fastify.get(
    '/movies/:id',
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            id: { type: 'integer', minimum: 1 },
          },
          required: ['id'],
        },
      },
    },
    async (request) => {
      const { id } = request.params;
      return getMovie(id);
    },
  );
}
