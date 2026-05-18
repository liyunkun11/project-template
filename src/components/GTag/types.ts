// 入参类型
export interface GTagProps {
  // 主题色（用于决定文字色或背景色），不传时取 antdv 的 colorPrimary
  color?: string
  // 是否实底，true=实底（背景=color，文字=白色）；false=透明底（背景=color@0.15，文字=color）
  filled?: boolean
  // 是否显示边框，默认显示
  border?: boolean
  // 透明底时背景色透明度（仅在 filled=false 时生效）
  alpha?: number
  // 高度（单位 px）
  height?: number
  // 圆角大小，不传时自动取高度的一半
  borderRadius?: string
  // 内边距
  padding?: string
  // 字体大小（单位 px）
  fontSize?: number
}
