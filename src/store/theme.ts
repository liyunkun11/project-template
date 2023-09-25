import { theme } from "ant-design-vue";
import type { ThemeConfig } from "ant-design-vue/es/config-provider/context";
import { defineStore } from "pinia";

interface ThemeStore {
  // 主题色
  colorPrimary: string;
  // 暗黑模式
  isDark: boolean;
}

export const useThemeStore = defineStore({
  id: "theme",
  state: (): ThemeStore => {
    return {
      colorPrimary: "#00b96b",
      isDark: false,
    };
  },
  getters: {
    themeConfig: (state) => {
      const config: ThemeConfig = {
        token: {
          colorPrimary: state.colorPrimary,
        },
        algorithm: state.isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      };
      return config;
    },
  },
  persist: [
    {
      key: "project_template_theme",
      paths: ["colorPrimary", "isDark"],
      storage: localStorage,
    },
  ],
});
