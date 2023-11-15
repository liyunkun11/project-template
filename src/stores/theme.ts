import { defineStore } from "pinia";

interface ThemeStore {
  // 主题模式
  themeMode: "dark" | "light";
}

export const useThemeStore = defineStore({
  id: "theme",
  state: (): ThemeStore => {
    return {
      themeMode: "dark",
    };
  },
  getters: {
    isDark: (state) => {
      return state.themeMode === "dark";
    },
  },
  persist: [
    {
      key: "project_template_theme",
      paths: ["themeMode"],
      storage: localStorage,
    },
  ],
});
