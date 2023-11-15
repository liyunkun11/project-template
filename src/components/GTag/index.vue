<template>
  <span class="g-tag">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { color2rgba } from "@/utils/color";

const props = defineProps({
  color: {
    type: String,
    required: true,
  },
});

// 背景色
const bgColor = computed(() => color2rgba(props.color, 0.3));
</script>

<style lang="less" scoped>
.g-tag {
  display: inline-block;
  width: max-content;
  height: 20px;
  line-height: 20px;
  padding: 0px 8px;
  border-radius: 11px;
  box-sizing: border-box;
  color: v-bind(color);
  background-color: v-bind(bgColor);
}
</style>
