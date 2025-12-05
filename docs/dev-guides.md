# 开发规范与流程

## 运行环境
- Node >= 18（建议 LTS），pnpm 8+。
- VSCode 插件：ESLint、Prettier、Tailwind IntelliSense。
- 严禁提交 `.env*`、node_modules、dist。

## Git 流程
- 分支：`main` 发布、`develop` 日常、`feature/*` 开发；PR 合并前需通过 lint/test。
- 提交信息使用约定式：`feat|fix|chore|docs|refactor|style|test|build|ci|revert: msg`
- 频繁提交：完成文档/骨架/模块即提交。

## 脚本规划（后续在 package.json 落地）
- `pnpm dev:web` / `pnpm dev:api`
- `pnpm lint`（eslint + prettier + stylelint）
- `pnpm test`（前后端各自）
- `pnpm build:web` / `pnpm build:api`

## Lint/Format
- TypeScript strict，路径别名 `@/*`。
- ESLint：React + TS + hooks + import rules；Tailwind 插件。
- Prettier：统一格式；Stylelint 针对样式（含 Tailwind 排序）。

## 环境变量
- 后端：`.env` 示例 `PORT`, `API_BASE_URL`, `DATABASE_URL`, `LOG_LEVEL`, `RATE_LIMIT`
- 前端：`apps/web/.env.local`，例如 `VITE_API_BASE_URL`
- `.env.example` 后续提供模板；实际 `.env*` 不提交。

## 数据与 Mock
- 默认 SQLite 文件（dev），可切换 PostgreSQL。
- Prisma schema + seed 文件维护 mock 小说数据与标签。
- 本地 JSON 也可作为临时数据源。

## 测试策略
- 单测：服务层、评分规则、文案模板函数。
- 集成：API 路由（supertest/fastify inject）。
- 前端：Vitest + React Testing Library，重点表单与卡片渲染、反馈交互。

## 其他
- 日志：pino；统一错误处理中间件。
- 安全：CORS 白名单、限流、请求体大小限制；后续加鉴权。 
