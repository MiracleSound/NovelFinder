import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import type { FastifyInstance } from 'fastify';

import { buildServer } from '../src/server.js';

let app: FastifyInstance;

beforeAll(async () => {
  app = await buildServer();
});

afterAll(async () => {
  await app.close();
});

describe('recommendations API', () => {
  test('search returns recommendations and meta', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/v1/recommendations/search',
      payload: {
        description: '慢热校园理工学霸',
        moodTags: ['慢热'],
        page: 1,
        pageSize: 5,
      },
    });

    expect(response.statusCode).toBe(200);
    const body = response.json() as any;
    expect(body.data.items.length).toBeGreaterThan(0);
    expect(body.data.meta).toEqual(expect.objectContaining({ page: 1, pageSize: 5 }));
  });

  test('validation fails on empty description', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/v1/recommendations/search',
      payload: { description: '' },
    });

    expect(response.statusCode).toBe(400);
  });
});

describe('trending API', () => {
  test('topics returns list', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/v1/trending/topics' });
    expect(res.statusCode).toBe(200);
    const body = res.json() as any;
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);
  });
});
