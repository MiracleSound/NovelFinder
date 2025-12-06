export type Platform = 'jjwxc' | 'qidian' | 'changpei' | 'other' | 'any';

export interface UserQuery {
  description: string;
  lengthPref?: 'long' | 'medium' | 'short';
  platform?: Platform;
  moodTags?: string[];
  completion?: 'completed' | 'ongoing' | 'any';
}

export interface Novel {
  id: string;
  title: string;
  author: string;
  tags: string[];
  platform: Exclude<Platform, 'any'>;
  status: 'completed' | 'ongoing';
  wordCount: number;
  coverUrl?: string;
  heatScore: number;
  synopsis: string;
}

export interface RecommendationItem {
  id: string;
  title: string;
  author: string;
  novelId: string;
  matchScore: number;
  heatScore: number;
  platform: Novel['platform'];
  status: Novel['status'];
  estReadTime: string;
  coverUrl?: string;
  wordCount?: number;
  recTitle: string;
  recHook: string;
  recBody: string;
  tags: string[];
  rationale: string[];
  trafficNotes: string[];
}

export interface RecommendationResponse {
  items: RecommendationItem[];
  page: number;
  pageSize: number;
  total: number;
}

export interface FeedbackPayload {
  action: 'like' | 'dislike' | 'bookmark' | 'variant';
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
