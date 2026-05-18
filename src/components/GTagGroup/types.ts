import type { GTagProps } from "../GTag/types";

// 单个 tag 数据项（继承 GTagProps，额外加显示文本）
export interface GTagItem extends GTagProps {
  // 标签显示文本
  label: string
}

// GTagGroup 入参类型
export interface GTagGroupProps {
  // tag 数据列表
  list: GTagItem[]
  // 最多参与展示的标签数，0 表示不限制，默认 0
  max?: number
  // tag 之间的间距（单位 px），默认 8
  gap?: number
  // 主题色
  color?: string
  // 是否实底
  filled?: boolean
  // 是否显示边框，默认 true
  border?: boolean
  // 透明底时背景色透明度
  alpha?: number
  // 高度
  height?: number
  // 圆角大小
  borderRadius?: string
  // 内边距
  padding?: string
  // 字体大小
  fontSize?: number
}
