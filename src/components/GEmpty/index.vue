<template>
  <div :class="['g-empty', { 'g-empty--vertical-center': verticalCenter }]">
    <div v-if="showIcon" class="g-empty__icon">
      <g-svg-icon :name="iconName" :style="iconStyle" />
    </div>
    <slot name="desc">
      <p class="g-empty__desc" :style="descStyle">{{ desc }}</p>
    </slot>
  </div>
</template>

<script setup lang="ts">
import type { CSSProperties, PropType } from "vue";
// 接收参数
defineProps({
  // 垂直居中
  verticalCenter: {
    type: Boolean,
    default: false,
  },
  // 描述文本
  desc: {
    type: String,
    default: "暂无数据",
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
    default: "complex-empty",
  },
  // icon样式
  iconStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => ({}),
  },
});
</script>

<style lang="less" scoped>
.g-empty {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  text-align: center;
  &.g-empty--vertical-center {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
  .g-empty__icon {
    margin-bottom: 8px;
    .g-svg-icon {
      font-size: 120px;
    }
  }
  .g-empty__desc {
    color: #656566;
    font-size: 12px;
    margin: 0px;
  }
}
</style>
