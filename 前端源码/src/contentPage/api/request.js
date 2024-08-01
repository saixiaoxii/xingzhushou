/**
 *  骆 网络请求工具
 */

import axios from "axios";
import { ElMessage } from "element-plus"
import useUserStore from '../store/modules/user'

// 创建axios实例
const request = axios.create({
  baseURL: 'http://115.159.34.165:7070',
  timeout: 10000
})
// 请求拦截器
request.interceptors.request.use((config) => {
  const userStore = useUserStore()
  if (userStore.token) {
    config.headers.token = userStore.token
    // config.headers.token = 'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEyMzQ1NiIsImV4cCI6MTcxMjc3NzUyMH0.hsfD93J3ukvPrE9mLE-TbKG9MYE30Pw3noHvq9P5nX0'
    config.headers.Authorization = `${userStore.token}`;
    // config.headers.Authorization = `eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEyMzQ1NiIsImV4cCI6MTcxMjc3NzUyMH0.hsfD93J3ukvPrE9mLE-TbKG9MYE30Pw3noHvq9P5nX0`;

  }
  //config配置对象,headers属性请求头,经常给服务器端携带公共参数
  //返回配置对象
  return config
}, (error) => {
  //失败执行promise
  return Promise.reject(error)
})

//响应拦截器
request.interceptors.response.use((response) => {
  if (response.data instanceof Blob) return response.data //返回Blob对象
  const { data, message, code } = response.data
  // const { status, data } = response
  if (code === 200 || 201) {
    // ElMessage({ type: 'success', message })
    return data
    // return response
  } else {
    // ElMessage({ type: 'error', message })
    // return Promise.reject(new Error(message))
    // return Promise.reject(new Error('出错了'))
  }
}, (error) => {
  //失败回调:处理http网络错误的
  //定义一个变量:存储网络错误信息
  let message = ''
  //http状态码
  const status = error.response.status
  switch (status) {
    case 401:
      message = 'TOKEN过期'
      break
    case 403:
      message = '无权访问'
      break
    case 404:
      message = '请求地址错误'
      break
    case 500:
      message = '服务器出现问题'
      break
    default:
      message = '网络出现问题'
      break
  }  
  //提示错误信息
  ElMessage({
    type: 'error',
    message,
  })
  return Promise.reject(error)
})

export default request