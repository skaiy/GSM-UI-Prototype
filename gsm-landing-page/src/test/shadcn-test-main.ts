// 独立的入口文件，只导入 shadcn-vue 需要的样式
import './shadcn-only.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import ShadcnTestApp from './ShadcnTestApp.vue'
import ShadcnVueTest from './ShadcnVueTest.vue'

const routes = [
  { path: '/', component: ShadcnVueTest }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const pinia = createPinia()

createApp(ShadcnTestApp)
  .use(pinia)
  .use(router)
  .mount('#app')