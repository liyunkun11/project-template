<template>
  <div class="app-layout">
    <div class="layout-left">
      <LeftContainer />
    </div>
    <div class="layout-right">
      <div class="layout-header">
        <TopHeader />
      </div>
      <div class="layout-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LeftContainer from "./components/LeftContainer.vue";
import TopHeader from "./components/TopHeader.vue";
</script>

<style lang="less" scoped>
.app-layout {
  display: flex;
  height: 100%;
  background-color: @color-bg;
  .layout-left {
    flex: none;
  }
  .layout-right {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
  }
  .layout-header {
    height: 50px;
  }
  .layout-content {
    flex: 1;
    min-height: 0;
    &:not(:has(.page-no-base-overflow)) {
      overflow: auto;
    }
    &:not(:has(.page-no-base-padding)) {
      padding: 16px;
    }
  }
}
</style>
