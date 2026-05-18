<template>
  <div class="g-loading" :class="[{ 'g-loading--horizontal-center': horizontalCenter }, { 'g-loading--vertical-center': verticalCenter }]">
    <div v-if="showIcon" class="g-loading__icon">
      <svg-icon v-if="iconName" :name="iconName" :style="iconStyle" />
      <a-spin v-else :size="spinSize" />
    </div>
    <slot name="desc">
      <p class="g-loading__desc" :style="descStyle">
        {{ desc }}
      </p>
    </slot>
  </div>
</template>

<script setup lang="ts">
import type { GLoadingProps } from "./types";

// 接收参数
withDefaults(defineProps<GLoadingProps>(), {
  horizontalCenter: true,
  verticalCenter: false,
  desc: "数据加载中...",
  descStyle: () => ({}),
  showIcon: true,
  iconName: "",
  iconStyle: () => ({}),
  spinSize: "default",
});
</script>

<style lang="less" scoped>
@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.g-loading {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  &.g-loading--horizontal-center {
    text-align: center;
  }
  &.g-loading--vertical-center {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }

  .g-loading__icon {
    margin-bottom: 8px;

    .svg-icon {
      font-size: 30px;
      color: @color-primary;
      animation: rotation 1s linear infinite;
    }
  }

  .g-loading__desc {
    margin: 0px;
    color: @color-text-secondary;
  }
}
</style>
