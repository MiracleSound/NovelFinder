import 'dotenv/config';
import cors from '@fastify/cors';
import formBody from '@fastify/formbody';
import Fastify from 'fastify';

import { registerErrorHandler } from './plugins/errorHandler.js';
import { healthRoutes } from './routes/health.js';
import { recommendationRoutes } from './routes/recommendations.js';
import { trendingRoutes } from './routes/trending.js';

const server = Fastify({
  logger: true,
});

async function buildServer() {
  await server.register(cors, { origin: true });
  await server.register(formBody);
  await server.register(healthRoutes);
  await server.register(recommendationRoutes, { prefix: '/api/v1' });
  await server.register(trendingRoutes, { prefix: '/api/v1' });
  registerErrorHandler(server);
  return server;
}

async function start() {
  const app = await buildServer();
  const port = Number(process.env.PORT) || 3001;
  const host = process.env.HOST || '0.0.0.0';

  try {
    await app.listen({ port, host });
    app.log.info(`API running at http://${host}:${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

if (process.env.NODE_ENV !== 'test') {
  start();
}

export type AppInstance = typeof server;
export { buildServer };
