import { searchMovies } from '../clients/tmdbClient.js';
import { getMovie } from '../services/moviesService.js';

export async function moviesRoutes(fastify) {
  fastify.get(
    '/movies/search',
    {
      schema: {
        querystring: {
          type: 'object',
          properties: {
            query: { type: 'string' },
            page: { type: 'integer', default: 1 },
          },
          required: ['query'],
        },
      },
    },
    async (request, reply) => {
      const { query, page } = request.query;

      try {
        return searchMovies(query, page);
      } catch (err) {
        reply.status(500).send({ error: err.message });
      }
    },
  );
  fastify.get('/movies/:id', async (request, reply) => {
    const { id } = request.params;

    try {
      return await getMovie(id);
    } catch (err) {
      reply.status(500).send({ error: err.message });
    }
  });
}
