<template>
  <a-tooltip v-bind="_tootipConfig" :disabled="Boolean(!_title)" :title="_title as string">
    <div ref="tooltipRef" v-resize="checkOverflow" class="auto-tooltip" :class="[{ 'is-auto': props.auto }]" v-bind="$attrs">
      <slot />
    </div>
  </a-tooltip>
</template>

<script setup lang="ts">
import type { TooltipProps } from "ant-design-vue";
import type { AutoTooltipProps } from "./types";

import { computed, onMounted, ref } from "vue";
import { isOverflow } from "@/utils/el";

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
    overlayStyle: { whiteSpace: "pre-wrap" },
  };
  return Object.assign(defaultConfig, props.tooltipConfig);
});

// 需要显示的文本 为空字符串时不显示tooltip
const _title = ref(props.title);

// 检测内容是否溢出了
const checkOverflow = () => {
  if (!props.auto) {
    return;
  }
  _title.value = isOverflow(tooltipRef.value) ? props.title : "";
};

// 组件挂载
onMounted(checkOverflow);
</script>

<style lang="less" scoped>
.auto-tooltip {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre;
  &.is-auto {
    max-width: 100%;
  }
}
</style>
