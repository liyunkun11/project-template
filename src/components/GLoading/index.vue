<template>
  <div :class="['g-loading', { 'g-loading-horizontal-center': horizontalCenter }, { 'g-loading-vertical-center': verticalCenter }]">
    <div v-if="showIcon" class="loading-icon">
      <g-svg-icon :name="iconName" :style="iconStyle" />
    </div>
    <slot name="desc">
      <p class="loading-desc" :style="descStyle">{{ desc }}</p>
    </slot>
  </div>
</template>

<script setup lang="ts">
import type { PropType, CSSProperties } from "vue";
// 接收参数
defineProps({
  // 水平居中
  horizontalCenter: {
    type: Boolean,
    default: true,
  },
  // 垂直居中
  verticalCenter: {
    type: Boolean,
    default: false,
  },
  // 描述文本
  desc: {
    type: String,
    default: "数据加载中...",
  },
  // 描述文本样式
  descStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => ({}),
  },
  // 是否显示icon
  showIcon: {
    type: Boolean,
    default: true,
  },
  // icon名称
  iconName: {
    type: String,
    default: "simple-loading",
  },
  // icon样式
  iconStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => ({}),
  },
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
  &.g-loading-horizontal-center {
    text-align: center;
  }
  &.g-loading-vertical-center {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }

  .loading-icon {
    margin-bottom: 8px;

    .g-svg-icon {
      font-size: 30px;
      color: @primary-color;
      animation: rotation 1s linear infinite;
    }
  }

  .loading-desc {
    color: #656566;
    font-size: 12px;
    margin: 0px;
  }
}
</style>
