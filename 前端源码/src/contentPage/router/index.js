import { createRouter, createWebHashHistory } from "vue-router/dist/vue-router"
import useUserStore from "@/contentPage/store/modules/user"
import pinia from '@/contentPage/store'

const userStore = useUserStore(pinia)
const routes = [
  {
    path: '/',
    redirect: '/chat',
    meta: {
      isHidden: true
    },
    children: [
      {
        path: '/chat',
        component: () => import('@/contentPage/views/chat/index.vue'),
        meta: {
          title: '智能聊天',
          icon: 'chat',
          isHidden: false
        }
      },
      {
        path: '/vidoe',
        component: () => import('@/contentPage/views/video/index.vue'),
        meta: {
          title: '推荐视频',
          icon: 'video',
          isHidden: false
        }
      },
      {
        path: '/practice',
        component: () => import('@/contentPage/views/practice/index.vue'),
        meta: {
          title: '练习题推荐',
          icon: 'practice',
          isHidden: true
        }
      },
    ]
  },
  {
    path: '/login',
    component: ()=>import('@/contentPage/views/login/index.vue')
  }
]
// 创建路由器
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  }
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  if (userStore.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  }
  // 无token
  else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
}) 


export default router