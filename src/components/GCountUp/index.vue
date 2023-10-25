<template>
  <span ref="countUpRef" class="g-count-up" />
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { CountUp, type CountUpOptions } from "countup.js";

// 接收参数
const props = defineProps({
  delay: {
    type: Number,
    default: 0,
  },
  endVal: {
    type: Number,
    required: true,
  },
  options: {
    type: Object,
    default: () => ({}),
  },
});

// 组件ref
const countUpRef = ref();
// 组件实例
let instance: any = null;

// 默认配置
const defaultOptions: CountUpOptions = {
  startVal: 0,
  duration: 0.3,
  separator: ",",
  decimal: ".",
  decimalPlaces: 0,
};

// 更新值
const updateVal = (endVal: number) => {
  if (!instance) return;
  instance.update(endVal);
};
defineExpose({ updateVal });

// 页面加载完成
onMounted(() => {
  instance = new CountUp(countUpRef.value, 0, Object.assign(defaultOptions, props.options));
  instance.update(props.endVal);
});

// 监听值改变
watch(() => props.endVal, updateVal);
</script>

<style lang="less" scoped></style>
