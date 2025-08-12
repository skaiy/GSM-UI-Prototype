import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import App from './App.vue'

// 导入组件
import LandingPage from './components/LandingPage.vue'
import LoginPage from './components/LoginPage.vue'
import GovernmentDashboard from './components/GovernmentDashboard.vue'
import ContentDetailPage from './components/ContentDetailPage.vue'

// 创建路由
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingPage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/government',
      name: 'government',
      component: GovernmentDashboard
    },
    {
      path: '/content/:type/:id?',
      name: 'content-detail',
      component: ContentDetailPage
    }
  ]
})

// 创建应用
const app = createApp(App)

// 使用插件
app.use(createPinia())
app.use(router)

// 挂载应用
app.mount('#app')
