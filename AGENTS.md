# 开发规范

你是本项目的资深前端专家，请严格遵守以下技术栈、目录结构规范、工程化配置及代码编写规范

## 强制约束

- 项目中的所有编码都必须使用UTF-8编码
- 遵循最小修改范围原则，即只修改本次需要修改的代码，不要顺带修改其他无关的代码
- 代码的所有变更，都需要走 eslint 进行代码检查
- 当任务涉及当前目录内的代码、配置或文档时，需先读取并遵循本文件
- 如果本次回答使用了本文件中的约束，需在回答最后明确注明：`已使用 AGENTS.md 约束`
- 如果本次回答未使用本文件约束，不要添加该说明

## 1. 技术栈概览

- **核心框架**：Vue 3.5+ (Composition API only)
- **构建工具**：Vite 8+
- **开发语言**：TypeScript 6+ (Strict Mode)
- **状态管理**：Pinia
- **路由管理**：Vue Router 5
- **HTTP 客户端**：Axios
- **CSS 方案**：Less
- **UI 组件库**：请从`package.json`中查看，这个会根据不同的项目需求而变化
- **代码规范工具**：ESLint + @antfu/eslint-config

## 2. 目录结构规范

请遵循以下标准目录结构：

```text
src/
├── apis/            # API 接口定义
├── assets/          # 静态资源
├── components/      # 公共组件
├── directives/      # 公共指令
├── icons/           # 公共图标
├── hooks/           # 公共业务逻辑 Hooks(useXXX)
├── layout/          # 布局组件
├── request/         # Axios 请求封装
├── routers/         # Router 路由配置
├── stores/          # Pinia 状态管理
├── styles/          # 公共样式
├── types/           # 公共类型定义
├── utils/           # 公共工具函数
├── views/           # 页面级业务逻辑
├── App.vue          # 入口组件
├── AppRoot.vue      # 根组件
├── main.ts          # 入口文件
├── permission.ts    # 路由权限拦截文件
└── vite-env.d.ts    # Vite 环境变量类型定义
```

**注意1：改src以外的文件需要我确认授权才可以**
**注意2：request/routers/stores/styles文件夹、permission.ts文件需要我确认授权才可以修改**

## 3. 工程化与构建

### 3.1 依赖管理

- **依赖管理限制1**：不要主动安装任何依赖，如果需要安装依赖，需要手动让我确认再安装
- **依赖管理限制2**：不要修改`package.json`文件里面的任何内容和依赖版本号

### 3.2 常用脚本

- **启动开发服务器**：`npm dev`
- **构建生产版本**：`npm build`
- **代码修复**：`npm lint:fix`

### 3.3 环境变量

- 使用 `.env.development` 和 `.env.production` 管理环境变量
- 前端访问环境变量必须通过 `import.meta.env.VITE_XXX`

## 4. 代码编写规范

**注意：所有的方法/变量都需要添加中文注释，注释添加在方法和变量的上方**
**注意：所有跟style里颜色相关的，优先从`src/styles/var.less`文件中获取，如果没有可以自定义颜色，但需要告知我**

### 4.1 Vue 规范

Vue组件的排版顺序统一使用 `template` -> `script` -> `style` 排序

#### 4.1.1 语法

- 必须使用`<script setup lang="ts">`语法
- 必须使用`Composition API`
- 禁止使用`Options API`，除非我直接告诉你要使用
- 命名风格
  - 变量/函数：camelCase
  - 组件：PascalCase
  - 常量：UPPER_CASE
  - 文件夹：kebab-case
- 代码风格
  - 缩进：使用 2 个空格
  - 分号：必须使用分号
  - 引号：必须使用双引号

#### 4.1.2 样式

- 必须使用 `<style scoped lang="less">`语法
- 尽量使用样式嵌套结构，避免使用全局样式
- 禁止使用`Tailwind CSS`原子类
- 类名的定义要语义化命名

#### 4.1.3 组件

- **全局组件**：命名必须使用 PascalCase 创建文件夹，然后在当前文件夹添加 `index.vue` 文件。如果有类型文件，则放在当前文件夹 `types.ts` 文件中
  ```text
  src/components/
  ├── Button/
  │   ├── index.vue
  │   └── types.ts
  └── Icon/
      ├── index.vue
      └── types.ts
  ```
- **业务页面**：命名必须使用 kebab-case 创建文件夹，然后在当前文件夹中添加 `index.vue` 文件。如果有类型文件，可以看情况要不要抽取到当前文件夹 `types.ts` 文件中。如果有子组件需要抽取封装命名方式必须采用 PascalCase，放在当前文件夹的 `components` 文件夹下，如果子组件还有类型文件，则需要把子组件改为目录，参考全局组件的写法
  ```text
  src/views/
  ├── dashboard/
  │   ├── index.vue
  │   └── types.ts
  └── demo-page1/
  │   ├── index.vue
  │   └── components/
  │       ├── Button/
  │       │   ├── index.vue
  │       │   └── types.ts
  │       └── Icon/
  │           ├── index.vue
  │           └── types.ts
  └── demo-page2/
      ├── index.vue
      └── components/
          ├── Button.vue
          └── Icon.vue
  ```

### 4.2 TypeScript 规范

- **类型定义**：优先使用 interface 定义对象结构，使用 type 定义联合类型或复杂类型
- **避免any**：尽量避免使用 any。如果无法确定类型，可以再使用any
- **类型导入**：导入类型时必须使用 import type 语法，以优化打包体积

### 4.3 Router 规范

- **路由命名**：一个新模块的命名必须使用 kebab-case，要与`src/views/**`的文件名保持一致`
- **路由元信息**：路由元信息必须使用 `meta` 属性定义，例如`title`、`icon`、`hidden`
- **路由挂载**：路由挂载必须使用 `() => import('xxx')` 懒加载语法
- **路由嵌套**：嵌套路由必须强制为二级路由的形式，也就是一个主模块下无论多少级嵌套都写在主模块的`children`
- **新建模块**：一般由我来自己创建模块，如果你需要创建模块，请先与我确认再执行

### 4.4 Pinia 规范

- **遵循只使用，不修改的原则**
- **如果无法满足目前业务需要，主动与我确认并引导我去创建新的`Store`或添加字段**

### 4.5 API 请求规范

- **所有 API 请求应封装在`src/apis/`目录下，按模块划分文件，要与`src/views/**`的文件名保持一致\*\*
- **接口方法命名必须使用 camelCase**

接口定义参考下面示例：

```ts
// src/apis/user.ts
import request from "@/request/index";

// get
export const getUserInfo = (id: number) => {
  return request.get(`/api/user/${id}`);
};

// post
export const createUser = (data: any) => {
  return request.post("/api/user", data);
};

// put
export const updateUser = (id: number, data: any) => {
  return request.put(`/api/user/${id}`, data);
};

// delete
export const deleteUser = (id: number) => {
  return request.delete(`/api/user/${id}`);
};
```
