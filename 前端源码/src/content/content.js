console.log('this is content file --')

let BODYs = document.querySelectorAll('body')
let BODY = BODYs[0]
const init = () => {
  const addIframe = (id, pagePath) => {

    const contentIframe = document.createElement("iframe");
    contentIframe.id = id;
    contentIframe.style.cssText = "width: 23%; height: 100%; position: fixed; left:0; inset: 0; border: none; z-index: 1000";
    const getContentPage = chrome.runtime.getURL(pagePath);
    console.log(pagePath)
    console.log(getContentPage)
    contentIframe.src = getContentPage;
    contentIframe.setAttribute('allow', 'microphone');
    // console.log(getContentPage)
    BODY.style.width = '77%'
    BODY.style.float = 'right'
    BODY.append(contentIframe)
  }
  addIframe('content-start-iframe', 'contentPage/index.html')
}

// 判断 window.top 和 self 是否相等，如果不相等，则不注入 iframe,避免注入到当前网页的iframe元素中
if (window.top === window.self) {
  chrome.storage.local.get('isShow', (data) => {
    console.log(data)
    if (data.isShow === true) {
      init()
      console.log(55)
    }
  })


  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (window.top === window.self) {
      if (message.type === 'insert' && document.getElementById('content-start-iframe')) {
        init()
        console.log(56)
      }
      if (message.type === 'open') {
        const iframe = document.querySelector('#content-start-iframe');
        if (iframe && iframe instanceof HTMLIFrameElement) {
          console.log(iframe)
          iframe.style.display = 'block'
          BODY.style.width = '77%'
          BODY.style.float = 'right'
        }
        else {
          init()
          console.log(57)
        }
      }
  
      if (message.type === 'close') {
        if (document.querySelector('#content-start-iframe')) {
          console.log(5)
          document.querySelector('#content-start-iframe').style.display = 'none'
          BODY.style.width = '100%'
        }
      }
      if (message.type === 'stay-open') {
        init()
        console.log('stay')
      }
    }
  })

  const links = document.querySelectorAll('a');

  links.forEach(link => {
    link.addEventListener('click', (event) => {
      if (origin.startsWith('https://fanya.chaoxing.com') || origin.startsWith('http://fanya.chaoxing.com')) {
        // 如果当前网页的协议和域名匹配指定的网址，则执行操作
        const match = link.href.match(/courseweb\/(.*?)\.html/);
        // 如果匹配成功，则提取中间部分（即第一个捕获组）
        const courseId = match ? match[1] : '';
        if (courseId) {
          chrome.runtime.sendMessage({ type: 'clickClass', data: courseId });
        }
      }
    })
  })
}

