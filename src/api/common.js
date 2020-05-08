import request from '@/utils/request'

//获取主题
export function getTopic(){
  return request({
    url:'/getTopic',
    method:'GET'
  })
}