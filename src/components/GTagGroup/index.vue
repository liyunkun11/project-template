<template>
  <div class="g-tag-group">
    <g-tag v-for="(tag, index) in showTags" :key="index" :color="tag.color ?? color">
      {{ tag[fieldNames.title] }}
    </g-tag>
    <template v-if="hiddenTags.length !== 0">
      <a-popover trigger="hover" placement="right" :get-popup-container="getPopupContainer">
        <template #content>
          <g-tag v-for="(tag, index) in hiddenTags" :key="index" :color="tag.color ?? color">
            {{ tag[fieldNames.title] }}
          </g-tag>
        </template>
        <span class="g-tag-group__count">({{ hiddenTags.length }})</span>
      </a-popover>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, withDefaults } from "vue";

import type { TagGroupProps } from "./types";

// 接收参数
const props = withDefaults(defineProps<TagGroupProps>(), {
  max: -1,
  color: "",
  fieldNames: () => ({ title: "title" }),
});

// 气泡渲染容器
const getPopupContainer = (trigger: HTMLElement) => {
  return trigger.parentElement as HTMLElement;
};

// 外部显示的标签
const showTags = computed(() => {
  if (props.max < 0) {
    return props.tags;
  } else {
    return props.tags.slice(0, props.max);
  }
});

// 隐藏悬浮显示的标签
const hiddenTags = computed(() => props.tags.slice(showTags.value.length));
</script>

<style lang="less" scoped>
.g-tag-group {
  display: flex;
  align-items: center;
  .g-tag {
    margin-right: 6px;
  }
  .g-tag-group__count {
    font-size: 12px;
    color: @colorPrimary;
    cursor: pointer;
  }
  :deep(.ant-popover) {
    .ant-popover-inner {
      padding: 6px;
      .ant-popover-inner-content {
        max-height: 175px;
        overflow: auto;
        .g-tag {
          display: block;
          margin-right: 0px;
          margin-bottom: 8px;
          &:nth-last-of-type(1) {
            margin-bottom: 0px;
          }
        }
      }
    }
  }
}
</style>
