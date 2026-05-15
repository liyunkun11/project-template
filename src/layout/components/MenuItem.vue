<template>
  <template v-if="isFirstLevel && menu.children && menu.children.length === 1">
    <!-- 一级菜单下只有一个子菜单时，直接渲染一级菜单项 -->
    <a-menu-item :key="menu.children[0].path">
      <template #icon>
        <svg-icon :name="getMenuIcon(menu.children[0])" />
      </template>
      {{ getMenuTitle(menu.children[0]) }}
    </a-menu-item>
  </template>

  <!-- 多层菜单 -->
  <template v-else-if="menu.children && menu.children.length > 0">
    <a-sub-menu :key="menu.path">
      <template #icon>
        <svg-icon :name="getMenuIcon(menu)" />
      </template>
      <template #title>
        {{ getMenuTitle(menu) }}
      </template>
      <menu-item
        v-for="child in menu.children"
        :key="child.path"
        :menu="child"
        :is-first-level="false"
      />
    </a-sub-menu>
  </template>

  <!-- 一级菜单下没有子菜单时，渲染一级菜单项 -->
  <template v-else>
    <a-menu-item :key="menu.path">
      <template #icon>
        <svg-icon :name="getMenuIcon(menu)" />
      </template>
      {{ getMenuTitle(menu) }}
    </a-menu-item>
  </template>
</template>

<script setup lang="ts">
import type { RouteRecordRaw } from "vue-router";

withDefaults(defineProps<{
  menu: RouteRecordRaw
  isFirstLevel?: boolean
}>(), {
  isFirstLevel: true,
});

// 获取菜单图标
const getMenuIcon = (menu: RouteRecordRaw) => {
  return menu.meta?.icon as string || "simple/page-outlined";
};
// 获取菜单标题
const getMenuTitle = (menu: RouteRecordRaw) => {
  return menu.meta?.title as string || menu.path;
};
</script>

<style lang="less" scoped>
.svg-icon {
  font-size: 18px;
}
</style>
