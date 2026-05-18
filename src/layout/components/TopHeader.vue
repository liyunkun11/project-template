<template>
  <div class="top-header">
    <div class="top-header-left">
      <div class="menu-toggle-fold" @click="toggleMenuCollapsed">
        <svg-icon :name="menuCollapsed ? 'simple/menu-unfold' : 'simple/menu-fold'" />
      </div>
      <div class="breadcrumb-container">
        <a-breadcrumb separator="/">
          <a-breadcrumb-item
            v-for="(item, index) in breadcrumbs"
            :key="item.path"
            :to="index < breadcrumbs.length - 1 ? { path: item.path } : undefined"
          >
            <svg-icon :name="getMenuIcon(item)" />
            <span>{{ getMenuTitle(item) }}</span>
          </a-breadcrumb-item>
        </a-breadcrumb>
      </div>
    </div>
    <div class="top-header-right">
      <AppConfig />
      <a-dropdown :trigger="['click']">
        <div class="user-info">
          <svg-icon name="simple/user" />
          <span class="username">管理员</span>
        </div>
        <template #overlay>
          <a-menu>
            <a-menu-item @click="handleLoginOut">
              退出登录
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useAppStore } from "@/stores/app";
import { usePermissionStore } from "@/stores/permission";
import AppConfig from "./AppConfig.vue";

const route = useRoute();
const permissionStore = usePermissionStore();

const appStore = useAppStore();
const menuCollapsed = computed(() => appStore.menuCollapsed);
const toggleMenuCollapsed = () => {
  appStore.toggleMenuCollapsed();
};

const breadcrumbs = computed(() => {
  const matched = route.matched.filter(item => item.meta?.title && !item.meta?.hidden && item.path);

  return matched.map(item => ({
    path: item.path,
    meta: item.meta,
  }));
});

// 获取菜单图标
const getMenuIcon = (menu: { path: string, meta: Record<string, any> }) => {
  return menu.meta?.icon as string || "simple/page";
};
// 获取菜单标题
const getMenuTitle = (menu: { path: string, meta: Record<string, any> }) => {
  return menu.meta?.title as string || menu.path;
};

const handleLoginOut = () => {
  // 清除信息
  permissionStore.logout();
  // 刷新页面
  window.location.reload();
};
</script>

<style lang="less" scoped>
.top-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 16px;
  background-color: @color-bg-container;
}

.top-header-left {
  display: flex;
  align-items: center;
  gap: 8px;
  .menu-toggle-fold {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    cursor: pointer;
    border-radius: 6px;
    font-size: 20px;
    user-select: none;

    &:hover {
      color: @color-primary;
      background-color: rgba(@color-primary-rgb, 0.15);
    }
  }

  .breadcrumb-container {
    .svg-icon {
      margin-right: 4px;
    }
  }
}

.top-header-right {
  display: flex;
  align-items: center;
  gap: 8px;

  .theme-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    cursor: pointer;
    border-radius: 6px;
    transition: background-color 0.3s;

    &:hover {
      color: @color-primary;
      background-color: rgba(@color-primary-rgb, 0.15);
    }

    .theme-icon {
      font-size: 20px;
    }
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;

    &:hover {
      color: @color-primary;
    }
  }
}
</style>
