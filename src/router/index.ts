import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHashHistory } from "vue-router";

import single from "./single";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Root",
    redirect: "/comp-preview",
    meta: { hidden: true },
  },
  ...single,
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
