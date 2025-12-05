import type { FastifyInstance } from 'fastify';
import type { FeedbackPayload, UserQuery } from '../types.js';
import { getRecommendations } from '../data/mockData.js';

export async function recommendationRoutes(app: FastifyInstance) {
  app.post('/recommendations/search', async (request) => {
    const body = request.body as Partial<UserQuery> & { page?: number; pageSize?: number };
    const page = body.page && body.page > 0 ? body.page : 1;
    const pageSize = body.pageSize && body.pageSize > 0 ? Math.min(body.pageSize, 50) : 10;
    const query: UserQuery = {
      description: body.description ?? '默认描述',
      lengthPref: body.lengthPref ?? 'medium',
      platform: body.platform ?? 'any',
      moodTags: body.moodTags ?? [],
      completion: body.completion ?? 'any',
    };

    const data = getRecommendations(query, page, pageSize);
    return { data: { items: data.items, meta: { page: data.page, pageSize: data.pageSize, total: data.total } } };
  });

  app.post('/recommendations/:id/feedback', async (request) => {
    const body = request.body as FeedbackPayload;
    const { id } = request.params as { id: string };
    // TODO: Persist feedback; currently stub.
    app.log.info({ feedback: body, id }, 'feedback received');
    return { data: { saved: true } };
  });

  app.post('/recommendations/:id/variants', async (request) => {
    const { id } = request.params as { id: string };
    // 模拟生成不同风格的推文文案
    const variants = [
      {
        recTitle: '轻松版推文标题示例',
        recHook: '慢热校园 · 理工学霸 · 成长线',
        recBody: '这里是另一种风格的推文短文案示例，适合轻松分享，长度约 80-120 字。',
      },
    ];
    app.log.info({ id }, 'variants generated (mock)');
    return { data: { variants } };
  });
}
