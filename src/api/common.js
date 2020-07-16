import request from "@/utils/request";

//获取主题
export const getTopic = () => request({ url: "/getTopic", method: "GET" });

//获取主题详情
export const getTopicDetail = (params) => request({ url: "/getTopicDetail", method: "GET", params });
