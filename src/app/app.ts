import Fastify from "fastify";
import { appPlugins } from './plugins/index.js';

export function buildApp() {
  const app = Fastify({
    logger: {
      transport: {
        target: 'pino-pretty',
        options: { colorize: true },
      },
    },
  });

  app.register(appPlugins);

  app.get('/ping', async () => {
    return { pong: 'ok' };
  });

  return app;
}