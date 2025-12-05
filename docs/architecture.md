# 架构与分层（初版）

## 总览
- 形态：Web 小应用（后续可迁移小程序），浅色柔和 UI。
- 技术：pnpm + monorepo；前端 `apps/web`（Vite + React + TS + Tailwind）；后端 `apps/api`（Node + Fastify + TS）；数据库 SQLite 默认，可切换 PostgreSQL；ORM 建议 Prisma。
- 模块化：前后端均以“特性/领域”为单位组织，避免跨模块耦合。

## 目录规划（monorepo）
- apps/web: 前端应用
  - src/components: 基础组件（Button/Input/Card/Modal/...）
  - src/features: 业务特性（search/recommendations/feedback/history/...）
  - src/pages: 页面级
  - src/routes: 路由配置
  - src/lib: 通用库（请求、hooks、utils、analytics stub）
  - src/styles: tailwind.config.ts、tokens、全局样式
  - src/types: 前端专属类型
- apps/api: 后端服务
  - src/routes: 路由定义
  - src/controllers: 入参校验、调用 service、组装响应
  - src/services: 领域服务（Recommendation/Copywriting/Explainer/Feedback）
  - src/repositories: 数据访问（NovelRepository 等）
  - src/models: 领域模型定义
  - src/db: Prisma schema 或 SQL 脚本、seed/mock 数据
  - src/middlewares: 日志、错误处理、鉴权预留、请求限速
  - src/config: 配置加载、环境变量校验
  - src/types: DTO/接口类型
  - tests: 单测/集成测试
- docs: 规则库
- scripts: 辅助脚本（生成 mock、db migration）

## 后端分层与数据流
1) Routes → Controllers：解析 HTTP 请求，执行入参校验（zod/class-validator），调用 service。
2) Services：业务逻辑与编排，组合 Repository、策略（评分/流量规则）与 Copywriting/Explainer。
3) Repositories：读写数据源（SQLite/PostgreSQL/JSON mock）。
4) Providers/Integrations（预留）：外部搜索、向量检索、LLM（MVP 用 mock/规则模板）。
5) Middlewares：日志、错误捕获、CORS、速率限制、鉴权（预留）。
6) Response 统一结构：`{ data, error?, meta? }`；错误同一格式（见 api.md）。

### 核心服务职责
- RecommendationService：接收 UserQuery，调度 NovelRepository 召回 + 规则评分，生成 NovelRecommendation[]。
- CopywritingService：根据小说元信息 + 用户描述，生成推文标题/正文/hook（MVP 模板占位）。
- ExplainerService：生成推荐理由与“流量逻辑”说明（规则/模板）。
- FeedbackService：记录 like/dislike/click，更新反馈存储（stub）。
- TrendingService：提供热门搜索词、流量洞察（静态或 mock）。

## 前端架构与数据流
- 页面：单页面主视图（Hero + 搜索区 + 推荐列表 + 热门/流量侧栏）。
- 状态管理：Zustand（轻量 store）+ TanStack Query（数据获取/缓存/重试/错误处理）。
- 请求封装：`lib/apiClient`（fetch/axios 任一，带 baseURL、拦截、错误映射、重试策略）。
- 组件分层：
  - 基础组件（无业务） → 组合组件（SearchBox、Filters、RecommendationCard、TrendingPanel） → 页面。
  - 每个 feature 自带 hooks/queries 和 types。
- UI/交互：明确加载、空态、错误态；按钮状态（loading/disabled）；占位 skeleton。

## 配置与环境
- 根 `.env`（后端）与 `apps/web/.env.local`（前端）；禁止提交。
- 可配置项：API_BASE_URL、DB_URL、PORT、LOG_LEVEL、RATE_LIMIT 等。
- 默认环境：本地 SQLite 文件；生产/云端可换 PostgreSQL。

## 运行/构建（规划）
- dev：`pnpm dev:web`、`pnpm dev:api`（或根并行脚本）。
- lint：eslint + prettier + stylelint（Tailwind 插件）。
- test：vitest/jest（前后端分开）。
- build：`pnpm build:web` 输出 dist，`pnpm build:api`。

## 日志与可观测性（占位）
- 请求日志（pino 等），错误日志统一格式，trace id 透传。
- 健康检查 `/healthz`，后续可加 metrics endpoint。

## 安全与合规（当前优先级低，预留）
- 基础 CORS、速率限制、请求体大小限制。
- 鉴权/用户体系后续再接入（当前匿名/假 session）。 
