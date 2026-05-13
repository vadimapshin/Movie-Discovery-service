import { buildApp } from './app/app.js';

const app = buildApp();

const start = async () => {
  try {
    await app.ready();

    await app.listen({
      port: app.config.PORT,
    });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
