import Fastify from 'fastify';
import { moviesRoutes } from './routes/movies.js';
import { config } from './config/env.js';

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
    pong: 'ok';
  }
});

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
