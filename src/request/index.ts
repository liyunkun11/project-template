import type { AxiosInstance } from "axios";
import axios from "axios";

import { repeatedRequestConfig, requestError, responseError, responseSuccess } from "./interceptors";

const isDev = import.meta.env.MODE === "development";

// 创建axios实例
const instance: AxiosInstance = axios.create({
  baseURL: "/api/project-template",
  timeout: 0,
  withCredentials: !isDev,
});

// 请求拦截器
instance.interceptors.request.use(repeatedRequestConfig);
instance.interceptors.request.use(undefined, requestError);

// 响应拦截器
instance.interceptors.response.use(responseSuccess, responseError);

export default instance;
