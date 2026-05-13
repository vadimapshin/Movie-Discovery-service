import fp from 'fastify-plugin';

interface CacheService {
  get<T>(key: string): Promise<T | null>;
  set(key: string, value: unknown, ttl: number): Promise<void>;
}

export default fp(async (fastify) => {
  const cache: CacheService = {
    async get<T>(key: string) {
      const value = await fastify.redis.get(key);
      return value ? JSON.parse(value) as T : null;
    },

    async set(key: string, value: unknown, ttl: number) {
      await fastify.redis.set(key, JSON.stringify(value), 'EX', ttl);
    },
  };

  fastify.decorate('cache', cache);
});

declare module 'fastify' {
  interface FastifyInstance {
    cache: CacheService;
  }
}