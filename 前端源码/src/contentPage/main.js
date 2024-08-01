import { createApp } from 'vue'
import App from '@/contentPage/App.vue'
import '@/contentPage/styles/index.scss'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//svg插件需要配置代码
import 'virtual:svg-icons-register'
//引入自定义插件对象:注册整个项目全局组件
import globalComponent from '@/contentPage/components'
// 默认支持语言英语设置为中文
//@ts-expect-error
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import router from './router'
import pinia from './store'

const app = createApp(App)

app.use(ElementPlus, {
  locale: zhCn // element-plus国际化配置
})
app.use(globalComponent)
app.use(pinia)
app.use(router)

app.mount('#app')
