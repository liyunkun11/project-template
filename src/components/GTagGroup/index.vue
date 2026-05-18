<template>
  <div class="g-tag-group" :style="groupStyle">
    <!-- 可见的标签列表 -->
    <g-tag
      v-for="(item, index) in visibleList"
      :key="index"
      :color="resolveTagProp(item.color, props.color)"
      :filled="resolveTagProp(item.filled, props.filled)"
      :border="resolveTagProp(item.border, props.border)"
      :alpha="resolveTagProp(item.alpha, props.alpha)"
      :height="resolveTagProp(item.height, props.height)"
      :border-radius="resolveTagProp(item.borderRadius, props.borderRadius)"
      :padding="resolveTagProp(item.padding, props.padding)"
      :font-size="resolveTagProp(item.fontSize, props.fontSize)"
    >
      {{ item.label }}
    </g-tag>

    <!-- 超出部分计数 -->
    <a-popover v-if="overflowList.length > 0" overlay-class-name="g-tag-group-popover" trigger="click" placement="top" :title="popupTitle">
      <template #content>
        <div class="g-tag-group__popup">
          <g-tag
            v-for="(item, index) in props.list"
            :key="index"
            :color="resolveTagProp(item.color, props.color)"
            :filled="resolveTagProp(item.filled, props.filled)"
            :border="resolveTagProp(item.border, props.border)"
            :alpha="resolveTagProp(item.alpha, props.alpha)"
            :height="resolveTagProp(item.height, props.height)"
            :border-radius="resolveTagProp(item.borderRadius, props.borderRadius)"
            :padding="resolveTagProp(item.padding, props.padding)"
            :font-size="resolveTagProp(item.fontSize, props.fontSize)"
          >
            {{ item.label }}
          </g-tag>
        </div>
      </template>
      <span class="g-tag-group__count">
        ({{ overflowList.length }})
      </span>
    </a-popover>
  </div>
</template>

<script setup lang="ts">
import type { GTagGroupProps } from "./types";

import { computed } from "vue";

// 接收参数
const props = withDefaults(defineProps<GTagGroupProps>(), {
  list: () => [],
  max: 0,
  border: true,
  gap: 8,
});

// 需要显示的标签列表
const visibleList = computed(() => {
  if (props.max > 0) {
    return props.list.slice(0, props.max);
  }
  return props.list;
});

// 被折叠的标签列表
const overflowList = computed(() => {
  if (props.max > 0) {
    return props.list.slice(props.max);
  }
  return [];
});

// 弹窗标题
const popupTitle = computed(() => {
  return `全部标签（${props.list.length}）`;
});

// 容器样式
const groupStyle = computed(() => ({
  gap: `${props.gap}px`,
}));

// 解析 tag 属性，组级属性优先，未传则回退到单个标签自身属性
function resolveTagProp<T>(itemValue: T | undefined, groupValue: T | undefined) {
  return groupValue ?? itemValue;
}
</script>

<style lang="less">
.g-tag-group-popover {
  width: 550px;
  .ant-popover-inner-content {
    width: 100%;
  }
  .g-tag-group__popup {
    max-height: 300px;
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
}
</style>

<style lang="less" scoped>
.g-tag-group {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;

  .g-tag-group__count {
    display: inline-flex;
    cursor: pointer;
    user-select: none;
    font-size: 12px;
    color: @color-primary;
  }
}
</style>
