// 错误处理函数
export const errorHandler = (code: number, msg: string): void => {
  switch (code) {
    case 401:
      // 401
      break;
    case 403:
      // 403
      break;
    case 404:
      // 404
      break;
    default:
      // 默认值
      console.log(msg);
      break;
  }
};
