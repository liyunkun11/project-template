<template>
  <svg class="g-svg-icon" aria-hidden="true">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { isEmpty } from "lodash-es";

import { useThemeStore } from "@/stores/theme";

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
  lightName: {
    type: String,
    default: "",
  },
});

const themeStore = useThemeStore();
// ID
const symbolId = ref("");

watchEffect(() => {
  if (themeStore.themeMode === "light") {
    const lightName = isEmpty(props.lightName) ? props.name : props.lightName;
    symbolId.value = `#${props.prefix}-${lightName}`;
  } else {
    symbolId.value = `#${props.prefix}-${props.name}`;
  }
});
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
