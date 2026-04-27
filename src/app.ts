import Fastify from "fastify";

export function buildApp() {
  const app = Fastify({
    logger: {
      transport: {
        target: 'pino-pretty',
        options: { colorize: true },
      },
    },
  });

  app.get('/ping', async () => {
    return { pong: 'ok' };
  });

  return app;
}