# REST API 约定与草案

## 通用约定
- Base path: `/api/v1`
- Content-Type: `application/json`; 时区 UTC。
- 响应格式：`{ data, error?, meta? }`
- 错误格式：`{ code: string, message: string, details?: any }`
- 分页：`page`（默认 1）、`pageSize`（默认 10，<=100）；排序 `sort`（字段,desc|asc）。
- 鉴权：MVP 匿名；预留 `Authorization: Bearer <token>`。
- 幂等：写操作使用 POST；若后续需要可加请求幂等键。

## 数据模型（核心字段）
- UserQuery: `{ description: string; lengthPref?: 'long'|'medium'|'short'; platform?: 'jjwxc'|'qidian'|'changpei'|'other'|'any'; moodTags?: string[]; completion?: 'completed'|'ongoing'|'any'; }`
- Novel: `{ id, title, author, tags: string[], platform, status, wordCount, coverUrl?, heatScore, synopsis }`
- RecommendationItem: `{ id, novelId, matchScore, heatScore, platform, status, estReadTime, recTitle, recHook, recBody, tags, rationale: string[], trafficNotes: string[] }`
- Feedback: `{ recommendationId, action: 'like'|'dislike'|'bookmark'|'variant', timestamp }`
- TrendingTopic: `{ keyword, hotScore, category?, sampleNote? }`

## 端点草案

### 健康检查
- `GET /healthz` → `{ data: { status: 'ok', timestamp } }`

### 搜索 & 推荐
- `POST /recommendations/search`
  - body: `UserQuery` + 可选分页 `page,pageSize`
  - response:
  ```json
  {
    "data": {
      "items": [
        {
          "id": "rec_123",
          "novelId": "novel_1",
          "matchScore": 0.92,
          "heatScore": 8.7,
          "platform": "jjwxc",
          "status": "completed",
          "estReadTime": "6h",
          "recTitle": "她裝乖18年，拿下全校最冷學霸後直接黑化？",
          "recHook": "慢熱校園+理工學霸+成長線",
          "recBody": "100-200字推文文案...",
          "tags": ["校園","慢熱","成長線","理工男主","非瑪麗蘇"],
          "rationale": [
            "描述中提到慢熱校園戀愛，本書主線為slow burn校園成長",
            "男主為理工學霸，符合“卷王”偏好",
            "近30天相關書單出現頻率較高（模擬流量來源）"
          ],
          "trafficNotes": ["小紅書搜索“校園理工學霸”熱度↑", "筆記收藏率18%提升（虛擬數據）"]
        }
      ],
      "meta": { "page":1, "pageSize":10, "total": 42 }
    }
  }
  ```

### 推文变体生成（占位）
- `POST /recommendations/:id/variants`
  - body: `{ style?: 'xhs'|'douyin'|'brief' }`
  - response: `{ data: { variants: [ { recTitle, recHook, recBody } ] } }`

### 反馈
- `POST /recommendations/:id/feedback`
  - body: `{ action: 'like'|'dislike'|'bookmark'|'variant' }`
  - response: `{ data: { saved: true } }`

### 热门话题 / 流量洞察（mock）
- `GET /trending/topics`
  - response: `{ data: [ { keyword:"追妻火葬場", hotScore:0.91, sampleNote:"示例..." } ] }`
- `GET /trending/insights`
  - response: `{ data: [ { title:"什麼題材最近容易出爆款？", content:"都市+女強收藏率提升18% (虛擬)" } ] }`

### 历史记录 / 书签（预留）
- `GET /history/searches`（可用 cookie/sessionId 或匿名 token）
- `GET /bookmarks`

## 错误码建议
- `BAD_REQUEST` (400) 入参校验失败
- `NOT_FOUND` (404) 资源不存在
- `RATE_LIMITED` (429) 限流
- `SERVER_ERROR` (500) 未知错误

## Mock 与未来演进
- MVP：Repository 使用本地 JSON/SQLite，评分规则固定；Copywriting/Explainer 使用模板。
- 后续：接入检索/embedding、LLM 生成文案与解释；增加个性化模型与用户画像。 
