<template>
  <a-config-provider :locale="zhCn" :theme="themeStore.antdvTheme">
    <AppRoot />
  </a-config-provider>
</template>

<script setup lang="ts">
import zhCn from "ant-design-vue/es/locale/zh_CN";
import dayjs from "dayjs";
import AppRoot from "./AppRoot.vue";
import { useThemeStore } from "./stores/theme";
import "dayjs/locale/zh-cn";

dayjs.locale("zh-cn");

const themeStore = useThemeStore();
themeStore.applyThemeColors();
</script>

<style lang="less">
* {
  box-sizing: border-box;
}
html,
body {
  width: 100%;
  height: 100%;
  line-height: 1;
  background-color: @color-bg;
}
#app {
  width: 100%;
  height: 100%;
  min-width: 1280px;
  color: @color-text;
  font-family: @font-family;
  font-size: @font-size;
}
#nprogress .bar {
  background-color: @color-primary !important;
}
</style>
