<template>
  <div class="g-pagination">
    <div v-if="showTotal" class="g-pagination-total">
      <slot name="total">
        <span>共</span>
        <g-count-up :end-val="totalPage" />
        <span>页/</span>
        <g-count-up :end-val="total" />
        <span>条数据</span>
      </slot>
    </div>
    <a-pagination v-bind="fullOptions" :current="current" :page-size="pageSize" @change="handlePageSizeChange" />
  </div>
</template>

<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { type PaginationProps } from "ant-design-vue";

// 接收参数
const props = defineProps({
  showTotal: {
    type: Boolean,
    default: true,
  },
  total: {
    type: Number,
    default: 0,
  },
  current: {
    type: Number,
    default: 1,
  },
  pageSize: {
    type: Number,
    default: 20,
  },
});
// 接收剩余参数
const attrs = useAttrs();
// 接收事件
const emit = defineEmits(["update:current", "update:pageSize", "change"]);

// 完整配置
const fullOptions = computed<PaginationProps>(() => {
  return {
    size: "small",
    total: props.total,
    defaultPageSize: 20,
    pageSizeOptions: ["10", "20", "50", "100", "200"],
    showQuickJumper: true,
    showSizeChanger: true,
    ...attrs,
  };
});

// 分页改变回调
const handlePageSizeChange: PaginationProps["onChange"] = (page, pageSize) => {
  if (pageSize === props.pageSize) {
    emit("update:current", page);
  } else {
    emit("update:current", 1);
    emit("update:pageSize", pageSize);
  }
  emit("change", page, pageSize);
};

// 总页数
const totalPage = computed(() => {
  return Math.ceil(props.total / props.pageSize);
});
</script>

<style lang="less" scoped>
.g-pagination {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  box-sizing: border-box;
  :deep(.ant-select) {
    min-width: 90px;
  }
}
</style>
