<template>
  <div class="dashboard">
    <div class="section">
      <div class="section-item">
        <span class="color-primary">选择主题色</span>
        <input :value="themeStore.colorPrimary" type="color" @change="handleChangeThemeColor" />
      </div>
      <a-switch :checked="themeMode" @change="toggleThemeMode">
        <template #checkedChildren>深色</template>
        <template #unCheckedChildren>浅色</template>
      </a-switch>
    </div>
    <div class="section">
      <a-button class="section-item">普通按钮</a-button>
      <a-button class="section-item" type="primary">主题按钮</a-button>
      <a-button danger>危险按钮</a-button>
    </div>
    <div class="section">
      <a-input></a-input>
    </div>
    <hr />
    <a-button type="primary" @click="handleRouterJump('echarts')">ECharts使用实例</a-button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";

import { useThemeStore } from "@/store/theme";

const router = useRouter();
const themeStore = useThemeStore();
// 主题模式
const themeMode = computed(() => themeStore.isDark);
// 切换主题模式
const toggleThemeMode = (): void => {
  themeStore.isDark = !themeStore.isDark;
};
// 主题色改变回调
const handleChangeThemeColor = (e: Event): void => {
  const color = (e.target as HTMLInputElement).value;
  themeStore.colorPrimary = color;
  document.documentElement.style.setProperty("--colorPrimary", color);
};

// 路由跳转回调
const handleRouterJump = (key: string) => {
  switch (key) {
    case "echarts":
      router.push({ path: "/demo/echarts" });
      break;
  }
};
</script>

<style lang="less" scoped>
.dashboard {
  width: 100%;
  height: 100%;
  padding: @globalPadding;
  box-sizing: border-box;
  .section {
    display: flex;
    align-items: center;
    margin-bottom: @globalMargin;
    .section-item {
      margin-right: @globalMargin;
      .color-primary {
        color: @colorPrimary;
      }
    }
  }
}
</style>
