<template>
  <span class="g-tag" :style="tagStyle">
    <slot />
  </span>
</template>

<script setup lang="ts">
import type { GTagProps } from "./types";
import { theme } from "ant-design-vue";
import color from "color";
import { computed } from "vue";

// 接收参数
const props = withDefaults(defineProps<GTagProps>(), {
  color: "",
  filled: false,
  border: true,
  alpha: 0.15,
  height: 20,
  padding: "0 8px",
  fontSize: 12,
});

// 从 antdv token 中获取主题主色
const { token } = theme.useToken();

// 解析后的主题色：优先用传入的 color，否则取 antdv colorPrimary
const resolvedColor = computed(() => {
  return props.color || token.value.colorPrimary;
});

// 实际圆角：未传时取高度一半，传了就用传入值
const resolvedBorderRadius = computed(() => {
  return props.borderRadius ?? `${props.height / 2}px`;
});

// 标签的内联样式（包含文字色、背景色、高度、圆角、内边距、字体大小）
const tagStyle = computed(() => {
  const themeColor = color(resolvedColor.value);
  // 边框色参考 Ant Design 社区常用色阶：浅底标签使用同色系中浅色边框
  const borderColor = themeColor.alpha(0.45).rgb().toString();
  const base = {
    height: `${props.height}px`,
    lineHeight: `${props.height - 2}px`, // 减去border后正确的行高
    borderRadius: resolvedBorderRadius.value,
    padding: props.padding,
    fontSize: `${props.fontSize}px`,
    border: props.border ? `1px solid ${borderColor}` : "none",
  };
  if (props.filled) {
    // 实底：文字=白色，背景=主题色
    return {
      ...base,
      color: "#ffffff",
      backgroundColor: themeColor.rgb().toString(),
      borderColor: props.border ? themeColor.rgb().toString() : undefined,
    };
  }
  // 透明底：文字=主题色，背景=主题色 + alpha
  return {
    ...base,
    color: themeColor.rgb().toString(),
    backgroundColor: themeColor.alpha(props.alpha).rgb().toString(),
  };
});
</script>

<style lang="less" scoped>
.g-tag {
  flex-shrink: 0;
  display: inline-block;
  width: max-content;
}
</style>
