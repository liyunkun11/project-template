import type { EChartsOption } from "echarts";
import type { EChartsType } from "echarts/core";

export interface BaseChartProps {
  option: EChartsOption | Record<string, any>
  theme?: string | object
  initOptions?: Record<string, any>
  updateOptions?: Record<string, any>
  autoresize?: boolean | Record<string, any>
  manualUpdate?: boolean
  renderer?: "canvas" | "svg"
  transparent?: boolean
}

export type BaseChartSetOptionOpts = Parameters<EChartsType["setOption"]>[1];
export type BaseChartDispatchPayload = Parameters<EChartsType["dispatchAction"]>[0];
export type BaseChartLoadingType = Parameters<EChartsType["showLoading"]>[0];
export type BaseChartLoadingOpts = Parameters<EChartsType["showLoading"]>[1];

export interface BaseChartExpose {
  getInstance: () => EChartsType | undefined
  setOption: (option: EChartsOption | Record<string, any>, opts?: BaseChartSetOptionOpts) => void
  resize: () => void
  dispatchAction: (payload: BaseChartDispatchPayload) => void
  showLoading: (type?: BaseChartLoadingType, opts?: BaseChartLoadingOpts) => void
  hideLoading: () => void
}
