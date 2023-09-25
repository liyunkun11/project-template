import type { AxiosInstance } from "axios";
import axios from "axios";

import { cancelRequest, getRequestBody, isNeedCancel } from "./cancel";
import { errorHandler } from "./error";

const isDev = import.meta.env.MODE === "development";

// 创建axios实例
const instance: AxiosInstance = axios.create({
  baseURL: isDev ? "/proxy" : "",
  timeout: 0,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
  withCredentials: !isDev,
});

// 正在请求中的接口
const requestArr: any[] = [];

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    const hasToken = true;
    if (hasToken) {
      config.headers.token = hasToken;
    }
    // 是否需要取消请求
    const needCancel = isNeedCancel(config.url ?? "");
    if (needCancel) {
      cancelRequest(config, requestArr);
      config.cancelToken = new axios.CancelToken((cancelFn) => {
        const requestBody = getRequestBody(config);
        requestArr.push({
          requestBody,
          cancelFn,
        });
      });
    }
    return config;
  },
  async (error) => {
    return await Promise.reject(error);
  },
);

// 响应拦截器
instance.interceptors.response.use(
  async (response) => {
    const res = response.data;
    if (response.status === 200) {
      // 处理二进制流
      if (res instanceof ArrayBuffer) {
        return await Promise.resolve(response);
      }
      // 处理非正常响应
      if (res.code !== 20000) {
        errorHandler(res.code, res.message || "服务器异常");
        return await Promise.reject(res);
      }
      return await Promise.resolve(res);
    } else {
      return await Promise.reject(res);
    }
  },
  async (error) => {
    const { response } = error;
    if (response) {
      const { status, data } = response;
      errorHandler(status, data.message || "服务器异常");
      return await Promise.reject(response);
    }
    return await Promise.reject(error);
  },
);

export default instance;
