# Vue 3 + TypeScript + Vite 项目模板

基于 Vue 3 + TypeScript + Vite 的中后台前端项目模板，内置路由权限、主题系统、图标方案和常用公共组件。

## 技术栈

| 分类 | 技术 | 版本 |
| ---- | ---- | ---- |
| 核心框架 | Vue | ^3.5.34 |
| 构建工具 | Vite | ^8.0.12 |
| 开发语言 | TypeScript | ~6.0.2 |
| UI 组件库 | Ant Design Vue | ^4.2.6 |
| 状态管理 | Pinia | ^3.0.4 |
| 路由管理 | Vue Router | ^5.0.7 |
| HTTP 客户端 | Axios | ^1.16.0 |
| CSS 方案 | Less | ^4.6.4 |
| 图表库 | ECharts + vue-echarts | ^6.0.0 / ^8.0.1 |
| 工具库 | lodash-es / @vueuse/core | ^4.18.1 / ^14.3.0 |
| 代码规范 | ESLint + @antfu/eslint-config | ^10.3.0 / ^9.0.0 |
| Git 工作流 | husky + lint-staged + commitlint | ^9.1.7 / ^16.4.0 / ^21.0.1 |

## 运行环境

| 名称 | 版本 |
| ---- | ---- |
| Node.js | v22.22.0 |
| npm | 10.9.4 |

## 目录结构

```text
src/
├── apis/            # API 接口定义（按模块划分，与 views 保持一致）
├── assets/          # 静态资源
├── components/      # 公共组件
│   ├── ActionBar/   # 操作栏（支持按钮权限、更多折叠）
│   ├── AutoTooltip/ # 自动 Tooltip（内容溢出时才显示）
│   ├── BaseChart/   # ECharts 封装（自动跟随明暗主题）
│   ├── GLoading/    # 加载状态组件
│   └── SvgIcon/     # SVG 图标组件
├── directives/      # 全局指令（copy / permission / resize）
├── hooks/           # 公共业务 Hooks（useAntdCssVars 等）
├── icons/           # SVG 图标资源
│   ├── simple/      # 单色图标
│   └── complex/     # 多色图标
├── layout/          # 布局组件
├── request/         # Axios 封装（拦截器 / 取消重复请求 / 错误处理）
├── routers/         # 路由配置（静态路由 + 异步路由模块）
├── stores/          # Pinia 状态管理
│   ├── app.ts       # 应用状态（菜单折叠等）
│   ├── permission.ts# 权限状态（token / 菜单路由 / 按钮权限）
│   └── theme.ts     # 主题状态（明暗模式 / 主题色）
├── styles/          # 公共样式（var.less 主题变量）
├── types/           # 公共类型定义
├── utils/           # 工具函数（权限 / DOM / CSS 变量）
├── views/           # 页面级组件
├── App.vue          # 入口组件
├── AppRoot.vue      # 根组件
├── main.ts          # 入口文件
├── permission.ts    # 路由权限拦截
└── vite-env.d.ts    # Vite 环境变量类型定义
```

## 常用脚本

```bash
# 启动开发服务器（端口 7788）
npm run dev

# 类型检查 + 生产构建
npm run build

# 本地预览构建产物
npm run preview

# 代码检查
npm run lint

# 代码检查并自动修复
npm run lint:fix

# 压缩 simple 目录下的 SVG 图标
npm run svgo:simple

# 压缩 complex 目录下的 SVG 图标
npm run svgo:complex
```

## 核心功能说明

### 路由权限

- 路由拦截逻辑位于 `src/permission.ts`，集成 NProgress 进度条
- 未登录自动跳转 `/login`，登录后动态注册异步路由
- 按钮级权限通过 `v-permission` 指令控制，权限列表存储于 `permissionStore.btnList`

### 主题系统

- 支持 **明/暗** 模式切换，通过 `themeStore.setThemeMode()` 切换
- 支持 5 种语义色（primary / success / warning / info / error）动态修改
- 颜色变量通过 CSS Custom Properties（`--app-color-*`）注入，Less 变量文件为 `src/styles/var.less`
- 主题配置持久化至 localStorage（key：`PROJECT_TEMPLATE_THEME`）

### SVG 图标

- 使用 `vite-plugin-svg-icons` 自动构建 SVG Sprite
- 图标分两类：`src/icons/simple/`（单色）和 `src/icons/complex/`（多色）
- 使用方式：`<svg-icon name="simple/home-filled" />`，`symbolId` 格式为 `icon-[dir]/[name]`

### Axios 封装

- 统一请求/响应拦截，自动携带 token
- 支持取消重复请求（`src/request/cancel.ts`）
- 统一错误处理（`src/request/error.ts`）

### 公共组件

| 组件 | 说明 |
| ---- | ---- |
| `SvgIcon` | 渲染 SVG Sprite 图标，支持 `name` / `prefix` 属性 |
| `ActionBar` | 表格操作栏，支持最大显示数、权限过滤、确认弹窗、更多折叠 |
| `AutoTooltip` | 文本溢出时自动显示 Tooltip，不溢出时不渲染 |
| `BaseChart` | ECharts 统一封装，自动跟随全局明暗主题，透传所有 ECharts 能力 |
| `GLoading` | 加载状态展示，支持图标/Spin 两种模式，可水平/垂直居中 |

### 全局指令

| 指令 | 说明 |
| ---- | ---- |
| `v-copy` | 一键复制文本内容 |
| `v-permission` | 按钮权限控制，无权限时隐藏元素 |
| `v-resize` | 监听元素尺寸变化，触发回调 |

## 环境变量

在 `.env.development` / `.env.production` 中配置，前缀必须为 `VITE_`：

```bash
VITE_APP_API_URL=http://localhost:3000  # 后端接口地址
```

代码中通过 `import.meta.env.VITE_XXX` 访问。
