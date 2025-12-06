import { useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import type { Insight, RecommendationItem, TrendingTopic } from './types';
import { mockInsights, mockRecommendations, mockTrendingTopics } from './mockData';
import { apiClient, type RecommendationPayload } from './lib/apiClient';

const moodOptions = ['慢热', '治愈', '刺激', '致郁', '搞笑', '轻松', '黑深残'];
const platformOptions: TrendingTopic['category'][] = ['不限', '晋江', '起点', '长佩', '其他'];
const lengthOptions = ['长篇', '中短篇', '完结优先', '连载也行'];

function TagPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full border text-sm transition ${
        active
          ? 'bg-primary text-white border-primary shadow-card'
          : 'bg-white/80 text-inkMuted border-border hover:border-primary/60 hover:text-ink'
      }`}
    >
      {label}
    </button>
  );
}

const platformLabel = (platform: RecommendationItem['platform']) => {
  if (platform === 'jjwxc') return '晋江';
  if (platform === 'qidian') return '起点';
  if (platform === 'changpei') return '长佩';
  if (platform === 'other') return '其他';
  return platform;
};

function RecommendationCard({ item }: { item: RecommendationItem }) {
  return (
    <div className="card card-hover flex gap-4 p-4">
      <div className="w-32 flex-shrink-0 overflow-hidden rounded-md bg-border/50">
        <img src={item.coverUrl} alt={item.title} className="h-full w-full object-cover" />
      </div>
      <div className="flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-sm text-inkMuted">
              {item.title} · {item.author}
            </p>
            <h3 className="text-lg font-semibold text-ink">{item.recTitle}</h3>
            <p className="text-sm text-inkMuted mt-1">{item.recHook}</p>
          </div>
          <div className="text-right text-sm text-inkMuted">
            <div className="font-semibold text-ink">匹配度 {Math.round(item.matchScore * 100)}%</div>
            <div>热度 {item.heatScore} / 10</div>
            <div>
              {platformLabel(item.platform)} · {item.status === 'completed' ? '完结' : '连载'}
            </div>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-ink">{item.recBody}</p>
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-canvas px-3 py-1 text-xs text-ink border border-border">
              #{tag}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          <div className="rounded-md bg-canvas p-3 text-sm border border-border">
            <p className="font-semibold text-ink mb-1">为什么推给你</p>
            <ul className="list-disc pl-5 text-inkMuted space-y-1">
              {item.rationale.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-md bg-canvas p-3 text-sm border border-border">
            <p className="font-semibold text-ink mb-1">流量逻辑</p>
            <ul className="list-disc pl-5 text-inkMuted space-y-1">
              {item.trafficNotes.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="px-4 py-2 rounded-md bg-primary text-white text-sm hover:bg-primaryHover transition">
            生成更多类似文案
          </button>
          <button className="px-4 py-2 rounded-md bg-white text-ink text-sm border border-border hover:border-primary transition">
            收藏
          </button>
          <button className="px-4 py-2 rounded-md bg-white text-ink text-sm border border-border hover:border-danger/60 transition">
            不感兴趣
          </button>
        </div>
      </div>
    </div>
  );
}

function TrendingPanel({ topics, insights }: { topics: TrendingTopic[]; insights: Insight[] }) {
  return (
    <div className="card card-hover p-4 space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-ink">今日热门搜索词</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {topics.map((t) => (
            <span
              key={t.keyword}
              className="rounded-full bg-canvas border border-border px-3 py-1 text-xs text-ink"
              title={t.sampleNote}
            >
              #{t.keyword}
            </span>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-ink">热门推文逻辑</h3>
        {insights.map((insight) => (
          <div key={insight.title} className="rounded-md border border-border bg-canvas p-3">
            <p className="text-sm font-semibold text-ink">{insight.title}</p>
            <p className="text-sm text-inkMuted mt-1">{insight.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [description, setDescription] = useState(
    '想看一篇“废柴女主假装乖乖女、男主理工学霸、慢热成长线”的小说…',
  );
  const [selectedMoods, setSelectedMoods] = useState<string[]>(['慢热']);
  const [lengthPref, setLengthPref] = useState<string>('长篇');
  const [platform, setPlatform] = useState<string>('不限');

  const [recommendations, setRecommendations] = useState<RecommendationItem[]>(mockRecommendations);
  const [metaInfo, setMetaInfo] = useState<{ page: number; pageSize: number; total: number } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const toggleMood = (mood: string) => {
    setSelectedMoods((prev) => (prev.includes(mood) ? prev.filter((m) => m !== mood) : [...prev, mood]));
  };

  const mapLengthToPref = (val: string): RecommendationPayload['lengthPref'] => {
    if (val === '长篇') return 'long';
    if (val === '中短篇') return 'medium';
    return 'medium';
  };

  const mapPlatform = (val: string): RecommendationPayload['platform'] => {
    if (val === '晋江') return 'jjwxc';
    if (val === '起点') return 'qidian';
    if (val === '长佩') return 'changpei';
    if (val === '其他') return 'other';
    return 'any';
  };

  const buildPayload = (): RecommendationPayload => {
    return {
      description,
      moodTags: selectedMoods,
      lengthPref: mapLengthToPref(lengthPref),
      platform: mapPlatform(platform),
      completion: lengthPref === '完结优先' ? 'completed' : 'any',
      page: 1,
      pageSize: 10,
    };
  };

  const { data: trendingData, isLoading: trendingLoading } = useQuery<{ topics: TrendingTopic[]; insights: Insight[] }>({
    queryKey: ['trending'],
    queryFn: apiClient.getTrending,
    retry: 1,
  });

  const trendingTopics = trendingData?.topics?.length ? trendingData.topics : mockTrendingTopics;
  const insights = trendingData?.insights?.length ? trendingData.insights : mockInsights;

  const recMutation = useMutation({
    mutationFn: (payload: RecommendationPayload) => apiClient.searchRecommendations(payload),
    onSuccess: (res) => {
      const items = (res.data?.items as RecommendationItem[]) || [];
      setRecommendations(items.length ? items : mockRecommendations);
      setMetaInfo(res.data?.meta ?? null);
      setErrorMsg(null);
    },
    onError: (err: Error) => {
      console.error('recommendations error', err);
      setRecommendations(mockRecommendations);
      setMetaInfo(null);
      setErrorMsg('接口暂不可用，已使用示例数据');
    },
  });

  const handleGenerate = () => {
    const payload = buildPayload();
    recMutation.mutate(payload);
  };

  const layoutClass = useMemo(() => 'grid grid-cols-1 gap-6 xl:grid-cols-[2fr_1fr]', []);

  useEffect(() => {
    recMutation.mutate(buildPayload());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen text-ink">
      <header className="border-b border-border/70 bg-surface/70 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Auto Novel Finder</p>
            <h1 className="text-2xl font-semibold text-ink">自动小说推文机</h1>
          </div>
          <div className="text-sm text-inkMuted">浅色柔和 · Vite + React + TS + Tailwind</div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8 space-y-8">
        <section className="grid gap-6 md:grid-cols-2 items-start">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">描述越详细，推荐越精准</p>
            <h2 className="text-3xl font-semibold text-ink">输入你的脑洞，我们帮你找到最会爆的那本小说。</h2>
            <p className="text-inkMuted">题材、时代、CP、情绪、雷点、平台……写得越具体，匹配度越高。</p>
          </div>
          <div className="card card-hover p-4 text-sm text-inkMuted">
            <p className="font-semibold text-ink mb-2">填写提示</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>题材/时代：校园、都市、无限流、古言…</li>
              <li>CP/人设：理工学霸、娇软女主、事业线男主…</li>
              <li>情绪：治愈/刺激/致郁/搞笑/轻松/黑深残</li>
              <li>雷点：玛丽苏、狗血、无脑爽、开放式结局…</li>
              <li>平台偏好：晋江/起点/长佩/其他</li>
            </ul>
          </div>
        </section>

        <section className="card card-hover p-5 space-y-4">
          <label className="block text-sm font-semibold text-ink">你的描述</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full rounded-md border border-border bg-white p-3 text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            placeholder='想看一篇“废柴女主假装乖乖女、男主理工卷王学霸、校园慢热”...'
          />
          <div className="grid gap-3 md:grid-cols-3">
            <div className="space-y-2">
              <p className="text-xs text-inkMuted uppercase tracking-wide">小说类型</p>
              <div className="flex flex-wrap gap-2">
                {lengthOptions.map((opt) => (
                  <TagPill key={opt} label={opt} active={lengthPref === opt} onClick={() => setLengthPref(opt)} />
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-inkMuted uppercase tracking-wide">平台偏好</p>
              <div className="flex flex-wrap gap-2">
                {platformOptions.map((opt) => (
                  <TagPill key={opt} label={opt} active={platform === opt} onClick={() => setPlatform(opt)} />
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-inkMuted uppercase tracking-wide">气氛标签</p>
              <div className="flex flex-wrap gap-2">
                {moodOptions.map((opt) => (
                  <TagPill key={opt} label={opt} active={selectedMoods.includes(opt)} onClick={() => toggleMood(opt)} />
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="text-sm text-inkMuted">先用 mock 数据展示，后续接入真实搜索/召回/评分。</div>
            <button
              onClick={handleGenerate}
              disabled={recMutation.isPending}
              className="px-5 py-3 rounded-md bg-primary text-white font-semibold shadow-card hover:bg-primaryHover transition disabled:opacity-70"
            >
              {recMutation.isPending ? '生成中…' : '生成推文推荐'}
            </button>
          </div>
        </section>

        <section className={layoutClass}>
          <div className="space-y-4">
            {recommendations.map((item) => (
              <RecommendationCard key={item.id} item={item} />
            ))}
            {errorMsg ? <p className="text-sm text-danger">{errorMsg}</p> : null}
            {metaInfo ? (
              <p className="text-sm text-inkMuted">
                共 {metaInfo.total} 条 · 第 {metaInfo.page}/{Math.ceil(metaInfo.total / metaInfo.pageSize)} 页
              </p>
            ) : null}
          </div>
          {trendingLoading ? (
            <div className="card p-4 text-sm text-inkMuted">加载热门内容...</div>
          ) : (
            <TrendingPanel topics={trendingTopics} insights={insights} />
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
