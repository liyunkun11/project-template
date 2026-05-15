import type { RouteRecordRaw } from "vue-router";
import { defineStore } from "pinia";
import { STOREAGE_PREFIX } from "./index";

export interface PermissionStore {
  token: string // 登录凭证
  menuRoutes: RouteRecordRaw[] // 菜单路由
  routeMap: Record<string, RouteRecordRaw> // 路由Map
  openBtnValidator: boolean // 是否打开按钮校验
  btnList: string[] // 按钮权限列表
}

export const STORE_KEY = `${STOREAGE_PREFIX}_PERMISSION`;

export const usePermissionStore = defineStore("permission", {
  state: (): PermissionStore => {
    return {
      token: "",
      menuRoutes: [],
      routeMap: {},
      openBtnValidator: false,
      btnList: [],
    };
  },
  actions: {
    logout() {
      this.token = "";
      this.menuRoutes = [];
      this.routeMap = {};
      this.openBtnValidator = false;
      this.btnList = [];
    },
  },
  persist: [
    {
      key: STORE_KEY,
      pick: ["token"],
      storage: window.localStorage,
    },
  ],
});
