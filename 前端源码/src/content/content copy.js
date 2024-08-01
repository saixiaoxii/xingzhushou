// import { createApp } from 'vue'
// import app from './components/app.vue'

// joinContent(app)

// function joinContent (element) {
// 	const div = document.createElement('div')
// 	div.id = 'joinContentApp'
// 	document.body.appendChild(div)
// 	console.log(div)
// 	createApp(element).mount('#joinContentApp')
// }

// const body = document.body.firstChild
// console.log(body)
// body.style.width = 80%

console.log('this is content file --')

const init = () => {
  const addIframe = (id, pagePath) => {
    // var container = document.createElement('div');
    // container.style.width = '30%';
    // container.style.height = '100%';
    // container.style.position = 'absolute';
    // container.style.top = '0';
    // container.style.left = '0';
    // container.style.overflow = 'hidden'; // 隐藏容器的溢出内容，避免出现滚动条

    const contentIframe = document.createElement("iframe");
    contentIframe.id = id;
    contentIframe.style.cssText = "width: 20%; height: 100%; position: fixed; left:0; inset: 0; border: none;";
    // contentIframe.style.cssText = "width: 100%; height: 100%; border: none;";
    const getContentPage = chrome.runtime.getURL(pagePath);
    contentIframe.src = getContentPage;
    console.log(getContentPage)
    document.body.append(contentIframe)
    // container.appendChild(contentIframe);

    const ewRow = document.createElement('div')
    ewRow.id = 'ewRow'
    ewRow.style.cssText = 'height: 100%; width: 2px; position: fixed; right: 600; cursor: ew-resize; background-color: rgb(36, 196, 68);'
    // contentIframe.append(ewRow)
    // contentIframe.contentDocument.getElementsByID('app').appendChild(ewRow);
    document.body.append(ewRow)
  }

  // const change = () => {
  //   const app = document.body.querySelector('div')
  //   console.log(app)
  //   app.style.width = '70%'
  // }
  // const video = document.querySelector('video')
  // console.log(video)
  const allElements = document.querySelectorAll('*');
  let videoElement;

  allElements.forEach(element => {
      if (element.tagName.toLowerCase() === 'video') {
          videoElement = element;
          // 如果你只想要第一个视频元素，你可以立即退出循环
          return;
      }
    });
  if (videoElement) {
      // 找到了视频元素
      console.log('Found video element:', videoElement);
  } else {
      // 没有找到视频元素
      console.log('No video element found.');
  }
    addIframe('content-start-iframe', 'contentPage/index.html')
  }

// 判断 window.top 和 self 是否相等，如果不相等，则不注入 iframe
if (window.top === window.self) {
  init();
}

// 宽高调整
const pluginContainer = document.getElementById('content-start-iframe');
const ewRow = document.getElementById('ewRow')
let isResizing = false;
let startX, startY, startWidth, startHeight;
ewRow.addEventListener('mousedown', (event) => {
  isResizing = true;
  startX = event.clientX;
  startY = event.clientY;
  startWidth = parseInt(document.defaultView.getComputedStyle(pluginContainer).width, 10);
  startHeight = parseInt(document.defaultView.getComputedStyle(pluginContainer).height, 10);
});
// 监听鼠标移动事件
ewRow.addEventListener('mousemove', function(event) {
  // 获取鼠标相对于插件页面左边界的距离
  // const mouseX = event.clientX - pluginContainer.getBoundingClientRect().left;
  
  // // 如果鼠标在插件页面左边界附近，动态调整插件宽度
  // if (mouseX < 10) { // 假设鼠标在插件页面左边界附近 10px 内触发调整宽度
  //     // 调整插件宽度为鼠标位置的两倍
  //     pluginContainer.style.width = (mouseX * 2) + 'px';
      
  //     // 调整当前 web 页面宽度，使其响应式适应剩余 window 空间
  //     const remainingWidth = window.innerWidth - mouseX * 2;
  //     document.documentElement.style.width = remainingWidth + 'px';
  // }

  if (!isResizing) return;
    const newWidth = startWidth + event.clientX - startX;
    const newHeight = startHeight + event.clientY - startY;
    pluginContainer.style.width = newWidth + 'px';
    pluginContainer.style.height = newHeight + 'px';
});
ewRow.addEventListener('mouseup', () => {
  isResizing = false;
});