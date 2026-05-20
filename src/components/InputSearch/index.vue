<template>
  <a-input
    v-bind="$attrs"
    :value="innerValue"
    :placeholder="props.placeholder"
    :allow-clear="props.allowClear"
    :size="props.size"
    :disabled="props.disabled"
    class="input-search"
    @update:value="handleUpdate"
    @change="handleChange"
    @press-enter="handlePressEnter"
  >
    <!-- 搜索图标放在前面 -->
    <template #prefix>
      <SearchOutlined class="input-search__icon" />
    </template>

    <!-- 透传其余具名插槽（排除 prefix，避免覆盖搜索图标） -->
    <template v-for="(_, name) in passthroughSlots" #[name]="slotData">
      <slot :name="name" v-bind="slotData || {}" />
    </template>
  </a-input>
</template>

<script setup lang="ts">
import type { ChangeEvent } from "ant-design-vue/es/_util/EventInterface";
import type { InputSearchEmits, InputSearchProps } from "./types";

import { SearchOutlined } from "@ant-design/icons-vue";
import { useVModel } from "@vueuse/core";
import { computed, useSlots } from "vue";

// 禁用 Attributes 继承（手动透传到内部 a-input）
defineOptions({ inheritAttrs: false });

// 接收参数
const props = withDefaults(defineProps<InputSearchProps>(), {
  modelValue: "",
  placeholder: "请输入关键字搜索",
  allowClear: true,
  disabled: false,
});

// 声明事件
const emit = defineEmits<InputSearchEmits>();

// 当前组件的所有具名插槽
const slots = useSlots();

// 需要透传的插槽（排除被组件内部占用的 prefix）
const passthroughSlots = computed(() => {
  const result: Record<string, unknown> = {};
  Object.keys(slots).forEach((name) => {
    if (name !== "prefix") {
      result[name] = slots[name];
    }
  });
  return result;
});

// 双向绑定值
const innerValue = useVModel(props, "modelValue", emit, { defaultValue: "" });

// 处理值更新，清空时额外触发 search
const handleUpdate = (val: string) => {
  const isCleared = val === "" && innerValue.value !== "";
  innerValue.value = val;
  if (isCleared) {
    emit("search", val);
  }
};

// 处理输入变化事件，向外透传值
const handleChange = (e: ChangeEvent) => {
  emit("change", (e?.target as HTMLInputElement)?.value ?? "");
};

// 处理回车触发搜索
const handlePressEnter = (event: KeyboardEvent) => {
  emit("search", innerValue.value, event);
};
</script>

<style lang="less" scoped>
.input-search {
  width: 100%;

  .input-search__icon {
    color: @color-text-placeholder;
  }
}
</style>
