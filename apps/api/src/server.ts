import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import formBody from '@fastify/formbody';
import { recommendationRoutes } from './routes/recommendations.js';
import { trendingRoutes } from './routes/trending.js';
import { healthRoutes } from './routes/health.js';

const server = Fastify({
  logger: true,
});

async function buildServer() {
  await server.register(cors, { origin: true });
  await server.register(formBody);
  await server.register(healthRoutes);
  await server.register(recommendationRoutes, { prefix: '/api/v1' });
  await server.register(trendingRoutes, { prefix: '/api/v1' });
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

start();

export type AppInstance = typeof server;
