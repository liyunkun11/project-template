import { generate } from "@ant-design/colors";
import { theme } from "ant-design-vue";
import Color from "color";
import { defineStore } from "pinia";
import { removeCssVar, setCssVar } from "@/utils/cssvar";
import { STOREAGE_PREFIX } from "./index";

export interface ThemeStore {
  themeMode: "light" | "dark" // 主题模式
  primaryColor: string // 主题色
  successColor: string // 成功色
  warningColor: string // 警告色
  infoColor: string // 信息色
  errorColor: string // 危险色
}

export type ColorType = "primary" | "success" | "warning" | "info" | "error";

export const CSS_KEY_PREFIX = "--app";

export const STORE_KEY = `${STOREAGE_PREFIX}_THEME`;

export const DEFAULT_COLORS: Record<ColorType, string> = {
  primary: "#0f7deb",
  success: "#00b42a",
  warning: "#E6A23C",
  info: "#73767a",
  error: "#f53f3f",
};

export const useThemeStore = defineStore("theme", {
  state: (): ThemeStore => {
    return {
      themeMode: "light",
      primaryColor: DEFAULT_COLORS.primary,
      successColor: DEFAULT_COLORS.success,
      warningColor: DEFAULT_COLORS.warning,
      infoColor: DEFAULT_COLORS.info,
      errorColor: DEFAULT_COLORS.error,
    };
  },
  getters: {
    antdvTheme(state) {
      const algorithm = state.themeMode === "dark" ? theme.darkAlgorithm : undefined;
      return {
        token: {
          colorPrimary: state.primaryColor,
          colorSuccess: state.successColor,
          colorWarning: state.warningColor,
          colorInfo: state.infoColor,
          colorError: state.errorColor,
        },
        algorithm,
      };
    },
  },
  actions: {
    // 设置主题模式
    setThemeMode(mode: "light" | "dark") {
      this.themeMode = mode;
      document.documentElement.setAttribute("theme-mode", mode);
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(mode);
      this.applyThemeColors();
    },
    // 设置主题颜色
    setThemeColor(type: ColorType, color: string) {
      const cssKey = `${CSS_KEY_PREFIX}-color-${type}`;
      const theme = this.themeMode === "light" ? "default" : "dark";
      const colors = generate(color, { theme });
      const colorsMap: Record<number, string> = {
        1: colors[0], // 浅色背景色
        2: colors[1], // 浅色背景悬浮色
        3: colors[2], // 描边色
        4: colors[3], // 描边色悬浮色
        5: colors[4], // 悬浮色
        6: colors[5], // 主色
        7: colors[6], // 激活色
      };
      // 暗色系下 悬浮态和激活态要互换
      if (theme === "dark") {
        colorsMap[5] = colors[6];
        colorsMap[7] = colors[4];
      }
      for (let index = 1; index <= 7; index++) {
        setCssVar(`${cssKey}-${index}`, colorsMap[index]);
      }
      // 设置rgb三原色
      const rgbColor = Color(colorsMap[6]).rgb().array().join(",");
      setCssVar(`${cssKey}-rgb`, rgbColor);
      // 设置缓存
      this[`${type}Color`] = color;
    },
    // 恢复主题颜色
    restoreThemeColor(type: ColorType) {
      // 删除store里面的值
      this[`${type}Color`] = "";
      // 移除cssVar变量
      const cssVarArr = [1, 2, 3, 4, 5, 6, 7, "rgb"];
      cssVarArr.forEach((item) => {
        const key = `${CSS_KEY_PREFIX}-color-${type}-${item}`;
        removeCssVar(key);
      });
      // 恢复默认颜色
      this.setThemeColor(type, DEFAULT_COLORS[type]);
    },
    // 应用主题颜色
    applyThemeColors() {
      // 设置主题颜色
      const colors: Array<{ type: ColorType, color: string }> = [
        { type: "primary", color: this.primaryColor },
        { type: "success", color: this.successColor },
        { type: "warning", color: this.warningColor },
        { type: "info", color: this.infoColor },
        { type: "error", color: this.errorColor },
      ];
      colors.forEach((color) => {
        if (color.color) {
          this.setThemeColor(color.type, color.color);
        }
      });
    },
    // 清空主题缓存
    clearThemeCache() {
      localStorage.removeItem(STORE_KEY);
      this.applyThemeColors();
    },

  },
  persist: [
    {
      key: STORE_KEY,
      storage: window.localStorage,
    },
  ],
});
