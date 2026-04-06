import Fastify from 'fastify';
import { moviesRoutes } from './routes/movies.js';

const fastify = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: { colorize: true },
    },
  },
});

fastify.get('/ping', async () => {
  return { pong: 'ok' };
});

fastify.register(moviesRoutes);

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await fastify.listen({ port: PORT });
    console.log('Server started on port ', PORT);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
