import request from "@/utils/request";
//登录
export function login(data:any) {
  return request({
    url: "/login",
    method: "post",
    data
  });
}
//注册
export function register(data:any) {
  return request({
    url: "/register",
    method: "post",
    data
  });
}
//重置密码
export function forget(data:any) {
  return request({
    url: "/forget",
    method: "post",
    data
  });
}
//获取列表
export function getList(data:any) {
  return request({
    url: "/getList",
    method: "post",
    data
  });
}
//获取列表
export function getUser() {
  return request({
    url: "/getUser",
    method: "post"
  });
}
