import { notification } from "ant-design-vue";
import routeRes from "@/routeRes.json";
import router, { asyncRoutes } from "@/routers";
import { usePermissionStore } from "@/stores/permission";

// 处理用户权限资源 把Tree结构转为扁平得Map结构
const treeToFlatMap = (routes: any[]) => {
  const routeMap: Record<string, any> = {};
  function handler(arr: any[]) {
    arr.forEach((item: any) => {
      routeMap[item.path] = { ...item };
      if (item.children && item.children.length > 0) {
        handler(item.children);
      }
    });
  }
  handler(routes);
  return routeMap;
};

// 获取权限菜单的首页
const getFirstPage = async (path?: string) => {
  const permissionStore = usePermissionStore();
  // 判断有没有添加过路由 没有就添加下
  if (permissionStore.menuRoutes.length === 0) {
    await getPermissionRes();
  }
  // 如果获取之后还为空那么就回到登录页面
  if (permissionStore.menuRoutes.length === 0) {
    permissionStore.$reset();
    return "/login";
  }
  // 判断有没有访问权限有就跳转 没有就默认第一个
  const routeMap = permissionStore.routeMap;
  if (path && routeMap[path]) {
    return path;
  }
  else {
    const firstRoute = permissionStore.menuRoutes[0];
    if (firstRoute.children) {
      const firstChild = firstRoute.children[0];
      return firstChild.path;
    }
    else {
      return firstRoute.path;
    }
  }
};

// 转换用户权限资源 根据originMap把伪路由转为真实路由 1路由 2按钮 3接口
const transformAsyncRoutes = (routes: any[], finallyRoutes: any[], originMap: any, parentRoute: any, pid = 0) => {
  routes.forEach((route: any) => {
    const path = route.path;
    const title = route.title;
    const type = route.type;
    // 处理路由
    if (originMap[path]) {
      const item = { ...originMap[path] };
      // 处理meta信息
      if (item.meta) {
        item.meta.btnList = [];
        if (title) {
          item.meta.title = title;
        }
      }
      finallyRoutes.push(item);
      if (!route.children || route.children.length === 0) {
        return;
      }
      if (pid === 0) {
        item.children = [];
        transformAsyncRoutes(route.children, item.children, originMap, item, item.id ?? -1);
      }
      else {
        transformAsyncRoutes(route.children, finallyRoutes, originMap, item, item.id ?? -1);
      }
    }
    // 处理按钮权限
    else if (type === 2) {
      parentRoute.meta.btnList.push(path);
    }
    // 未知类型
    else {
      console.warn(`权限解析失败: 名称[${title}]——路径[${path}]`);
    }
  });

  return finallyRoutes;
};

// 生成左侧菜单树
const generateMenuTree = (routes: any[], finallyRoutes: any[], routeMap: any) => {
  routes.forEach((route: any) => {
    const path = route.path;
    const title = route.title;
    if (routeMap[path]) {
      const item = { ...routeMap[path] };
      if (item.meta && title) {
        item.meta.title = title;
      }
      delete item.component;
      item.children = [];
      if (!item.meta?.hidden) {
        finallyRoutes.push(item);
      }
      if (!route.children || route.children.length === 0) {
        return;
      }
      generateMenuTree(route.children, item.children, routeMap);
    }
  });
  return finallyRoutes;
};

// 获取用户权限资源
const getPermissionRes = async () => {
  const permissionStore = usePermissionStore();
  // 从后端获取权限资源
  const res = await Promise.resolve(routeRes);
  if (res.data?.length === 0) {
    // 没有获取到资源退出login
    permissionStore.$reset();
    router.replace("/login");
    notification.destroy();
    notification.warning({ message: "提示", description: "没有分配菜单权限" });
    return [];
  }
  // 生成原始路由Map 也就是所有的本地路由路径Map
  const originMap = treeToFlatMap(asyncRoutes);
  // 根据原始路由Map把后台返回的伪路由转化成真实路由
  const realRoutes: any[] = transformAsyncRoutes(res.data, [], originMap, null);
  // 动态添加权限路由
  for (const route of realRoutes) {
    router.addRoute(route);
  }
  // 再重新生成一份有权限访问的路由Map
  permissionStore.routeMap = {};
  const routeMap = treeToFlatMap(realRoutes);
  // 生成左侧菜单树
  const menuRoutes = generateMenuTree(res.data, [], routeMap);
  // 更新存储仓库
  permissionStore.$patch({
    menuRoutes,
    routeMap,
  });
  return menuRoutes;
};

// 判断是否有权限
const hasPermission = (id: string): boolean => {
  const permissionStore = usePermissionStore();
  const openBtnValidator = permissionStore.openBtnValidator;
  const btnList = permissionStore.btnList;
  if (!openBtnValidator) {
    return true;
  }
  else if (btnList.includes(id)) {
    return true;
  }
  return false;
};

export { getFirstPage, getPermissionRes, hasPermission };
