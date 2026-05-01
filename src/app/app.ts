import Fastify from "fastify";
import errorHandler from '../plugins/error-handler.js';
import knexPlugin from '../plugins/knex.js';
import redisPlugin from '../plugins/redis.js';
import { moviesRoutes } from '../modules/movies/movies-routes.js';

export function buildApp() {
  const app = Fastify({
    logger: {
      transport: {
        target: 'pino-pretty',
        options: { colorize: true },
      },
    },
  });

  app.register(knexPlugin);
  app.register(redisPlugin);
  app.register(errorHandler);
  app.register(moviesRoutes);

  app.get('/ping', async () => {
    return { pong: 'ok' };
  });

  return app;
}