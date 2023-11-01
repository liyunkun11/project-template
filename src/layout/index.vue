<template>
  <div class="app-layout">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { theme } from "ant-design-vue";

import { useThemeStore } from "@/store/theme";

const { token } = theme.useToken();
const themeStore = useThemeStore();

// 给token对象的需要的属性添加前缀并转为css属性
const addPrefixToCss = (obj: Record<string, any>) => {
  let cssStr = "";
  for (const key in obj) {
    // 只添加需要的属性
    const includeReg = /^(color|border).*/;
    if (!includeReg.test(key)) continue;
    if (Object.hasOwnProperty.call(obj, key)) {
      const newKey = `--${key}`;
      const value = obj[key] as string;
      cssStr += `${newKey}: ${value};`;
    }
  }
  return cssStr;
};

// 添加css属性到:root
const addCssToRoot = () => {
  setTimeout(() => {
    const cssStr = addPrefixToCss(token.value);
    let style = document.querySelector("style#ant-design-vue-token") as HTMLStyleElement;
    if (!style) {
      style = document.createElement("style");
      style.id = "ant-design-vue-token";
      document.getElementsByTagName("head")[0].append(style);
    }
    style.innerText = `:root{${cssStr}}`;
  });
};
addCssToRoot();
themeStore.$subscribe(addCssToRoot, { detached: true });
</script>

<style lang="less" scoped>
.app-layout {
  width: 100%;
  height: 100%;
  color: @colorText;
  background-color: @colorBgLayout;
}
</style>
