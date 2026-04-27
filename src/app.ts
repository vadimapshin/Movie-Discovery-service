import Fastify from "fastify";
import errorHandler from './plugins/error-handler.js';

export function buildApp() {
  const app = Fastify({
    logger: {
      transport: {
        target: 'pino-pretty',
        options: { colorize: true },
      },
    },
  });

  app.register(errorHandler);

  app.get('/ping', async () => {
    return { pong: 'ok' };
  });

  return app;
}