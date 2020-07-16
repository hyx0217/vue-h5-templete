import { getToken } from "@/utils/auth";
import axios from "axios";
import { Toast } from "vant";

axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: process.env.VUE_APP_BASE_API,
  // 超时
  timeout: 10000
});
// request拦截器
service.interceptors.request.use(
  config => {
    /* 传入loading参数，可以显示loading框，解决重复点击问题 */
    if(config.loading){
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
    }
    if (getToken()) {
      config.headers["token"] = `${getToken()}`; // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config;
  },
  error => {
    console.log(error);
    Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  res => {
    const code = res.data.code;
    //登录过期
    if (code === 401) {
      Toast("登录状态已过期，您可以继续留在该页面，或者重新登录");
    } else if (code !== 1) {
      Toast(`${res.data.msg}`);
      return Promise.reject("error");
    } else {
      Toast.clear();
      return Promise.resolve(res.data);
    }
  },
  error => {
    console.log("err" + error);
    Toast.clear();
    return Promise.reject(error);
  }
);

export default service;
