// 封装网络请求的方法
export async function sendRequest(url, options) {
  try {
      // 检查是否传递了 options 对象，如果没有，则初始化为空对象
      options = options || {};
      
      // 将用户 token 添加到请求头中
      options.headers = options.headers || {};
      // options.headers['token'] = getToken(); // 假设 getToken() 是获取用户 token 的函数
      const userToken = await new Promise((resolve, reject) => {
        chrome.storage.local.get('usertoken', (result) => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve(result.usertoken);
          }
        });
      })
    
      options.headers['token'] = userToken

      // 发送网络请求
      const response = await fetch(url, options);
      
      // 检查响应状态码
      if (!response.ok) {
        throw new Error(`Network response was not ok, status: ${response.status}`);
      }
      
      // 返回响应数据
      return await response.json()
      // return await response.text();
  } catch (error) {
      console.error('Error sending request:', error);
      throw error;
  }
}

// export function getToken() {
//   // return chrome.storage.local.get('userToken', (result) => {
//   //   console.log(result.userToken)
//   // })

//   chrome.storage.local.get('usertoken', (result) => {
//     console.log('获取到的 token:', result.usertoken);
//   })
//   // 异步写法
//   // chrome.storage.local.get(["usertoken"]).then((result) => { console.log("Value is " + result.usertoken); })
//   return new Promise((resolve, reject) => {
//     chrome.storage.local.get('userToken', (result) => {
//       if (chrome.runtime.lastError) {
//         reject(chrome.runtime.lastError);
//       } else {
//         resolve(result.userToken);
//       }
//     })
//   })
// }