import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import LandingPage from './components/LandingPage.vue'
import LoginPage from './components/LoginPage.vue'

const routes = [
  { path: '/', component: LandingPage },
  { path: '/login/government', name: 'government-login', component: LoginPage, props: { userType: 'government' } },
  { path: '/login/enterprise', name: 'enterprise-login', component: LoginPage, props: { userType: 'enterprise' } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const pinia = createPinia()

createApp(App)
  .use(pinia)
  .use(router)
  .mount('#app')
