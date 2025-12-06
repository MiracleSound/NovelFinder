const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }
  return res.json() as Promise<T>;
}

export interface RecommendationPayload {
  description: string;
  moodTags?: string[];
  platform?: 'jjwxc' | 'qidian' | 'changpei' | 'other' | 'any';
  lengthPref?: 'long' | 'medium' | 'short';
  completion?: 'completed' | 'ongoing' | 'any';
  page?: number;
  pageSize?: number;
}

export const apiClient = {
  async searchRecommendations(payload: RecommendationPayload) {
    return request<{ data: { items: import('../types').RecommendationItem[]; meta: { page: number; pageSize: number; total: number } } }>(
      '/api/v1/recommendations/search',
      {
        method: 'POST',
        body: JSON.stringify(payload),
      },
    );
  },
  async sendFeedback(id: string, action: 'like' | 'dislike' | 'bookmark' | 'variant') {
    return request<{ data: { saved: boolean } }>(`/api/v1/recommendations/${id}/feedback`, {
      method: 'POST',
      body: JSON.stringify({ action }),
    });
  },
  async getTrending() {
    const [topicsRes, insightsRes] = await Promise.all([
      request<{ data: import('../types').TrendingTopic[] }>('/api/v1/trending/topics'),
      request<{ data: import('../types').Insight[] }>('/api/v1/trending/insights'),
    ]);
    return {
      topics: topicsRes.data,
      insights: insightsRes.data,
    };
  },
};
