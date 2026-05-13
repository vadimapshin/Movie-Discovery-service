import fp from 'fastify-plugin';
import { Redis } from 'ioredis'

export default fp(async (fastify) => {
  const redis = new Redis({
    host: fastify.config.REDIS_HOST,
    port: fastify.config.REDIS_PORT,
    ...(fastify.config.REDIS_PASSWORD ? { password: fastify.config.REDIS_PASSWORD } : {}),
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