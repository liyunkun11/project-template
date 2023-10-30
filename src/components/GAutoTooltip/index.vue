<template>
  <a-tooltip v-bind="_tootipConfig" :title="_title">
    <div ref="tooltipRef" v-resize="checkOverflow" :class="['g-auto-tooltip', { 'is-auto': props.auto }]" v-bind="$attrs">
      <slot />
    </div>
  </a-tooltip>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import type { TooltipProps } from "ant-design-vue";

import { isOverflow } from "@/utils/el";

import type { AutoTooltipProps } from "./types";

// 禁用Attributes继承
defineOptions({ inheritAttrs: false });

// 接收参数
const props = withDefaults(defineProps<AutoTooltipProps>(), {
  auto: true,
});

// 组件ref
const tooltipRef = ref();

// tooltip配置
const _tootipConfig = computed(() => {
  const defaultConfig: TooltipProps = {
    trigger: "hover",
    destroyTooltipOnHide: true,
  };
  return Object.assign(defaultConfig, props.tooltipConfig);
});

// 需要显示的文本 为空字符串时不显示tooltip
const _title = ref(props.title);

// 检测内容是否溢出了
const checkOverflow = () => {
  if (!props.auto) return;
  _title.value = isOverflow(tooltipRef.value) ? props.title : "";
};

// 组件挂载完成
onMounted(checkOverflow);
</script>

<style lang="less" scoped>
.g-auto-tooltip {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  &.is-auto {
    width: 100%;
  }
}
</style>
