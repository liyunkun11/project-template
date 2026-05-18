import type { CSSProperties } from "vue";

// 入参类型
export interface GLoadingProps {
  // 水平居中
  horizontalCenter?: boolean
  // 垂直居中
  verticalCenter?: boolean
  // 描述文本
  desc?: string
  // 描述文本样式
  descStyle?: CSSProperties
  // 是否显示icon
  showIcon?: boolean
  // icon名称
  iconName?: string
  // icon样式
  iconStyle?: CSSProperties
  // spin大小
  spinSize?: "small" | "default" | "large"
}
