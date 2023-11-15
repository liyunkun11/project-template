<template>
  <div ref="tableRef" class="g-table">
    <!-- 表格 -->
    <vxe-grid
      v-bind="$attrs"
      ref="vxeTableRef"
      :columns="_columns"
      :data="_data"
      :column-config="_columnConfig"
      :row-config="_rowConfig"
      :sort-config="_sortConfig"
      :filter-config="_filterConfig"
      min-height="0px"
      stripe
      auto-resize
      show-overflow
      show-header-overflow
    >
      <template #empty>
        <g-empty />
      </template>
      <template #loading>
        <g-loading />
      </template>
      <template v-for="name in Object.keys($slots)" #[name]="scoped">
        <slot :name="name" v-bind="scoped" />
      </template>
    </vxe-grid>
    <!-- 工具栏 -->
    <div v-if="showToolbar" class="g-table-toolbar">
      <a-popover placement="bottomRight" trigger="click" arrow-point-at-center :get-popup-container="getPopupContainer" @open-change="toolbarOpenChange">
        <template #content>
          <div class="toolbar-wrapper">
            <draggable v-model="toolbarConfig.columns" item-key="id" handle=".anticon-menu" :animation="200" @end="onDragColumnEnd">
              <template #item="{ element }">
                <div v-if="element.type !== 'checkbox'" class="toolbar-item">
                  <a-checkbox v-model:checked="element.visible" :disabled="!!element.type || lastColumn.title == element.title" @change="columnVisibleChange">
                    {{ element.title ?? element.type }}
                  </a-checkbox>
                  <menu-outlined v-if="!element.fixed" />
                </div>
              </template>
            </draggable>
          </div>
        </template>
        <setting-outlined />
      </a-popover>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue";
import draggable from "vuedraggable";
import { MenuOutlined, SettingOutlined } from "@ant-design/icons-vue";

defineOptions({ inheritAttrs: false });

// 接收参数
const props = defineProps({
  // 表格列
  columns: {
    type: Array,
    default: () => [],
  },
  // 表格数据
  data: {
    type: Array,
    default: () => [],
  },
  // 列配置
  columnConfig: {
    type: Object,
    default: () => {
      return {};
    },
  },
  // 行配置
  rowConfig: {
    type: Object,
    default: () => {
      return {};
    },
  },
  // 排序配置
  sortConfig: {
    type: Object,
    default: () => {
      return {};
    },
  },
  // 筛选配置
  filterConfig: {
    type: Object,
    default: () => {
      return {};
    },
  },
  // 是否显示保存列按钮
  showSaveColumnBtn: {
    type: Boolean,
    default: false,
  },
  // 列保存类型
  saveColumnType: {
    type: String,
    default: "",
  },
  // 是否显示表格又上角工具栏
  showToolbar: {
    type: Boolean,
    default: true,
  },
});
// 内部表格列
const _columns = computed(() => {
  const tempColumns = props.columns.map((item: any) => {
    const _item = { ...item };
    if (!_item.formatter) {
      _item.cellRender = { name: "cellRender" };
    }
    return _item;
  });
  return tempColumns;
});
// 内部表格数据
const _data = computed(() => props.data as any[]);
// 内部表格列配置
const _columnConfig = computed(() =>
  Object.assign(
    {
      useKey: true,
      resizable: true,
    },
    props.columnConfig,
  ),
);
// 内部表格行配置
const _rowConfig = computed(() => Object.assign({ isHover: true }, props.rowConfig));
// 内部表格排序配置
const _sortConfig = computed(() => Object.assign({ remote: true }, props.sortConfig));
// 内部筛选排序配置
const _filterConfig = computed(() => Object.assign({ remote: true }, props.filterConfig));
// 最后显示的列
const lastColumn = computed(() => {
  const arr = toolbarConfig.columns.filter((i) => i.visible && !i.type);
  if (arr.length === 1) {
    return arr[0];
  }
  return {};
});

// 表格ref
const tableRef = ref();
// vxe表格ref
const vxeTableRef = ref();
// 获取悬浮窗父元素
const getPopupContainer = (trigger: HTMLElement) => {
  return trigger.parentElement as HTMLElement;
};
// 工具栏配置
const toolbarConfig = reactive({
  columns: [] as any[],
});
// 工具栏显示回调
const toolbarOpenChange = (visible: boolean) => {
  if (visible) {
    const { fullColumn } = vxeTableRef.value.getTableColumn();
    toolbarConfig.columns = fullColumn;
  }
};
// 工具栏列显示隐藏回调
const columnVisibleChange = () => {
  vxeTableRef.value.refreshColumn();
};
// 工具栏列拖动回调
const onDragColumnEnd = ({ newIndex, oldIndex }: any) => {
  const tableRef = vxeTableRef.value;
  const { fullColumn } = tableRef.getTableColumn();
  const dragColumn = fullColumn.splice(oldIndex, 1)[0];
  fullColumn.splice(newIndex, 0, dragColumn);
  tableRef.loadColumn(fullColumn);
};
// 对外暴漏vxeTable方法
const vxeTable = new Proxy(vxeTableRef, {
  get(target, prop) {
    return prop in target.value ? target.value[prop] : undefined;
  },
  set() {
    throw new Error("vxeTable的属性禁止修改");
  },
});
defineExpose({
  vxeTable,
});

// 监听数据改变
watch(
  () => _data.value,
  (newData) => {
    vxeTableRef.value?.loadData(newData);
  },
  {
    deep: true,
    immediate: true,
  },
);
</script>

<style lang="less" scoped>
@tableHeaderHeight: 40px;
.g-table {
  width: 100%;
  font-size: 12px;
  position: relative;
  .g-table-toolbar {
    width: var(--vxe-table-row-height-default);
    position: absolute;
    top: 0px;
    right: 0px;
    color: var(--vxe-table-header-font-color);
    height: @tableHeaderHeight;
    line-height: @tableHeaderHeight;
    text-align: center;
    .anticon-setting:hover {
      color: @colorPrimary;
      cursor: pointer;
    }
    :deep(.ant-popover) {
      min-width: 220px;
      .ant-popover-inner {
        color: @colorText;
        max-height: 265px;
        overflow: auto;
        .toolbar-item {
          margin-bottom: 8px;
          white-space: nowrap;
          user-select: none;
          display: flex;
          align-items: center;
          justify-content: space-between;

          &:nth-last-of-type(1) {
            margin-bottom: 0px;
          }
          .anticon-menu {
            flex: 0;
            cursor: move;
            margin-left: 8px;
            color: var(--vxe-table-header-font-color);
            &:hover {
              counter-reset: @colorPrimary;
            }
          }
        }
      }
    }
  }
  :deep(.vxe-table) {
    .vxe-table--header {
      height: @tableHeaderHeight;
      .vxe-resizable.is--line:before {
        width: 2px;
        height: 12px;
      }
    }
  }
}
</style>
