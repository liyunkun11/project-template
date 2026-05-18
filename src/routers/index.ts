import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHashHistory } from "vue-router";

import constRoutes from "./modules/const";
import dashboard from "./modules/dashboard";
import page from "./modules/page";

export { constRoutes };

export const staticRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Root",
    redirect: "/dashboard",
    meta: { hidden: true },
  },
  {
    path: "/login",
    name: "Login",
    component: async () => await import("@/views/login/index.vue"),
    meta: { hidden: true, title: "登录" },
  },
];

export const asyncRoutes: RouteRecordRaw[] = [
  ...dashboard,
  ...page,
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: staticRoutes,
});

export default router;
