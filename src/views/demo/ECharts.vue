<template>
  <div ref="echartsRef" class="echarts-wrap"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import { useECharts } from "@/hooks/useECharts";

const echartsRef = ref();
const { setOptions } = useECharts(echartsRef);

onMounted(() => {
  setOptions({
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: "line",
      },
    ],
  });
});
</script>

<style lang="less" scoped>
.echarts-wrap {
  width: 100%;
  height: 300px;
}
</style>
