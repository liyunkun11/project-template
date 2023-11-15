import type { PopconfirmProps, TooltipProps } from "ant-design-vue";

// 条件显示/禁用函数类型
export type FnType = (data: Record<string, any>) => boolean;

// 每一项类型
export interface ActionBarItem {
  id: string;
  title: string;
  tooltip?: string;
  confirm?: string;
  condition?: FnType;
  disabled?: FnType | boolean;
  _disabled?: boolean;
  click?: (data: Record<string, any>) => void;
}

// 入参类型
export interface ActionBarProps {
  list: ActionBarItem[];
  max?: number;
  data?: Record<string, any>;
  permission?: boolean;
  tooltipPlacement?: TooltipProps["placement"];
  confirmPlacement?: PopconfirmProps["placement"];
}

// 事件类型
export type ActionBarEmits = (event: "click", id: string, data?: Record<string, any>) => void;
