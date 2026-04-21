import fp from 'fastify-plugin';

export async function errorHandler(fastify) {
  fastify.setErrorHandler((error, request, reply) => {
    fastify.log.error(error);

    const statusCode = error.statusCode || 500;

    reply.status(statusCode).send({
      error: error.message || 'Internal Server Error',
    });
  });
}

export default fp(errorHandler);
