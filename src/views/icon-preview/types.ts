// 单个图标项
export interface IconItem {
  // 所属目录（如 simple、complex）
  dir: string
  // 文件名（不含扩展名）
  fileName: string
  // 完整名称（SvgIcon 组件入参，<dir>/<fileName>）
  name: string
}

// 图标分组
export interface IconGroup {
  // 分组目录名
  dir: string
  // 该分组下的图标列表
  icons: IconItem[]
}
