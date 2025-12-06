import type {
  Insight,
  Novel,
  RecommendationItem,
  RecommendationResponse,
  TrendingTopic,
  UserQuery,
} from '../types.js';

const mockNovels: Novel[] = [
  {
    id: 'novel_1',
    title: '她装乖十八年',
    author: '青砚',
    tags: ['校园', '慢热', '成长线', '理工男主', '非玛丽苏'],
    platform: 'jjwxc',
    status: 'completed',
    wordCount: 1300000,
    coverUrl: 'https://placehold.co/320x430?text=Novel+1',
    heatScore: 8.7,
    synopsis:
      '废柴女主伪装乖乖女，卷王理工学霸男主，慢热成长线，情绪细腻但不狗血。',
  },
  {
    id: 'novel_2',
    title: '坠入霓光城',
    author: '南惟',
    tags: ['都市', '女强', '事业线', '轻爽', 'HE'],
    platform: 'qidian',
    status: 'ongoing',
    wordCount: 820000,
    coverUrl: 'https://placehold.co/320x430?text=Novel+2',
    heatScore: 8.4,
    synopsis: '女强+事业线，都市真香流。事业与情感双线并行，节奏快，爽点密集。',
  },
  {
    id: 'novel_3',
    title: '环城夜奔',
    author: '茶微凉',
    tags: ['无限流', '悬疑', '高智商', '组合成长', '黑深残'],
    platform: 'changpei',
    status: 'completed',
    wordCount: 540000,
    coverUrl: 'https://placehold.co/320x430?text=Novel+3',
    heatScore: 8.9,
    synopsis: '无限流高智商博弈，兼顾团队成长与情绪反差，情节紧凑，风格偏克制。 ',
  },
  {
    id: 'novel_4',
    title: '月落蒹葭',
    author: '临江夜',
    tags: ['古言', '权谋', '女主成长', '朝堂博弈', '慢热'],
    platform: 'jjwxc',
    status: 'completed',
    wordCount: 980000,
    coverUrl: 'https://placehold.co/320x430?text=Novel+4',
    heatScore: 8.2,
    synopsis: '古言权谋+慢热情感线，女主自救成长，朝堂暗线和情感线交织。',
  },
  {
    id: 'novel_5',
    title: '全息荒野直播',
    author: '江舟',
    tags: ['全息', '生存', '爽感', '双强', '轻松'],
    platform: 'qidian',
    status: 'ongoing',
    wordCount: 450000,
    coverUrl: 'https://placehold.co/320x430?text=Novel+5',
    heatScore: 8.5,
    synopsis: '全息荒野求生直播，双强组合爽点密集，节奏轻快兼具策略感。',
  },
];

const trendingTopics: TrendingTopic[] = [
  { keyword: '追妻火葬场', hotScore: 0.91, category: '情感', sampleNote: '相关话题笔记量环比 +18%' },
  { keyword: '女A男O', hotScore: 0.86, category: '设定', sampleNote: '反差设定带动收藏率' },
  { keyword: '无限流生存', hotScore: 0.83, category: '题材', sampleNote: '短视频完读率高' },
  { keyword: '校园理工学霸', hotScore: 0.79, category: '校园', sampleNote: '搜索热度抬升' },
];

const insights: Insight[] = [
  { title: '什么题材最近容易出爆款？', content: '都市 + 事业线 + 女强的推文收藏率预估提升 18%（虚拟数据）。' },
  { title: '轻松还是致郁更吃流量？', content: '轻松治愈向在周末时段完读率更高，适合推短篇或番外剪辑。' },
];

function matchScoreFromTags(query: UserQuery, novel: Novel): number {
  let score = 0.65;
  const desc = query.description.toLowerCase();
  novel.tags.forEach((tag) => {
    if (desc.includes(tag.toLowerCase())) {
      score += 0.06;
    }
  });
  if (query.platform && query.platform !== 'any' && query.platform === novel.platform) {
    score += 0.05;
  }
  if (query.moodTags?.length) {
    const hit = query.moodTags.filter((tag) => novel.tags.includes(tag)).length;
    score += Math.min(hit * 0.03, 0.06);
  }
  if (query.completion && query.completion !== 'any' && query.completion === novel.status) {
    score += 0.04;
  }
  if (query.lengthPref === 'short' && novel.wordCount < 600000) {
    score += 0.02;
  }
  if (query.lengthPref === 'long' && novel.wordCount >= 800000) {
    score += 0.02;
  }
  const descBonus = Math.min(Math.max(desc.length / 400, 0), 0.04); // 描述越长，给微弱奖励
  score += descBonus;
  return Number(Math.min(score, 0.97).toFixed(2));
}

function buildRecommendation(novel: Novel, query: UserQuery, idx: number): RecommendationItem {
  const matchScore = matchScoreFromTags(query, novel);
  const rationale = [
    `描述中提到的关键词与本书标签匹配度较高：${novel.tags.slice(0, 3).join(' / ')}`,
    `平台热度：${novel.platform} 近 30 天相似书单提及较多（模拟数据）`,
    '文案模板基于你的描述生成，偏向推文爆款风格（示例）',
  ];
  const trafficNotes = [
    '小红书「校园理工学霸」搜索热度上升（模拟）',
    '相关话题收藏率预估提升 18%（虚拟指标）',
  ];

  return {
    id: `rec_${idx + 1}`,
    title: novel.title,
    author: novel.author,
    novelId: novel.id,
    matchScore,
    heatScore: novel.heatScore,
    platform: novel.platform,
    status: novel.status,
    estReadTime: novel.wordCount > 1000000 ? '6-8h' : '3-5h',
    coverUrl: novel.coverUrl,
    wordCount: novel.wordCount,
    recTitle: `${novel.title} · 推文风标题示例`,
    recHook: novel.tags.slice(0, 3).join(' · '),
    recBody:
      '100-200 字推文文案示例：她装乖十八年，拿下全校最冷学霸后，才发现彼此都在伪装。慢热但不拖沓，校园质感和成长线都在线，适合想看「理工卷王 x 伪乖女主」的你。',
    tags: novel.tags,
    rationale,
    trafficNotes,
  };
}

export function getRecommendations(query: UserQuery, page = 1, pageSize = 10): RecommendationResponse {
  const items = mockNovels.map((novel, idx) => buildRecommendation(novel, query, idx));
  const offset = (page - 1) * pageSize;
  const paged = items.slice(offset, offset + pageSize);
  return { items: paged, page, pageSize, total: items.length };
}

export function getTrendingTopics(): TrendingTopic[] {
  return trendingTopics;
}

export function getInsights(): Insight[] {
  return insights;
}
