<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <div class="login-brand">
            <img src="/logo.svg" alt="平台Logo" class="logo" />
            <h1 class="login-title">地理信息安全监测平台</h1>
          </div>
          <p class="login-subtitle">
            {{ userType === 'government' ? '政府端登录' : '企业端登录' }}
          </p>
        </div>

        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="username" class="form-label">
              {{ userType === 'government' ? '用户名' : '企业ID' }}
            </label>
            <input
              id="username"
              v-model="loginForm.username"
              type="text"
              class="form-input"
              :placeholder="userType === 'government' ? '请输入用户名' : '请输入企业唯一标识'"
              required
            />
          </div>

          <div class="form-group">
            <label for="password" class="form-label">密码</label>
            <input
              id="password"
              v-model="loginForm.password"
              type="password"
              class="form-input"
              placeholder="请输入密码"
              required
            />
          </div>

          <div class="form-group" v-if="userType === 'government'">
            <label for="captcha" class="form-label">验证码</label>
            <div class="captcha-group">
              <input
                id="captcha"
                v-model="loginForm.captcha"
                type="text"
                class="form-input"
                placeholder="请输入验证码"
                required
              />
              <div class="captcha-image" @click="refreshCaptcha">
                <span class="captcha-text">{{ captchaText }}</span>
              </div>
            </div>
          </div>

          <div class="form-options">
            <label class="checkbox-label">
              <input
                type="checkbox"
                v-model="loginForm.rememberMe"
                class="form-checkbox"
              />
              <span class="checkbox-text">记住登录状态</span>
            </label>
            <button type="button" class="link-button">
              忘记密码？
            </button>
          </div>

          <button
            type="submit"
            class="login-button"
            :disabled="isLoading"
          >
            {{ isLoading ? '登录中...' : '登录' }}
          </button>
        </form>

        <div class="login-footer">
          <p class="footer-text">
            {{ userType === 'government' ? '企业用户？' : '政府用户？' }}
            <button
              type="button"
              class="link-button"
              @click="switchUserType"
            >
              {{ userType === 'government' ? '企业端登录' : '政府端登录' }}
            </button>
          </p>

          <div class="footer-links">
            <button type="button" class="link-button" @click="$router.push('/')">
              返回首页
            </button>
            <span class="separator">|</span>
            <button type="button" class="link-button">
              帮助文档
            </button>
            <span class="separator">|</span>
            <button type="button" class="link-button">
              联系支持
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 背景装饰 -->
    <div class="background-decoration">
      <div class="decoration-circle circle-1"></div>
      <div class="decoration-circle circle-2"></div>
      <div class="decoration-circle circle-3"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

interface Props {
  userType: 'government' | 'enterprise'
}

const props = defineProps<Props>()
const router = useRouter()

const loginForm = ref({
  username: '',
  password: '',
  captcha: '',
  rememberMe: false
})

const isLoading = ref(false)
const captchaText = ref('ABCD')

const refreshCaptcha = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < 4; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  captchaText.value = result
}

const switchUserType = () => {
  const newType = props.userType === 'government' ? 'enterprise' : 'government'
  router.push(`/login/${newType}`)
}

const handleLogin = async () => {
  isLoading.value = true
  
  try {
    // 模拟登录请求
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // 这里应该调用实际的登录API
    console.log('登录信息:', {
      userType: props.userType,
      ...loginForm.value
    })
    
    // 登录成功后的处理
    alert(`${props.userType === 'government' ? '政府端' : '企业端'}登录成功！`)
    
  } catch (error) {
    console.error('登录失败:', error)
    alert('登录失败，请检查用户名和密码')
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  refreshCaptcha()
})
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--accent-2) 0%, var(--accent-3) 50%, var(--gray-2) 100%);
  position: relative;
  overflow: hidden;
}

.login-container {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  position: relative;
  z-index: 10;
}

.login-card {
  padding: 3rem;
  background: var(--color-background);
  border: 1px solid var(--gray-6);
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-brand {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.logo {
  width: 60px;
  height: 60px;
}

.login-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--primary-color);
  margin: 0;
}

.login-subtitle {
  color: var(--gray-11);
  margin: 0;
  font-size: 1rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  color: var(--gray-12);
  font-weight: 500;
  font-size: 0.875rem;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--gray-6);
  border-radius: 8px;
  background: var(--color-background);
  color: var(--gray-12);
  font-size: 1rem;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(64, 158, 255, 0.1);
}

.form-input:disabled {
  background: var(--gray-3);
  color: var(--gray-8);
  cursor: not-allowed;
}

.captcha-group {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.captcha-image {
  min-width: 80px;
  height: 40px;
  background: var(--gray-3);
  border: 1px solid var(--gray-6);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  font-family: monospace;
  font-weight: bold;
  color: var(--accent-11);
  transition: all 0.2s ease;
}

.captcha-image:hover {
  background: var(--gray-4);
  border-color: var(--accent-7);
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.form-checkbox {
  width: 16px;
  height: 16px;
  accent-color: var(--primary-color);
  cursor: pointer;
}

.checkbox-text {
  font-size: 0.875rem;
  color: var(--gray-11);
}

.link-button {
  background: none;
  border: none;
  color: var(--primary-color);
  cursor: pointer;
  font-size: 0.875rem;
  text-decoration: none;
  transition: color 0.2s ease;
}

.link-button:hover {
  color: var(--primary-hover);
  text-decoration: underline;
}

.login-button {
  width: 100%;
  margin-top: 1rem;
  padding: 0.75rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.login-button:hover:not(:disabled) {
  background: var(--primary-hover);
  transform: translateY(-1px);
}

.login-button:disabled {
  background: var(--gray-6);
  color: var(--gray-8);
  cursor: not-allowed;
  transform: none;
}

.login-footer {
  margin-top: 2rem;
  text-align: center;
}

.footer-text {
  margin: 0 0 1rem 0;
  color: var(--gray-10);
  font-size: 0.875rem;
}

.footer-links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: var(--gray-9);
}

.separator {
  color: var(--gray-7);
  font-size: 0.75rem;
}

/* 背景装饰 */
.background-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
}

.decoration-circle {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent-4), var(--accent-6));
  opacity: 0.1;
  animation: float 6s ease-in-out infinite;
}

.circle-1 {
  width: 200px;
  height: 200px;
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.circle-2 {
  width: 150px;
  height: 150px;
  top: 60%;
  right: 10%;
  animation-delay: 2s;
}

.circle-3 {
  width: 100px;
  height: 100px;
  bottom: 20%;
  left: 20%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}

/* 响应式设计 */
@media (max-width: 480px) {
  .login-container {
    padding: 1rem;
  }
  
  .login-card {
    padding: 2rem;
  }
  
  .captcha-group {
    flex-direction: column;
    align-items: stretch;
  }
  
  .captcha-image {
    min-width: auto;
  }
  
  .form-options {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .footer-links {
    flex-direction: column;
    gap: 0.25rem;
  }
}
</style>
