import fp from 'fastify-plugin';
import fastifyEnv from '@fastify/env';

const schema = {
  type: 'object',
  required: ['TMDB_API_KEY', 'TMDB_BASE_URL', 'DATABASE_URL'],
  properties: {
    PORT: {
      type: 'number',
      default: 3000,
    },
    TMDB_API_KEY: {
      type: 'string',
    },
    TMDB_BASE_URL: {
      type: 'string',
    },
    DATABASE_URL: {
      type: 'string',
    },
    REDIS_HOST: {
      type: 'string',
      default: 'localhost',
    },
    REDIS_PORT: {
      type: 'number',
      default: 6379,
    },
    REDIS_PASSWORD: {
      type: 'string',
    },
  },
};

export default fp(async (fastify) => {
  await fastify.register(fastifyEnv, {
    dotenv: true,
    schema,
  });
});

declare module 'fastify' {
  interface FastifyInstance {
    config: {
      PORT: number;
      TMDB_API_KEY: string;
      TMDB_BASE_URL: string;
      DATABASE_URL: string;
      REDIS_HOST: string;
      REDIS_PORT: number;
      REDIS_PASSWORD?: string;
    };
  }
}