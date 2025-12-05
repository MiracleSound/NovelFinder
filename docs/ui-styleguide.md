# UI 风格与组件规范（浅色柔和）

## Design Tokens（建议）
- 调色盘（浅色柔和科技感）：
  - 主色 primary: `#5B8DEF`（按钮/链接），hover `#4A7AD8`
  - 强调 accent: `#7C5BFF`
  - 辅助 mint: `#5FD0B5`
  - 背景 base: `#F6F7FB`，卡片 `#FFFFFF`
  - 文本主色: `#1F2A44`，次要 `#5B6475`
  - 分割线/边框: `#E4E7EE`
  - 警示：success `#2EBD85` / warning `#F7B500` / danger `#F45B69`
- 圆角：xs 6px / sm 10px / md 14px / lg 18px（卡片/按钮多用 sm-md）
- 阴影：卡片 `0 10px 30px rgba(24,39,75,0.08)`；悬浮 `0 14px 40px rgba(24,39,75,0.12)`
- 字体：优先「Inter/Manrope + system fallback」，字号：12/14/16/20/24/32，行距 1.4-1.6
- 动效：过渡 160ms ease；卡片 hover 轻微上浮 + 阴影增强；按钮按压缩小 0.98
- 间距：8/12/16/20/24/32 scale；栅格宽屏 12 列，移动端单列。

## 布局
- 顶部 Hero：左文案（标题/副标题/要点），右说明提示；主 CTA 放在文本域下方。
- 主体：左右结构（>=1280px），左 2/3 为推荐列表，右 1/3 为热门/洞察卡；移动端改为纵向堆叠。
- 卡片列表：3:4 封面左侧，右侧为标题/标签/正文/指标/解释/按钮；移动端封面置顶。

## 基础组件 API（草稿）
- Button: `variant`(primary/secondary/ghost), `size`(sm/md/lg), `loading`, `icon`
- Input/Textarea: `label`, `placeholder`, `helperText`, `error`, `rows`
- Select/Segmented: 用于类型/平台/气氛标签
- Card: `elevation`(base/hovered), `padding`, `interactive`
- Modal: `title`, `onClose`, `footer` 插槽，支持 escapekey/overlay 点击关闭
- Badge/Tag/Pill: 用于标签行；支持颜色语义
- Skeleton: 卡片/文本占位
- Tooltip: 解释小提示

## 核心业务组件
- SearchBox：多行文本域 + 过滤项（小说类型、平台偏好、气氛标签、完结状态）+ CTA 按钮
- RecommendationCard：
  - 封面：3:4 占位图
  - 推文标题/原书名/作者
  - 标签行：题材/风格/情绪/平台
  - 推文正文 100–200 字
  - 指标条：匹配度、热度、平台/完结、预估完读时间
  - “为什么推给你” bullet 2-3 条；“流量逻辑”小条
  - 动作：生成更多文案、收藏、不感兴趣
- TrendingPanel：热门搜索词、流量洞察卡片

## 状态与反馈
- Loading：按钮 spinner + 卡片 skeleton；空态插画或柔和占位。
- Error：提示条 + 重试按钮；非阻塞提示使用 toast。
- Hover/Active：按钮/卡片阴影与主色条；保持柔和不过度饱和。

## 响应式
- 宽屏：Hero 2 列；推荐列表 1 列卡片；侧栏固定宽度。
- 平板：侧栏下移；卡片信息压缩布局。
- 移动：单列，CTA 固定底部或紧邻文本域；按钮与输入保持 16px 以上可点区域。 
