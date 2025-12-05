# NovelFinder 规则与规划

面向浅色柔和风的 Web 小应用（Vite + React + TS + Tailwind，Node + Fastify + TS，pnpm monorepo）。本阶段目标是沉淀可直接用于开发的规则库，后续再落地代码。

## 文档索引
- docs/architecture.md：整体架构与分层
- docs/api.md：REST 约定与接口草案
- docs/frontend.md：前端目录、状态与数据流
- docs/ui-styleguide.md：设计基调、Design Tokens、基础组件
- docs/dev-guides.md：开发规范、git 流程、环境配置

## MVP 摘要
- 目标：根据自然语言描述推荐高匹配度、高热度的小说，并生成“博主风推文”卡片。
- 关键能力：自然语言搜索/召回（先用 mock）、匹配度与热度评分、推文卡片生成、推荐理由、喜欢/不感兴趣反馈、热门话题与流量洞察。

## 快速开始
1) 安装依赖：`pnpm install`（需要 Node 18+）
2) 后端：`cp apps/api/.env.example apps/api/.env`，`pnpm dev:api`（默认 3001）
3) 前端：`cp apps/web/.env.example apps/web/.env.local`，`pnpm dev:web`（默认 5173）
4) 访问 http://localhost:5173 查看 mock 版 UI；当前推荐/热门接口均为占位数据。 
