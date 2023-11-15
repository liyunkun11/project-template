import Layout from "@/layout/index.vue";
export default [
  {
    path: "/icon-preview",
    component: Layout,
    meta: { title: "图标预览" },
    redirect: "/icon-preview/index",
    children: [
      {
        path: "/icon-preview/index",
        name: "IconPreview",
        meta: { title: "图标预览" },
        component: async () => await import("@/views/icon-preview/index.vue"),
      },
    ],
  },
  {
    path: "/comp-preview",
    component: Layout,
    meta: { title: "组件预览" },
    redirect: "/comp-preview/index",
    children: [
      {
        path: "/comp-preview/index",
        name: "CompPreview",
        meta: { title: "组件预览" },
        component: async () => await import("@/views/comp-preview/index.vue"),
      },
    ],
  },
];
