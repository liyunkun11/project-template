<template>
  <div class="icon-preview-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="page-header-left">
        <h2 class="page-title">
          图标预览
        </h2>
        <p class="page-subtitle">
          展示 src/icons 下的所有图标，点击图标卡片可复制对应名称
        </p>
      </div>
      <a-input
        v-model:value="searchKeyword"
        class="page-header-search"
        placeholder="搜索图标名称"
        allow-clear
      />
    </div>

    <!-- 分组列表 -->
    <div
      v-for="group in filteredGroups"
      :key="group.dir"
      class="icon-group"
    >
      <div class="icon-group-header">
        <span class="icon-group-title">{{ group.dir }}</span>
        <span class="icon-group-count">{{ group.icons.length }} 个图标</span>
      </div>
      <div class="icon-grid">
        <div
          v-for="icon in group.icons"
          :key="icon.name"
          class="icon-card"
          :title="`点击复制：${icon.name}`"
          @click="handleCopy(icon.name)"
        >
          <div class="icon-card-preview">
            <svg-icon :name="icon.name" />
          </div>
          <div class="icon-card-name">
            {{ icon.fileName }}
          </div>
        </div>
      </div>
      <!-- 无匹配结果 -->
      <a-empty
        v-if="group.icons.length === 0"
        description="没有匹配的图标"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IconGroup, IconItem } from "./types";
import { message } from "ant-design-vue";
import { computed, ref } from "vue";

// 使用 vite 的 import.meta.glob 扫描所有 svg 图标文件
const svgModules = import.meta.glob("@/icons/**/*.svg", {
  eager: true,
  query: "?url",
});

// 解析图标文件路径，提取目录与文件名
const allIcons = computed<IconItem[]>(() => {
  const list: IconItem[] = [];
  Object.keys(svgModules).forEach((filePath) => {
    // 匹配 /src/icons/<dir>/<name>.svg
    const match = filePath.match(/\/icons\/([^/]+)\/([^/]+)\.svg$/);
    if (!match) {
      return;
    }
    const [, dir, fileName] = match;
    list.push({
      dir,
      fileName,
      // SvgIcon 组件 name 入参格式：<dir>/<fileName>
      name: `${dir}/${fileName}`,
    });
  });
  return list;
});

// 搜索关键字
const searchKeyword = ref<string>("");

// 按目录分组后的图标列表（应用搜索过滤）
const filteredGroups = computed<IconGroup[]>(() => {
  const keyword = searchKeyword.value.trim().toLowerCase();
  // 按目录归类
  const map = new Map<string, IconItem[]>();
  allIcons.value.forEach((icon) => {
    // 关键字过滤（同时匹配文件名和完整 name）
    if (keyword && !icon.fileName.toLowerCase().includes(keyword) && !icon.name.toLowerCase().includes(keyword)) {
      return;
    }
    if (!map.has(icon.dir)) {
      map.set(icon.dir, []);
    }
    map.get(icon.dir)!.push(icon);
  });
  // 转为数组并按目录名排序
  return Array.from(map.entries())
    .map(([dir, icons]) => ({
      dir,
      icons: icons.sort((a, b) => a.fileName.localeCompare(b.fileName)),
    }))
    .sort((a, b) => a.dir.localeCompare(b.dir));
});

// 处理点击复制图标名称
const handleCopy = async (name: string) => {
  try {
    // 优先使用 Clipboard API
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(name);
    }
    else {
      // 兼容方案：execCommand 复制
      const textarea = document.createElement("textarea");
      textarea.value = name;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    message.success(`已复制：${name}`);
  }
  catch {
    message.error("复制失败，请手动复制");
  }
};
</script>

<style lang="less" scoped>
.icon-preview-page {
  // 页面头部
  .page-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 20px;

    .page-header-left {
      flex: 1;
    }

    .page-title {
      font-size: 22px;
      font-weight: 600;
      color: @color-text;
      margin: 0 0 6px 0;
      line-height: 1.4;
    }

    .page-subtitle {
      font-size: 13px;
      color: @color-text-secondary;
      margin: 0;
      line-height: 1.5;
    }

    .page-header-search {
      width: 280px;
      flex-shrink: 0;
    }
  }

  // 图标分组
  .icon-group {
    margin-bottom: 24px;

    .icon-group-header {
      display: flex;
      align-items: baseline;
      gap: 12px;
      margin-bottom: 12px;
    }

    .icon-group-title {
      font-size: 16px;
      font-weight: 600;
      color: @color-text;
    }

    .icon-group-count {
      font-size: 12px;
      color: @color-text-secondary;
    }
  }

  // 图标卡片栅格
  .icon-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 12px;
  }

  // 单个图标卡片
  .icon-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 16px 12px;
    background-color: @color-bg-container;
    border: 1px solid @color-border;
    border-radius: @border-radius;
    cursor: pointer;
    transition: all 0.2s;
    user-select: none;

    &:hover {
      border-color: @color-primary;
      box-shadow: @box-shadow;

      .icon-card-preview {
        color: @color-primary;
      }
    }

    .icon-card-preview {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      color: @color-text;
      transition: color 0.2s;
    }

    .icon-card-name {
      width: 100%;
      font-size: 12px;
      color: @color-text-secondary;
      text-align: center;
      word-break: break-all;
      line-height: 1.4;
    }
  }
}
</style>
