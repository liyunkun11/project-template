<template>
  <VChart
    ref="chartRef"
    class="base-chart"
    :option="chartOption"
    :theme="realTheme"
    :init-options="realInitOptions"
    :update-options="updateOptions"
    :autoresize="autoresize"
    :manual-update="manualUpdate"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import type { EChartsOption } from "echarts";
import type { EChartsType } from "echarts/core";
import type {
  BaseChartDispatchPayload,
  BaseChartExpose,
  BaseChartLoadingOpts,
  BaseChartLoadingType,
  BaseChartProps,
  BaseChartSetOptionOpts,
} from "./types";
import {
  BarChart,
  BoxplotChart,
  CandlestickChart,
  EffectScatterChart,
  FunnelChart,
  GaugeChart,
  GraphChart,
  HeatmapChart,
  LineChart,
  LinesChart,
  MapChart,
  PictorialBarChart,
  PieChart,
  RadarChart,
  SankeyChart,
  ScatterChart,
  SunburstChart,
  TreeChart,
  TreemapChart,
} from "echarts/charts";
import {
  DatasetComponent,
  DataZoomComponent,
  GridComponent,
  LegendComponent,
  MarkAreaComponent,
  MarkLineComponent,
  MarkPointComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  TransformComponent,
  VisualMapComponent,
} from "echarts/components";
import { use } from "echarts/core";
import { LabelLayout, UniversalTransition } from "echarts/features";
import { CanvasRenderer, SVGRenderer } from "echarts/renderers";
import { computed, ref } from "vue";
import VChart from "vue-echarts";
import { useThemeStore } from "@/stores/theme";

defineOptions({
  name: "BaseChart",
  inheritAttrs: false,
});

// 组件属性默认值
const props = withDefaults(defineProps<BaseChartProps>(), {
  option: () => ({}),
  initOptions: () => ({}),
  updateOptions: () => ({}),
  autoresize: true,
  manualUpdate: false,
  renderer: "canvas",
  transparent: true,
});

// 在封装组件内一次性注册常用 ECharts 模块，避免页面侧重复注册
use([
  CanvasRenderer,
  SVGRenderer,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DatasetComponent,
  TransformComponent,
  ToolboxComponent,
  DataZoomComponent,
  VisualMapComponent,
  MarkLineComponent,
  MarkPointComponent,
  MarkAreaComponent,
  LineChart,
  BarChart,
  PieChart,
  ScatterChart,
  RadarChart,
  GaugeChart,
  FunnelChart,
  HeatmapChart,
  CandlestickChart,
  BoxplotChart,
  EffectScatterChart,
  LinesChart,
  GraphChart,
  SankeyChart,
  TreeChart,
  TreemapChart,
  SunburstChart,
  MapChart,
  PictorialBarChart,
  LabelLayout,
  UniversalTransition,
]);

// 主题状态仓库
const themeStore = useThemeStore();
// 图表组件实例引用
const chartRef = ref<InstanceType<typeof VChart> | null>(null);

// 优先使用外部传入主题，未传入时自动跟随全局明暗主题
const realTheme = computed(() => {
  if (props.theme !== undefined) {
    return props.theme;
  }
  return themeStore.themeMode === "dark" ? "dark" : undefined;
});

// 合并默认渲染器与外部传入的初始化参数
const realInitOptions = computed(() => {
  return {
    renderer: props.renderer,
    ...props.initOptions,
  };
});

// 默认使用透明背景，减少主题切换时的视觉割裂
const chartOption = computed(() => {
  if (!props.transparent) {
    return props.option;
  }
  return {
    ...props.option,
    backgroundColor: "transparent",
  };
});

// 获取 ECharts 原生实例，便于页面执行高级操作
const getInstance = (): EChartsType | undefined => chartRef.value?.chart;

// 透传 setOption，并保持类型约束
const setOption = (option: EChartsOption | Record<string, any>, opts?: BaseChartSetOptionOpts) => {
  getInstance()?.setOption(option, opts);
};

// 父容器尺寸变化时，手动触发重绘
const resize = () => {
  getInstance()?.resize();
};

// 分发 ECharts 内置行为，例如高亮与取消高亮
const dispatchAction = (payload: BaseChartDispatchPayload) => {
  getInstance()?.dispatchAction(payload);
};

// 显示 loading，支持可选类型与配置项
const showLoading = (type?: BaseChartLoadingType, opts?: BaseChartLoadingOpts) => {
  getInstance()?.showLoading(type, opts);
};

// 关闭 loading 状态
const hideLoading = () => {
  getInstance()?.hideLoading();
};

// 对外暴露的方法集合
const baseChartExpose: BaseChartExpose = {
  getInstance,
  setOption,
  resize,
  dispatchAction,
  showLoading,
  hideLoading,
};
defineExpose(baseChartExpose);
</script>

<style lang="less" scoped>
.base-chart {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
