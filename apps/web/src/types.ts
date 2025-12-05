export type Platform = 'jjwxc' | 'qidian' | 'changpei' | 'other';

export interface RecommendationItem {
  id: string;
  title: string;
  author: string;
  recTitle: string;
  recHook: string;
  recBody: string;
  tags: string[];
  platform: Platform;
  status: 'completed' | 'ongoing';
  matchScore: number;
  heatScore: number;
  estReadTime: string;
  rationale: string[];
  trafficNotes: string[];
  coverUrl?: string;
  wordCount?: number;
}

export interface TrendingTopic {
  keyword: string;
  hotScore: number;
  category?: string;
  sampleNote?: string;
}

export interface Insight {
  title: string;
  content: string;
}
