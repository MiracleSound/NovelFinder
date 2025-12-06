import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi } from 'vitest';

import App from '../App';
import { mockInsights, mockRecommendations, mockTrendingTopics } from '../mockData';

let searchRecommendations = vi.fn();
let getTrending = vi.fn();

vi.mock('../lib/apiClient', () => ({
  apiClient: {
    get searchRecommendations() {
      return searchRecommendations;
    },
    get getTrending() {
      return getTrending;
    },
    sendFeedback: vi.fn(),
  },
}));

function renderWithClient(ui: React.ReactElement) {
  const client = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  return render(<QueryClientProvider client={client}>{ui}</QueryClientProvider>);
}

describe('App', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    searchRecommendations = vi.fn();
    getTrending = vi.fn();
  });

  test('renders recommendations from API', async () => {
    searchRecommendations.mockResolvedValue({
      data: { items: mockRecommendations, meta: { page: 1, pageSize: 10, total: mockRecommendations.length } },
    });
    getTrending.mockResolvedValue({
      topics: mockTrendingTopics,
      insights: mockInsights,
    });

    renderWithClient(<App />);

    expect(screen.getByText('自动小说推文机')).toBeInTheDocument();
    await waitFor(() => expect(searchRecommendations).toHaveBeenCalled());
    expect(screen.getAllByText(/推文/).length).toBeGreaterThan(0);
  });

  test('falls back to mock data on API error', async () => {
    searchRecommendations.mockRejectedValue(new Error('network'));
    getTrending.mockResolvedValue({
      topics: mockTrendingTopics,
      insights: mockInsights,
    });

    renderWithClient(<App />);

    await waitFor(() => expect(screen.getByText('接口暂不可用，已使用示例数据')).toBeInTheDocument());
    expect(screen.getAllByText(/推文/).length).toBeGreaterThan(0);
  });
});
