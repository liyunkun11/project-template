<template>
  <a-drawer v-model:open="visible" title="主题设置" width="350px">
    <a-form :colon="false" :label-col="{ style: { width: '80px' } }">
      <a-form-item label="暗色主题">
        <a-switch v-model:checked="themeMode" />
      </a-form-item>
      <a-form-item label="主题色">
        <a-row :gutter="8">
          <a-col :span="12">
            <ColorPicker v-model:pure-color="primaryColor" format="hex" shape="square" disable-alpha disable-history />
          </a-col>
          <a-col :span="12">
            <a-button @click="handleRestoreDefault('primary')">
              恢复默认
            </a-button>
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item label="成功色">
        <a-row :gutter="8">
          <a-col :span="12">
            <ColorPicker v-model:pure-color="successColor" format="hex" shape="square" disable-alpha disable-history />
          </a-col>
          <a-col :span="12">
            <a-button @click="handleRestoreDefault('success')">
              恢复默认
            </a-button>
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item label="警告色">
        <a-row :gutter="8">
          <a-col :span="12">
            <ColorPicker v-model:pure-color="warningColor" format="hex" shape="square" disable-alpha disable-history />
          </a-col>
          <a-col :span="12">
            <a-button @click="handleRestoreDefault('warning')">
              恢复默认
            </a-button>
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item label="信息色">
        <a-row :gutter="8">
          <a-col :span="12">
            <ColorPicker v-model:pure-color="infoColor" format="hex" shape="square" disable-alpha disable-history />
          </a-col>
          <a-col :span="12">
            <a-button @click="handleRestoreDefault('info')">
              恢复默认
            </a-button>
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item label="失败色">
        <a-row :gutter="8">
          <a-col :span="12">
            <ColorPicker v-model:pure-color="errorColor" format="hex" shape="square" disable-alpha disable-history />
          </a-col>
          <a-col :span="12">
            <a-button @click="handleRestoreDefault('error')">
              恢复默认
            </a-button>
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item label="清空缓存">
        <a-button type="primary" @click="handleClearCache">
          清空缓存并刷新
        </a-button>
      </a-form-item>
    </a-form>
  </a-drawer>
  <div class="settings-icon" @click="visible = true">
    <svg-icon name="simple/settings-outlined" />
  </div>
</template>

<script setup lang="ts">
import type { ColorType } from "@/stores/theme";
import { computed, ref } from "vue";
import { ColorPicker } from "vue3-colorpicker";
import { useThemeStore } from "@/stores/theme";
import { getCssVar } from "@/utils/cssvar";
import "vue3-colorpicker/style.css";

// 主题仓库
const themeStore = useThemeStore();

// 抽屉显示状态
const visible = ref(false);

// 主题模式开关值
const themeMode = computed({
  get() {
    return themeStore.themeMode === "dark";
  },
  set(value) {
    themeStore.setThemeMode(value ? "dark" : "light");
  },
});

// 主题色选择值
const primaryColor = computed({
  get() {
    return themeStore.primaryColor ? themeStore.primaryColor : getCssVar("--color-primary");
  },
  set(value: string) {
    themeStore.setThemeColor("primary", value);
  },
});

// 成功色选择值
const successColor = computed({
  get() {
    return themeStore.successColor ? themeStore.successColor : getCssVar("--color-success");
  },
  set(value: string) {
    themeStore.setThemeColor("success", value);
  },
});

// 警告色选择值
const warningColor = computed({
  get() {
    return themeStore.warningColor ? themeStore.warningColor : getCssVar("--color-warning");
  },
  set(value: string) {
    themeStore.setThemeColor("warning", value);
  },
});

// 信息色选择值
const infoColor = computed({
  get() {
    return themeStore.infoColor ? themeStore.infoColor : getCssVar("--color-info");
  },
  set(value: string) {
    themeStore.setThemeColor("info", value);
  },
});

// 失败色选择值
const errorColor = computed({
  get() {
    return themeStore.errorColor ? themeStore.errorColor : getCssVar("--color-error");
  },
  set(value: string) {
    themeStore.setThemeColor("error", value);
  },
});

// 恢复默认颜色
const handleRestoreDefault = (type: ColorType) => {
  themeStore.restoreThemeColor(type);
};

// 清空主题缓存
const handleClearCache = () => {
  themeStore.clearThemeCache();
  window.location.reload();
};
</script>

<style lang="less" scoped>
.settings-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  cursor: pointer;
  border-radius: 6px;
  font-size: 20px;
  user-select: none;

  &:hover {
    color: @color-primary;
    background-color: rgba(@color-primary-rgb, 0.15);
  }
}
</style>
