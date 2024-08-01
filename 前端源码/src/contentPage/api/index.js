import request from './request'
import request2 from './request2'
import request3 from './request3'

/**
 * 聊天相关
 */

// 获取一次对话的聊天记录
export function getChatHistory(topicId) {
  return request({
    method: 'GET',
    url: `/topic/${topicId}/messages`
  })
}
// 获取用户历史对话列表
export function getChatList() {
  return request({
    method: 'GET',
    url: `/user/themes`,
  })
}

// 存储消息
export function addMessage(data) {
  return request({
    method: 'POST',
    url: `/user/messages`,
    data: data
  })
}

// 新建对话
export function newDialogAPI(data) {
  return request({
    method: 'POST',
    url: `/user/conversation`,
    data: data
  })
}

// 删除对话
export function deleteDialog(id) {
  return request({
    method: 'DELETE',
    url: `/${id}`
  })
}


/**
 * 补前锦相关
 */
/**
 * 课程相关
 */

// 登录
// 用户登录
export function login(data) {
  return request2({
    url: '/login',
    method: 'post',
    data: data
  })
}

// 获取课程列表
export function getCoursesList(data) { 
  let url =''
  if (Array.isArray(data) && data.length > 0) {
    url = `/class/advice?`
    for (let index = 0; index < data.length; index++) {
      // const element = array[index]
      url += `interest=${encodeURIComponent(data[index])}&`
    }
    url = url.slice(0, -1)
  } else {
    url = '/class/advice?interest'
  }
  return request2({
    method: 'GET',
    url: url
  })
}

// 评分
export function scoreCourse(data) {
  return request2({
    method: 'POST',
    url: '/score',
    data
  })
}


/**
 * chat相关
 */

// 获取智能聊天回复
export function getChatReply(data) {
  return request3({
    method: 'POST',
    url: '/api/chat',
    data
  })
}

export function image(data) {
  return request3({
    method: 'POST',
    url: 'api/orc',
    data
  })
}