import NProgress from "nprogress";
import router, { staticRoutes } from "@/routers";
import { usePermissionStore } from "@/stores/permission";
import { getFirstPage, getPermissionRes } from "./utils/permission";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false });

router.beforeEach(async (to) => {
  const permissionStore = usePermissionStore();

  // 开启进度条
  NProgress.start();

  // 替换标题
  if (to.meta.title) {
    const title = to.meta.title as string;
    document.title = `${title}`;
  }

  // 添加当前页面的按钮权限
  if (to.meta.btnList) {
    permissionStore.btnList = to.meta.btnList as string[];
  }

  // 判断是不是访问的静态页面
  const isStaticRouter = staticRoutes.some(i => i.name === to.name);

  // 判断有没有token
  if (permissionStore.token) {
    // 如果已经登录过了 就直接到首页
    if (to.path === "/login") {
      return await getFirstPage("/dashboard");
    }
    else {
      const hasRoutes = permissionStore.menuRoutes.length > 0;
      if (hasRoutes) {
        return true;
      }
      else {
        // 获取权限路由
        const asyncRoutes = await getPermissionRes();
        // 获取路由Map判断有没有权限 有就跳转 没有就默认第一个
        const routeMap = permissionStore.routeMap;
        if (routeMap[to.path]) {
          return to.fullPath;
        }
        else {
          const firstRoute = asyncRoutes[0].children[0];
          return firstRoute.path;
        }
      }
    }
  }
  else if (isStaticRouter) {
    return true;
  }
  else {
    return `/login?redirect=${to.path}`;
  }
});

router.afterEach(() => {
  NProgress.done();
});
