<template>
  <div class="icon-preview">
    <a-tabs v-model:activeKey="activeKey" type="card">
      <a-tab-pane key="simple" tab="单色图标">
        <div v-for="name in simpleIcons" :key="name" v-copy="getCoptText('simple', name)" class="icon-wrap">
          <g-svg-icon :name="`simple-${name}`" />
          <div>{{ name }}</div>
        </div>
      </a-tab-pane>
      <a-tab-pane key="complex" tab="多色图标">
        <div v-for="name in complexIcons" :key="name" v-copy="getCoptText('complex', name)" class="icon-wrap">
          <g-svg-icon :name="`complex-${name}`" />
          <div>{{ name }}</div>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const activeKey = ref("simple");
const icons = import.meta.glob("/src/icons/**/*.svg");
const simpleIcons: string[] = [];
const complexIcons: string[] = [];

// 给所有icons分类
for (const path in icons) {
  const pathArr = path.split("/");
  const pathName = pathArr[pathArr.length - 1];
  const name = pathName.split(".")[0];
  const type = pathArr[pathArr.length - 2];
  if (type === "simple") {
    simpleIcons.push(name);
  } else {
    complexIcons.push(name);
  }
}

// 获取复制内容
const getCoptText = (type: string, name: string) => {
  return `<g-svg-icon name="${type}-${name}" />`;
};
</script>

<style lang="less" scoped>
.icon-preview {
  width: 100%;
  height: 100%;
  :deep(.ant-tabs-nav) {
    margin-bottom: 0px;
  }
  :deep(.ant-tabs-content) {
    padding: 12px;
    .icon-wrap {
      float: left;
      width: 150px;
      height: 80px;
      font-size: 12px;
      padding-top: 10px;
      text-align: center;
      border: 1px solid transparent;
      cursor: pointer;
      .g-svg-icon {
        font-size: 40px;
        margin-bottom: 8px;
      }
      &:hover {
        color: @colorPrimary;
        border-color: @colorPrimary;
      }
    }
  }
}
</style>
