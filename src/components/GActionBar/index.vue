<template>
  <div class="g-action-bar">
    <!-- 外部常显的 -->
    <div v-for="item in externalItems" :key="item.id" class="g-action-bar__item">
      <template v-if="item.confirm && !item._disabled">
        <!-- 判断是否需要确认气泡 -->
        <a-popconfirm :placement="confirmPlacement" :title="item.confirm" @confirm="handleClick(item)">
          <a-tooltip :title="item.tooltip ?? ''" :placement="tooltipPlacement">
            <span :class="['g-action-bar__item-text', { disabled: item._disabled }]">{{ item.title }}</span>
          </a-tooltip>
        </a-popconfirm>
      </template>
      <template v-else>
        <a-tooltip :title="item.tooltip ?? ''" :placement="tooltipPlacement">
          <span :class="['g-action-bar__item-text', { disabled: item._disabled }]" @click="handleClick(item)">{{ item.title }}</span>
        </a-tooltip>
      </template>
    </div>
    <!-- 更多里面的 -->
    <a-dropdown v-model:open="dropdownOpen" trigger="click" placement="bottom">
      <div v-if="internalItems.length != 0" class="g-action-bar__item" @click.prevent>
        <span class="g-action-bar__item-text">更多<up-outlined :class="{ active: dropdownOpen }" /></span>
      </div>
      <template #overlay>
        <a-menu>
          <template v-for="item in internalItems" :key="item.id">
            <!-- 判断是否需要确认气泡 -->
            <template v-if="item.confirm && !item._disabled">
              <a-popconfirm placement="left" :title="item.confirm" @confirm="handleClick(item)">
                <a-menu-item :key="item.id">
                  <a-tooltip :title="item.tooltip ?? ''" :placement="tooltipPlacement">
                    <span>{{ item.title }}</span>
                  </a-tooltip>
                </a-menu-item>
              </a-popconfirm>
            </template>
            <template v-else>
              <a-menu-item :key="item.id" :disabled="item._disabled" @click="handleClick(item)">
                <a-tooltip :title="item.tooltip ?? ''" :placement="tooltipPlacement">
                  <span>{{ item.title }}</span>
                </a-tooltip>
              </a-menu-item>
            </template>
          </template>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { cloneDeep } from "lodash-es";
import { UpOutlined } from "@ant-design/icons-vue";

import type { ActionBarEmits, ActionBarItem, ActionBarProps } from "./types";

// 接收参数
const props = withDefaults(defineProps<ActionBarProps>(), {
  max: 3,
  data: () => ({}),
  tooltipPlacement: "top",
  confirmPlacement: "top",
});
// 接收事件
const emit = defineEmits<ActionBarEmits>();

// 更多下拉状态
const dropdownOpen = ref(false);

// 过滤操作栏元素
const filterItems = (items: ActionBarItem[]): ActionBarItem[] => {
  const _items = cloneDeep(items);
  let result: ActionBarItem[] = _items;
  // 根据条件判断元素是否渲染
  result = result.filter((item) => {
    if (typeof item.condition === "function") {
      const render = item.condition(props.data);
      if (render) return true;
      return false;
    }
    return true;
  });
  // 根据条件判断元素是否禁用
  result.forEach((item) => {
    if (typeof item.disabled === "function") {
      item._disabled = item.disabled(props.data);
    } else {
      item._disabled = item.disabled;
    }
  });
  return result;
};
// 过滤后的操作栏元素
const filteredItems = filterItems(props.list);

// 外部常显的
const externalItems = computed(() => filteredItems.slice(0, props.max - 1));

// 更多里面的
const internalItems = computed(() => filteredItems.slice(props.max - 1));

// 点击回调
const handleClick = (item: ActionBarItem) => {
  if (item.disabled) return;
  if (dropdownOpen.value) dropdownOpen.value = false;
  if (item.click) item.click(props.data);
  emit("click", item.id, props.data);
};
</script>

<style lang="less" scoped>
.g-action-bar {
  display: inline-block;
  .g-action-bar__item {
    display: inline-block;
    user-select: none;
    margin-right: 8px;
    .g-action-bar__item-text {
      font-size: 12px;
      color: @colorPrimary;
      cursor: pointer;
      .anticon-up {
        font-size: 12px;
        margin-left: 2px;
        transition: transform 0.2s linear;
        &.active {
          transform: rotate(180deg);
        }
      }
      &.disabled {
        color: rgba(0, 0, 0, 0.5);
        cursor: not-allowed;
      }
    }
    &::after {
      content: "";
      display: inline-block;
      margin-left: 8px;
      width: 1px;
      height: 8px;
      background-color: #e1e1e1;
    }
    &:nth-last-of-type(1) {
      margin-right: 0px;
      &::after {
        display: none;
      }
    }
  }
}
</style>
