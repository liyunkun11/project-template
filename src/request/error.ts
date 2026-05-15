export const errorHandler = (code: number, msg: string) => {
  switch (code) {
    case 401:
      console.error("没有访问权限");
      break;
    case 403:
      console.error("资源不可用");
      break;
    case 404:
      console.error("找不到对应资源");
      break;
    case 500:
    case 502:
      console.error("服务器异常");
      break;
    default:
      console.error(msg);
      break;
  }
};
