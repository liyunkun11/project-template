import router from "./router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
NProgress.configure({ showSpinner: false });

router.beforeEach((to) => {
  // 开启进度条
  NProgress.start();

  // 替换标题
  if (to.meta.title) {
    document.title = `${String(to.meta.title)} - Template`;
  } else {
    document.title = "Template";
  }

  return true;
});

router.afterEach(() => {
  // 关闭进度条
  NProgress.done();
});
