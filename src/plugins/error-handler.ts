import fp from 'fastify-plugin';
import { AppError } from '../errors/app-error.js';

export default fp(async (fastify) => {
  fastify.setErrorHandler((error, request, reply) => {
    fastify.log.error(error);

    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({
        error: error.message,
      });
    }

    return reply.status(500).send({
      error: 'Internal Server Error',
    });
  });
});