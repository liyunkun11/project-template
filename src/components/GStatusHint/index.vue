<template>
  <div class="g-status-hint">
    <div class="g-status-hint__dot"></div>
    <div :class="['g-status-hint__text', { 'sync-color': syncColor }, { 'custom-color': labelColor }]">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { StatusHintProps } from "./types";
defineProps<StatusHintProps>();
</script>

<style lang="less" scoped>
.g-status-hint {
  display: inline-flex;
  align-items: center;
  .g-status-hint__dot {
    width: 6px;
    height: 6px;
    border-radius: 6px;
    margin-right: 8px;
    background-color: v-bind(color);
  }
  .g-status-hint__text {
    &.sync-color {
      color: v-bind(color);
    }
    &.custom-color {
      color: v-bind(labelColor);
    }
  }
}
</style>
