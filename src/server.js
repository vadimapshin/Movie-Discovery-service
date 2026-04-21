import Fastify from 'fastify';
import { moviesRoutes } from './routes/movies.js';
import { config } from './config/env.js';
import errorHandler from './plugins/errorHandler.js';

const fastify = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: { colorize: true },
    },
  },
});

fastify.get('/ping', async () => {
  {
    return { pong: 'ok' };
  }
});

fastify.register(errorHandler);
fastify.register(moviesRoutes);

const start = async () => {
  try {
    await fastify.listen({ port: config.PORT });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
