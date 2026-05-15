import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import axios from "axios";

import { cancelRequest, getRequestBody, isNeedCancel } from "./cancel";
import { errorHandler } from "./error";

// 正在请求中的接口
const requestArr: any[] = [];

// 处理业务状态码的公共方法
const handleBusinessResponse = async (data: any) => {
  // 处理非正常响应
  if (data.code !== 20000) {
    errorHandler(data.code, data.msg || data.message || "服务器异常");
    return await Promise.reject(data);
  }
  return await Promise.resolve(data);
};

// 重复请求处理
export const repeatedRequestConfig = (config: InternalAxiosRequestConfig) => {
  // 判断是否需要携带token
  const hasToken = localStorage.getItem("token");
  if (hasToken) {
    config.headers.Authorization = `Bearer ${hasToken}`;
  }
  // 是否需要取消请求
  const needCancel = isNeedCancel(config.url ?? "");
  if (needCancel && !config.cancelToken && !config.signal) {
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
};

// 请求失败处理
export const requestError = async (error: any) => {
  return await Promise.reject(error);
};

// 响应成功处理
export const responseSuccess = async (response: AxiosResponse) => {
  const res = response.data;
  const contentType = String(response.headers["content-type"]) || "";
  const contentDisposition = String(response.headers["content-disposition"]) || "";

  // 处理非正常响应
  if (response.status !== 200) {
    return await Promise.reject(res);
  }

  // 处理 Blob / ArrayBuffer 响应
  if (res instanceof Blob || res instanceof ArrayBuffer) {
    // 处理文件导出
    if (contentDisposition.includes("filename")) {
      return await Promise.resolve(res);
    }

    // 如果实际上返回的是 json 错误信息，需要先解析
    if (contentType.includes("application/json")) {
      try {
        let jsonData;

        if (res instanceof Blob) {
          jsonData = JSON.parse(await res.text());
        }
        else {
          const text = new TextDecoder("utf-8").decode(res);
          jsonData = JSON.parse(text);
        }

        return await handleBusinessResponse(jsonData);
      }
      catch (error) {
        return await Promise.reject(error);
      }
    }

    return await Promise.resolve(response);
  }

  // 处理普通 JSON 响应
  return await handleBusinessResponse(res);
};

// 响应失败处理
export const responseError = async (error: any) => {
  const { response } = error;
  if (response) {
    const { status } = response;
    errorHandler(status, "");
    return await Promise.reject(response);
  }
  return await Promise.reject(error);
};
