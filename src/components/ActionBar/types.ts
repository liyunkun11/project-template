// 操作栏按钮配置项
export interface ActionBarButton {
  // 按钮显示文本
  label: string | (() => string)
  // 按钮唯一标识
  value: string | (() => string)
  // 按钮禁用状态，支持布尔值或函数
  disabled?: boolean | (() => boolean)
  // 按钮显示条件，支持布尔值或函数
  visible?: boolean | (() => boolean)
  // 点击确认文案，支持字符串或函数
  confirm?: string | (() => string)
  // 悬浮提示文案，支持字符串或函数
  tooltip?: string | (() => string)
}

// 操作栏组件props
export interface ActionBarProps {
  // 操作栏按钮配置数组
  list: ActionBarButton[]
  // 固定显示的按钮数量，超过则放入更多菜单
  max?: number
  // 当前行数据，用于函数参数的上下文
  data?: Record<string, any>
  // 是否开启按钮权限校验，默认开启
  checkPermission?: boolean
}
