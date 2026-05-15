import type { RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/page",
    component: Layout,
    redirect: "/page/page1",
    meta: { title: "嵌套页面", icon: "simple/nest-outlined" },
    children: [
      {
        path: "/page/page1",
        name: "PagePage1",
        meta: { title: "page1" },
        redirect: "/page/page1/page1-1",
      },
      {
        path: "/page/page1/page1-1",
        name: "PagePage1Page1",
        meta: { title: "page1-1" },
        component: async () => await import("@/views/page1-1/index.vue"),
      },
      {
        path: "/page/page2",
        name: "PagePage2",
        meta: { title: "page2" },
        component: async () => await import("@/views/page2/index.vue"),
      },
      {
        path: "/page/page3",
        name: "PagePage3",
        meta: { title: "page3", hidden: true },
        component: async () => await import("@/views/page2/index.vue"),
      },
    ],
  },
];

export default routes;
