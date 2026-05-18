import type { RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "/icon-preview",
        name: "IconPreview",
        component: async () => await import("@/views/icon-preview/index.vue"),
        meta: { title: "图标预览" },
      },
    ],
  },
];

export default routes;
