import type { FastifyInstance } from 'fastify';

import envPlugin from './env.js';
import knexPlugin from './knex.js';
import redisPlugin from './redis.js';
import errorHandler from './error-handler.js';
import { moviesRoutes } from '../movie/movies-routes.js';

export async function appPlugins(fastify: FastifyInstance) {
  await fastify.register(envPlugin);
  await fastify.register(knexPlugin);
  await fastify.register(redisPlugin);
  await fastify.register(errorHandler);

  await fastify.register(moviesRoutes);
}