<template>
  <div class="comp-preview">
    <a-form :mode="formState" :colon="false" :label-col="{ span: 2 }">
      <a-form-item label="深色模式">
        <a-switch v-model:checked="themeMode"></a-switch>
      </a-form-item>
      <a-form-item label="禁用表单">
        <a-switch v-model:checked="formState.disabled"></a-switch>
      </a-form-item>
      <a-form-item label="数字展示">
        <g-count-up :end-val="countUpVal"></g-count-up>
        <a-button size="small" type="primary" @click="handleRandomVal">随机改变</a-button>
      </a-form-item>
      <a-form-item label="按钮">
        <a-button type="primary" :disabled="formState.disabled">
          <!-- 可以通过light-name属性来配置浅色模式下的icon -->
          <g-svg-icon name="simple-loading" light-name="complex-empty" />
          <span>主按钮</span>
        </a-button>
        <a-button :disabled="formState.disabled">默认按钮</a-button>
        <a-popconfirm title="确定要删除这条数据？">
          <a-button type="primary">删除确认</a-button>
        </a-popconfirm>
        <a-tooltip title="这是一条tooltip">
          <a-button type="primary">tooltip</a-button>
        </a-tooltip>
        <a-popover title="标题">
          <template #content>
            <p>Content</p>
            <p>Content</p>
          </template>
          <a-button type="primary">气泡卡片</a-button>
        </a-popover>
        <a-button type="primary" @click="handleOpenModal">打开弹窗</a-button>
        <a-button type="primary" @click="handleOpenDrawer">打开抽屉</a-button>
        <a-button type="primary" @click="handleOpenMessage">打开消息提示</a-button>
      </a-form-item>
      <a-form-item label="输入框">
        <a-input v-model:value="formState.input" allow-clear :disabled="formState.disabled"></a-input>
      </a-form-item>
      <a-form-item label="搜索框">
        <a-input-search v-model:value="formState.inputSearch" allow-clear :disabled="formState.disabled"></a-input-search>
      </a-form-item>
      <a-form-item label="数字框">
        <a-input-number v-model:value="formState.inputNumber" :disabled="formState.disabled"></a-input-number>
      </a-form-item>
      <a-form-item label="下拉框">
        <a-select v-model:value="formState.select" :options="selectOptions" allow-clear :disabled="formState.disabled"></a-select>
      </a-form-item>
      <a-form-item label="日期搜索">
        <a-range-picker v-model:value="formState.picker" :disabled="formState.disabled" show-time value-format="x" />
      </a-form-item>
      <a-form-item label="状态提示">
        <g-status-hint color="#11CABE">默认</g-status-hint>
        <g-status-hint color="#FAAD14" sync-color>同步颜色</g-status-hint>
        <g-status-hint color="#F5222D" label-color="#1890FF">自定义颜色</g-status-hint>
      </a-form-item>
      <a-form-item label="标签">
        <g-tag v-for="(tag, index) in tags" :key="index" :color="tag.color">{{ tag.title }}</g-tag>
      </a-form-item>
      <a-form-item label="标签组">
        <g-tag-group :tags="tags" :max="3" />
      </a-form-item>
      <a-form-item label="提示">
        <a-alert show-icon closable message="恭喜！你所提交的信息已经审核通过。" type="success" />
        <a-alert show-icon closable message="你好！欢迎使用，你可以根据自身需求添加业务模块。" type="info" />
        <a-alert show-icon closable message="系统将于 15:00 - 17:00 进行升级！" type="warning" />
        <a-alert show-icon closable message="系统错误，请稍后重试。" type="error" />
      </a-form-item>
    </a-form>
    <div class="table-demo">
      <g-table v-bind="tableOptions"></g-table>
      <g-pagination v-model:current="paginationOptions.current" v-model:page-size="paginationOptions.pagiSize" :total="paginationOptions.total"></g-pagination>
    </div>
    <a-modal v-model:open="modalOpen" title="弹窗标题">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal>
    <a-drawer v-model:open="drawerOpen" title="Basic Drawer" placement="right">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-drawer>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { message } from "ant-design-vue";

import { useThemeStore } from "@/stores/theme";

const themeStore = useThemeStore();

const themeMode = computed({
  get() {
    return themeStore.themeMode === "dark";
  },
  set(val) {
    if (val) {
      themeStore.themeMode = "dark";
    } else {
      themeStore.themeMode = "light";
    }
  },
});

const countUpVal = ref(0);
const handleRandomVal = () => {
  countUpVal.value = Math.floor(Math.random() * 99999);
};

const selectOptions = [
  { label: "选项1", value: 1 },
  { label: "选项2", value: 2 },
];

const formState = reactive({
  disabled: false,
  input: "输入框内容",
  inputSearch: "搜索框内容",
  inputNumber: 11,
  select: 1,
  picker: ["1698831421916", "1701337025916"] as [string, string],
});

const tableOptions = {
  data: [
    { label: 1, value: 1 },
    { label: 2, value: 2 },
  ],
  columns: [
    { title: "标题", field: "label" },
    { title: "值", field: "value" },
  ],
};

const paginationOptions = reactive({
  current: 1,
  total: 10000,
  pagiSize: 20,
});

const modalOpen = ref(false);
const handleOpenModal = () => {
  modalOpen.value = true;
};

const drawerOpen = ref(false);
const handleOpenDrawer = () => {
  drawerOpen.value = true;
};

const handleOpenMessage = () => {
  message.success("这是一条成功消息，会主动消失。");
  message.info("这是一条信息消息，会主动消失。");
  message.warning("这是一条询问消息，会主动消失。");
  message.error("这是一条异常消息，会主动消失。");
};

const tags = [
  {
    title: "标签",
    color: "#11CABE",
  },
  {
    title: "标签",
    color: "#1890FF",
  },
  {
    title: "标签",
    color: "#FAAD14",
  },
  {
    title: "标签",
    color: "#DF4A4A",
  },
  {
    title: "标签",
    color: "#CB207E",
  },
  {
    title: "标签",
    color: "#8F58DB",
  },
  {
    title: "标签",
    color: "#29A684",
  },
];
</script>

<style lang="less" scoped>
.comp-preview {
  padding: 16px;
  box-sizing: border-box;
  .ant-btn {
    margin-right: 8px;
  }
  :deep(.ant-input-group-addon) {
    display: none;
  }
  .g-status-hint {
    margin-right: 8px;
  }
  .ant-alert {
    margin-bottom: 8px;
  }

  .g-tag {
    margin-right: 6px;
  }

  .table-demo {
    width: 100%;
    height: auto;
  }
}
</style>
