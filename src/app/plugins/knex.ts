import fp from 'fastify-plugin';
import knex, { type Knex } from 'knex';

export default fp(async (fastify) => {
  const db = knex({
    client: 'pg',
    connection: fastify.config.DATABASE_URL,
  });

  fastify.decorate('knex', db);

  fastify.addHook('onClose', async () => {
    await db.destroy();
  });
});

declare module 'fastify' {
  interface FastifyInstance {
    knex: Knex;
  }
}