import Fastify from 'fastify';

const fastify = Fastify({ logger: true });

fastify.get('/ping', async () => {
  return { pong: 'ok' };
});

const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT || 3000 });
    console.log('Server started on port ' + process.env.PORT || 3000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
