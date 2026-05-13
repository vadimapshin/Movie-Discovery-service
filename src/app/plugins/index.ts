import fp from 'fastify-plugin';
import type { FastifyInstance } from 'fastify';

import envPlugin from './env.js';
import knexPlugin from './knex.js';
import redisPlugin from './redis.js';
import cachePlugin from './cache.js';
import errorHandler from './error-handler.js';
import tmdbClientPlugin from '../clients/tmdb-client.js';
import { moviesRoutes } from '../movie/movies-routes.js';

async function appPlugins(fastify: FastifyInstance) {
  await fastify.register(envPlugin);
  await fastify.register(tmdbClientPlugin);
  await fastify.register(knexPlugin);
  await fastify.register(redisPlugin);
  await fastify.register(cachePlugin);
  await fastify.register(errorHandler);
  await fastify.register(moviesRoutes);
}

export default fp(appPlugins);