import fp from 'fastify-plugin';
import Redis from 'ioredis';

export default fp(async (fastify) => {
  const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    ...(process.env.REDIS_PASSWORD ? { password: process.env.REDIS_PASSWORD } : {}),
  });

  redis.on('connect', () => {
    fastify.log.info('Redis connected');
  });

  redis.on('error', (err) => {
    fastify.log.error(err, 'Redis error');
  });

  fastify.decorate('redis', redis);

  fastify.addHook('onClose', async () => {
    await redis.quit();
  });
});

declare module 'fastify' {
  interface FastifyInstance {
    redis: Redis;
  }
}