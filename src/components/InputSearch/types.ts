import type { InputProps } from "ant-design-vue";

// InputSearch 组件入参类型
export interface InputSearchProps {
  // 绑定值
  modelValue?: string
  // 占位提示文本
  placeholder?: string
  // 是否允许清空
  allowClear?: boolean
  // 输入框尺寸
  size?: InputProps["size"]
  // 是否禁用
  disabled?: boolean
}

// InputSearch 组件事件类型
export interface InputSearchEmits {
  // 双向绑定值更新
  (e: "update:modelValue", value: string): void
  // 搜索触发（回车）
  (e: "search", value: string, event?: Event): void
  // 输入值变化
  (e: "change", value: string): void
}
