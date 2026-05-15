<template>
  <div class="action-bar">
    <!-- 渲染主按钮 -->
    <template v-for="(item, index) in visibleButtons" :key="item.value">
      <span
        v-if="index < (moreButtons.length === 0 ? displayMax : displayMax - 1)"
        class="action-bar-text"
        :class="{ 'is-disabled': getDisabled(item) }"
        @click="handleClick(item)"
      >
        <a-tooltip v-if="item.tooltip" :title="getTooltip(item)" placement="top">
          {{ getLabel(item) }}
        </a-tooltip>
        <template v-else>
          {{ getLabel(item) }}
        </template>
      </span>
    </template>
    <!-- 更多下拉菜单 -->
    <a-dropdown v-if="moreButtons.length > 0" :trigger="['click']">
      <span class="action-bar-text more-text">
        <span>更多</span>
        <svg-icon name="simple/angle-up" />
      </span>
      <template #overlay>
        <a-menu>
          <a-menu-item
            v-for="item in moreButtons"
            :key="getValue(item)"
            :disabled="getDisabled(item)"
            @click="handleClick(item)"
          >
            <a-tooltip v-if="item.tooltip" :title="getTooltip(item)" placement="left">
              {{ getLabel(item) }}
            </a-tooltip>
            <template v-else>
              {{ getLabel(item) }}
            </template>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script setup lang="ts">
import type { ActionBarButton, ActionBarProps } from "./types";
import { Modal } from "ant-design-vue";
import { cloneDeep } from "lodash-es";
import { computed } from "vue";
import { hasPermission } from "@/utils/permission";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<ActionBarProps>(), {
  list: () => [],
  max: 3,
  data: () => ({}),
  checkPermission: true,
});

const emit = defineEmits<{
  click: [value: string, data: Record<string, any>]
}>();

// 显示的按钮数量
const displayMax = computed(() => props.max);
// 根据visible条件过滤出可见的按钮
const visibleButtons = computed(() => {
  return props.list.filter((item) => {
    let isHasPermission = true;
    let isVisible = true;
    // 先校验按钮权限
    if (props.checkPermission) {
      isHasPermission = hasPermission(getValue(item));
    }
    // 校验按钮显示条件
    if (typeof item.visible === "function") {
      isVisible = item.visible();
    }
    else if (typeof item.visible === "boolean") {
      isVisible = item.visible;
    }
    return isHasPermission && isVisible;
  });
});
// 获取需要放入更多下拉菜单的按钮
const moreButtons = computed(() => {
  if (visibleButtons.value.length <= props.max) {
    return [];
  }
  return visibleButtons.value.slice(props.max - 1);
});

// 获取按钮显示文本
const getLabel = (item: ActionBarButton) => {
  if (typeof item.label === "function") {
    return item.label();
  }
  return item.label;
};
// 获取按钮唯一标识
const getValue = (item: ActionBarButton) => {
  if (typeof item.value === "function") {
    return item.value();
  }
  return item.value;
};
// 获取按钮禁用状态
const getDisabled = (item: ActionBarButton) => {
  if (typeof item.disabled === "function") {
    return item.disabled();
  }
  return item.disabled;
};
// 获取按钮确认文案
const getConfirm = (item: ActionBarButton) => {
  if (typeof item.confirm === "function") {
    return item.confirm();
  }
  return item.confirm;
};
// 获取按钮悬浮文案
const getTooltip = (item: ActionBarButton) => {
  if (typeof item.tooltip === "function") {
    return item.tooltip();
  }
  return item.tooltip;
};
// 处理按钮点击事件
const handleClick = async (item: ActionBarButton) => {
  if (getDisabled(item)) {
    return;
  }
  const confirmMsg = getConfirm(item);
  const rowData = cloneDeep(props.data);
  delete rowData._X_ROW_KEY;
  const value = getValue(item);
  if (confirmMsg) {
    try {
      await new Promise<void>((resolve, reject) => {
        Modal.confirm({
          title: "操作确认",
          content: confirmMsg,
          okText: "确定",
          cancelText: "取消",
          onOk: () => resolve(),
          onCancel: () => reject(new Error("cancel")),
        });
      });
      emit("click", value, rowData);
    }
    catch {}
  }
  else {
    emit("click", value, rowData);
  }
};
</script>

<style lang="less" scoped>
.action-bar {
  display: inline-flex;
  align-items: center;
  flex-wrap: nowrap;
  gap: 8px;

  .action-bar-text {
    flex: none;
    cursor: pointer;
    color: @color-primary;
    user-select: none;
    display: flex;
    align-items: center;
    gap: 2px;

    &:hover:not(.is-disabled) {
      color: @color-primary-hover;
    }

    &:active:not(.is-disabled) {
      color: @color-primary-active;
    }

    &.is-disabled {
      cursor: not-allowed;
      color: @color-text-disabled;
    }

    &.more-text.ant-dropdown-open {
      .svg-icon {
        transform: rotate(180deg);
      }
    }
  }
}
</style>
