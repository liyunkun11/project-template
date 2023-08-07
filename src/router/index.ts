import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue";

// 静态路由
export const staticRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Root",
    redirect: "/dashboard",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Layout,
    redirect: "/dashboard/index",
    children: [
      {
        path: "/dashboard/index",
        name: "DashboardIndex",
        meta: {
          title: "首页",
        },
        component: async () => await import("@/views/dashboard/index.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: staticRoutes,
});

export default router;
