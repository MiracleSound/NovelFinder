import { getInsights, getTrendingTopics } from '../data/mockData.js';

import type { FastifyInstance } from 'fastify';


export async function trendingRoutes(app: FastifyInstance) {
  app.get('/trending/topics', async () => {
    return { data: getTrendingTopics() };
  });

  app.get('/trending/insights', async () => {
    return { data: getInsights() };
  });
}
