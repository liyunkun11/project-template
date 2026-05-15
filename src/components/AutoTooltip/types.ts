import type { TooltipProps } from "ant-design-vue";

// 入参类型
export interface AutoTooltipProps {
  title: string | number
  auto?: boolean
  tooltipConfig?: TooltipProps
}
