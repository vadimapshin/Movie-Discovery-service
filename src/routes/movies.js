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
    async (request, reply) => {
      const { query, page } = request.query;

      try {
        return await searchMoviesService(query, page);
      } catch (err) {
        reply.status(500).send({ error: err.message });
      }
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
    async (request, reply) => {
      const { id } = request.params;

      try {
        return await getMovie(id);
      } catch (err) {
        reply.status(500).send({ error: err.message });
      }
    },
  );
}
