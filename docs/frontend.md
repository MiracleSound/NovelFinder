# 前端规范与架构

## 技术栈
- Vite + React + TypeScript，UI: Tailwind CSS + 自研轻量组件库。
- 状态：Zustand（全局/特性 store）；数据获取：TanStack Query（请求、缓存、重试、错误边界）。
- 路由：React Router。
- 请求：`lib/apiClient`（fetch/axios 均可，统一拦截器、错误映射、重试）。

## 目录建议（apps/web/src）
- components/ 基础组件（Button/Input/Card/Modal/Badge/Skeleton/...）
- features/
  - search/ （SearchBox、Filters、query store）
  - recommendations/（RecommendationList/Card、variant modal、feedback actions）
  - trending/（TrendingPanel、insights）
  - history/（可选）
  - shared/（hooks、types）
- pages/：Home
- routes/：路由定义
- lib/: apiClient、queryClient、analytics stub、utils
- styles/: global.css、tailwind.config、design tokens
- types/: 接口/DTO 类型
- assets/: 占位图
- tests/: 组件/逻辑测试

## 数据流与状态
- 查询/结果：Query 参数与结果缓存由 TanStack Query 管理；表单暂存可用 Zustand store。
- 反馈：乐观更新（like/dislike/bookmark）；失败回滚。
- UI 状态：加载 skeleton、空态提示、错误提示（toast/banner）。

## 组件分层
- Base：Button/Input/Card/Modal/Badge/Skeleton/Tag/Pill
- Compound：SearchBox（含文本域+filters+cta）、RecommendationCard、TrendingCard、InsightCard
- Layout：AppShell（header/main/aside/footer），Section 容器

## 文案与占位
- Hero 区：标题“Auto Novel Finder / 自动小说推文机”；副标题“输入你的脑洞，我们帮你找到最会爆的那本小说。”
- 搜索文本域 placeholder 示例：`想看一篇「廢柴女主假裝乖乖女、男主理工學霸、慢熱成長線」...`
- 按钮文案：`生成推文推荐`
- 空态：提示输入描述；加载：skeleton 卡片；错误：可重试按钮。

## 测试
- 使用 Vitest + React Testing Library。
- 覆盖：SearchBox 提交行为、RecommendationCard 渲染、feedback 乐观更新、空/错误态。

## 可访问性
- 按钮/输入具备 aria-label；Modal 聚焦管理；键盘操作；颜色对比满足 WCAG AA。 
