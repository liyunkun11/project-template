<template>
  <svg class="g-svg-icon" aria-hidden="true">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from "vue";

// 接收参数
const props = defineProps({
  prefix: {
    type: String,
    default: "icon",
  },
  name: {
    type: String,
    required: true,
  },
});
// ID
const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>

<style lang="less" scoped>
.g-svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
