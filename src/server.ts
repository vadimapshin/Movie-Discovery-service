import { buildApp } from './app.js';
import { env } from './env/index.js';

const app = buildApp();

const start = async () => {
  try {
    await app.listen({ port: env.PORT });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
