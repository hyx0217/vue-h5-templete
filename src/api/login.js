import request from "@/utils/request";
//登录
export const login = (data) => request({ url: "/login", method: "post", data,loading:true });

//注册
export const register = (data) => request({ url: "/register", method: "post", data });

//重置密码
export const forget = (data) => request({ url: "/forget", method: "post", data });

//获取列表
export const getList = (data) => request({ url: "/getList", method: "post", data});

//获取列表
export const getUser = () => request({ url: "/getUser", method: "post", });
