import type { RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/dashboard",
    component: Layout,
    redirect: "/dashboard/index",
    children: [
      {
        path: "/dashboard/index",
        name: "Dashboard",
        meta: { title: "首页", icon: "simple/home-filled" },
        component: async () => await import("@/views/dashboard/index.vue"),
      },
    ],
  },
];

export default routes;
