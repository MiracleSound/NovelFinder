import type { Insight, RecommendationItem, TrendingTopic } from './types';

export const mockRecommendations: RecommendationItem[] = [
  {
    id: 'rec_1',
    title: '她装乖十八年',
    author: '青砚',
    recTitle: '她装乖 18 年，拿下全校最冷学霸后直接黑化？',
    recHook: '慢热校园 · 理工学霸 · 成长线',
    recBody:
      '废柴女主伪装乖乖女，偏执理工学霸男主，双方都在“装乖”时慢慢拆开伪装。节奏不拖沓，校园质感和成长线都在线，适合想看慢热但不腻歪的你。',
    tags: ['校园', '慢热', '成长线', '理工男主', '非玛丽苏'],
    platform: 'jjwxc',
    status: 'completed',
    matchScore: 0.92,
    heatScore: 8.7,
    estReadTime: '6-8h',
    rationale: [
      '描述中提到慢热校园恋爱，本书主线为 slow burn 成长线',
      '男主是理工学霸，贴合“卷王”偏好',
      '近 30 天相似书单出现频率较高（模拟）',
    ],
    trafficNotes: ['小红书“校园理工学霸”搜索热度上升', '相关话题收藏率预估 +18%（虚拟）'],
    coverUrl: 'https://placehold.co/320x430?text=Novel+1',
    wordCount: 1300000,
  },
  {
    id: 'rec_2',
    title: '坠入霓光城',
    author: '南惟',
    recTitle: '她在霓光里杀出事业线，一路收割真香现场',
    recHook: '女强事业 · 都市爽感 · 情感双线',
    recBody:
      '都市女强+事业线，主打真香现场。爽感密集但保留情感线温度，适合想看“打工人升级流”的读者。',
    tags: ['都市', '女强', '事业线', '轻爽'],
    platform: 'qidian',
    status: 'ongoing',
    matchScore: 0.88,
    heatScore: 8.4,
    estReadTime: '4-6h',
    rationale: ['都市+事业线与热门趋势吻合', '节奏快、爽点多，适合短视频推文改编'],
    trafficNotes: ['都市女强笔记收藏率预估提升 18%（虚拟）'],
    coverUrl: 'https://placehold.co/320x430?text=Novel+2',
    wordCount: 820000,
  },
  {
    id: 'rec_3',
    title: '环城夜奔',
    author: '茶微凉',
    recTitle: '他们在无限循环里求生，越黑暗越上头',
    recHook: '无限流 · 高智商 · 悬疑反差',
    recBody:
      '无限流高智商博弈，情节紧凑偏克制，团队关系在生存里缓慢升温。适合想看“黑深残+脑洞推理”的读者。',
    tags: ['无限流', '悬疑', '高智商', '黑深残'],
    platform: 'changpei',
    status: 'completed',
    matchScore: 0.9,
    heatScore: 8.9,
    estReadTime: '3-5h',
    rationale: ['描述中提到刺激/致郁，书的气质贴合', '短视频完读率预估高（虚拟）'],
    trafficNotes: ['“无限流生存”话题热度提升（模拟）'],
    coverUrl: 'https://placehold.co/320x430?text=Novel+3',
    wordCount: 540000,
  },
];

export const mockTrendingTopics: TrendingTopic[] = [
  { keyword: '追妻火葬场', hotScore: 0.91, category: '情感', sampleNote: '相关话题笔记量环比 +18%' },
  { keyword: '女A男O', hotScore: 0.86, category: '设定', sampleNote: '反差设定带动收藏率' },
  { keyword: '无限流生存', hotScore: 0.83, category: '题材', sampleNote: '短视频完读率高' },
  { keyword: '校园理工学霸', hotScore: 0.79, category: '校园', sampleNote: '搜索热度抬升' },
];

export const mockInsights: Insight[] = [
  { title: '什么题材最近容易出爆款？', content: '都市 + 事业线 + 女强的推文收藏率预估提升 18%（虚拟数据）。' },
  { title: '轻松还是致郁更吃流量？', content: '轻松治愈向在周末时段完读率更高，适合推短篇或番外剪辑。' },
];
