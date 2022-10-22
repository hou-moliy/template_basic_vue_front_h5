import axios from "axios";
import { Notify } from "vant";
import Vue from "vue";
import router from "../router";
const { CancelToken } = axios;
const TimeOut = 600000;
const service = axios.create({
  // 设置超时时间
  timeout: TimeOut,
});

service.defaults.baseURL = "";
service.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
/**
 * 请求前拦截
 * 用于处理需要在请求前的操作
 */
const loading = null;
service.interceptors.request.use((config) => {
  const token = localStorage.getItem("Authorization");
  const configVal = config;
  // 强行中断请求要用到的，记录请求信息
  configVal.cancelToken = new CancelToken((cancel) => {
    Vue.$httpRequestList.push(cancel); // 存储cancle
  });
  if (token) {
    configVal.headers.Authorization = token;
  }
  return configVal;
}, error => Promise.reject(error));
/**
 * 请求响应拦截
 * 用于处理需要在请求返回后的操作
 */
service.interceptors.response.use((response) => {
  const responseCode = response.status;
  // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
  // 否则的话抛出错误
  if (responseCode === 200) {
    return Promise.resolve(response.data);
  }
  return Promise.reject(response);
}, (error) => {
  // 请求响应后关闭加载框
  if (loading) {
    loading.close();
  }
  // 断网 或者 请求超时 状态
  if (!error.response) {
    if (error.message === "interrupt") {
      console.log("请求中断");
    } else if (error.message.includes("timeout")) { // 请求超时状态
      Notify({ type: "danger", message: "请求超时，请检查网络是否连接正常" });
    } else {
      // 可以展示断网组件
      // Notify({ type: 'danger', message: '请求失败，请检查网络是否已连接' });
    }
    return null;
  }
  // 服务器返回不是 2 开头的情况，会进入这个回调
  // 可以根据后端返回的状态码进行不同的操作
  const responseCode = error.response.status;

  switch (responseCode) {
    // 401：未登录,登录失效
    case 401:
      Notify({ type: "warning", message: "登录信息过期，请重新登录" });
      localStorage.removeItem("Authorization");
      // 跳转登录页
      router.replace({
        path: "/login",
      });
      break;
    case 403:
      break;
    // 404请求不存在
    case 404:
      Notify({ type: "danger", message: "网络请求不存在" });
      break;
    // 其他错误，直接抛出错误提示
    default:
      Notify({ type: "danger", message: "网络出了状况~请稍后再试哦！" });
  }
  return Promise.reject(error);
});

export default service;
