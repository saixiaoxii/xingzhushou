import { sendRequest } from './utils'

console.log('this is background')

// 监听来自内容脚本的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // 检查消息类型
  if (message.type === 'video_progress') {
    // 处理视频进度消息
    let currentTime = message.currentTime;
    console.log('Received video progress:', currentTime)
  }

  // 用户登录
  if (message.type === 'login') {
    // 处理接收到的消息
    let data = message.data;
    console.log('Received message from contentPage:', data)
    // 将token存储在拓展storage中
    chrome.storage.local.set({ usertoken: data }, () => {
      console.log('token存储了')
    })
  }

  // 获取用户点击课程id
  if (message.type === 'clickClass') {
    console.log(message.data)
    
    let requestData = {
      method: 'POST', // 请求类型
      body: JSON.stringify({}) 
    }
    let reqUrl = `http://115.159.34.165:2333/class/${message.data}`
    sendRequest(reqUrl, requestData)
      .then(responseData => {
        // 在这里处理成功的响应数据
        console.log('成功响应:', responseData);
        // 继续执行其他操作
      })
      .catch(error => {
        console.error('请求失败:', error)
      })
  }

})


let isShow = false

chrome.action.onClicked.addListener((tab) => {
  isShow = !isShow
  chrome.storage.local.set({ isShow: isShow })
  if (isShow === true) {
    chrome.tabs.sendMessage(tab.id, { type: 'open' });
  } else if (isShow === false) {
    chrome.tabs.sendMessage(tab.id, { type: 'close' });
  }
});

// if (isShow === true) {
//   chrome.tabs.sendMessage(tab.id, { type: 'stay-open' });
// }

// 监听本地存储的变化
// chrome.storage.onChanged.addListener((changes, namespace) => {
//   for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
//     if (key === 'isShow' && newValue !== oldValue) {
//       // 根据 isShow 的新值执行相应的操作
//       if (newValue === true) {
//         // 执行打开操作
//         chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//           if (tabs.length > 0) {
//             chrome.tabs.sendMessage(tabs[0].id, { type: 'open' });
//           }
//         });
//         console.log('Open');
//       } else {
//         // 执行关闭操作
//         console.log('Close');
//         chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//           if (tabs.length > 0) {
//             chrome.tabs.sendMessage(tabs[0].id, { type: 'close' });
//           }
//         });
//       }
//     }
//   }
// })

// chrome.runtime.onInstalled.addListener(function() {
//   // 在此处执行初始化操作，如请求权限、设置权限等
//   chrome.contentSettings.microphone.get({
//     primaryUrl: 'https://fanya.chaoxing.com/'
//   }, function(details) {
//     console.log('Microphone permission for https://example.com:', details.setting);
//   });
//   chrome.permissions.request({
//     permissions: ['audioCapture'],
//     origins: ['https://fanya.chaoxing.com/']
//   }, function(granted) {
//     if (granted) {
//       console.log('Microphone permission granted');
//     } else {
//       console.log('Microphone permission denied');
//     }
//   });
// });