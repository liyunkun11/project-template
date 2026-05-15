<template>
  <div class="left-container" :class="{ collapsed: isCollapsed }">
    <div class="left-menu">
      <div class="left-menu-scrollbar">
        <a-menu
          v-model:selected-keys="selectedKeys"
          v-model:open-keys="openKeys"
          :inline-collapsed="isCollapsed"
          mode="inline"
          :theme="themeStore.themeMode"
          @click="handleMenuClick"
        >
          <MenuItem
            v-for="menu in menuRoutes"
            :key="menu.path"
            :menu="menu"
          />
        </a-menu>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MenuInfo } from "ant-design-vue/es/menu/src/interface";
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAppStore } from "@/stores/app";
import { usePermissionStore } from "@/stores/permission";
import { useThemeStore } from "@/stores/theme";
import MenuItem from "./MenuItem.vue";

const route = useRoute();
const router = useRouter();
const permissionStore = usePermissionStore();
const appStore = useAppStore();
const themeStore = useThemeStore();

// 菜单路由列表
const menuRoutes = computed(() => permissionStore.menuRoutes);

// 菜单是否折叠
const isCollapsed = computed(() => appStore.menuCollapsed);

// 当前选中的菜单键
const selectedKeys = computed(() => [route.path]);

// 当前展开的 sub-menu 键：取 route.matched 中除当前页面、根路由外的所有父级 path
const openKeys = ref<string[]>([]);

// 计算当前路由对应需要展开的 sub-menu key
const resolveOpenKeys = () => {
  return route.matched
    .map(r => r.path)
    .filter(p => p && p !== "/" && p !== route.path);
};

// 监听路由变化：把当前匹配链上的父级 path 合并进 openKeys（保留用户已手动展开的项）
watch(
  () => route.path,
  () => {
    const next = resolveOpenKeys();
    openKeys.value = Array.from(new Set([...openKeys.value, ...next]));
  },
  { immediate: true },
);

// 处理菜单点击跳转
const handleMenuClick = (info: MenuInfo) => {
  router.push(String(info.key));
};
</script>

<style lang="less" scoped>
.left-container {
  width: 220px;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: @box-shadow;
  will-change: width;
  transition: width 0.3s;

  &.collapsed {
    width: 80px;
  }

  .left-menu {
    flex: 1;
    min-height: 0px;

    .left-menu-scrollbar {
      height: 100%;
      .ant-menu {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
