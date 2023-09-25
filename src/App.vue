<template>
  <a-config-provider :locale="zhCN" :theme="themeStore.themeConfig">
    <router-view />
  </a-config-provider>
</template>

<script setup lang="ts">
import "dayjs/locale/zh-cn";

import zhCN from "ant-design-vue/es/locale/zh_CN";
import dayjs from "dayjs";

import { useThemeStore } from "@/store/theme";

const themeStore = useThemeStore();
dayjs.locale("zh-cn");
</script>

<style lang="less">
html,
body {
  width: 100%;
  height: 100%;
}

#app {
  width: 100%;
  height: 100%;
  min-width: 1280px;
  font-family: "PingFangSC-Regular", "PingFang SC";
}
</style>
