<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <div class="login-brand">
            <div class="flex items-center space-x-3">
              <div class="relative">
                <div class="w-10 h-10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield w-8 h-8 text-blue-400 drop-shadow-lg filter hover:text-cyan-400 transition-colors duration-300" style="filter: drop-shadow(rgba(59, 130, 246, 0.3) 0px 0px 8px);">
                    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                  </svg>
                </div>
              </div>
              <div>
                <h1 class="text-xl font-bold text-white login-title">地理信息安全监测平台</h1>
                <p class="text-xs text-slate-400 login-subtitle">Geospatial Security Monitoring Platform</p>
              </div>
            </div>
          </div>
          <p class="login-subtitle">
            {{ userType === 'government' ? '政府端登录' : '企业端登录' }}
          </p>
        </div>

        <!-- 登录方式切换 -->
        <div class="login-mode-switch">
          <button 
            type="button" 
            class="mode-btn"
            :class="{ active: loginMode === 'password' }"
            @click="loginMode = 'password'"
          >
            密码登录
          </button>
          <button 
            type="button" 
            class="mode-btn"
            :class="{ active: loginMode === 'sms' }"
            @click="loginMode = 'sms'"
          >
            短信登录
          </button>
        </div>



        <form @submit.prevent="handleLogin" class="login-form">
          <!-- 手机号输入 -->
          <div class="form-group">
            <label for="phone" class="form-label">手机号</label>
            <input
              id="phone"
              v-model="loginForm.phone"
              type="tel"
              class="form-input"
              placeholder="请输入手机号"
              maxlength="11"
              required
            />
          </div>

          <!-- 密码登录模式 -->
          <div v-if="loginMode === 'password'" class="form-group">
            <label for="password" class="form-label">密码</label>
            <div class="password-input-container">
              <input
                id="password"
                v-model="loginForm.password"
                :type="showPassword ? 'text' : 'password'"
                class="form-input"
                placeholder="请输入密码"
                required
              />
              <button
                type="button"
                class="password-toggle"
                @click="showPassword = !showPassword"
              >
                {{ showPassword ? '👁️' : '👁️‍🗨️' }}
              </button>
            </div>
          </div>

          <!-- 短信验证码模式 -->
          <div v-if="loginMode === 'sms'" class="form-group">
            <label for="smsCode" class="form-label">短信验证码</label>
            <div class="sms-input-container">
              <input
                id="smsCode"
                v-model="loginForm.smsCode"
                type="text"
                class="form-input sms-input"
                placeholder="请输入验证码"
                maxlength="6"
                required
              />
              <button
                type="button"
                class="sms-btn"
                :disabled="smsCountdown > 0 || !isValidPhone"
                @click="sendSmsCode"
              >
                {{ smsCountdown > 0 ? `${smsCountdown}s` : '获取验证码' }}
              </button>
            </div>
          </div>

          <!-- 人机验证 -->
          <div class="form-group">
            <label class="form-label">人机验证</label>
            <div class="captcha-container">
              <button 
                type="button" 
                class="captcha-trigger-btn"
                @click="showCaptcha = true"
                :disabled="captchaVerified"
              >
                <span v-if="!captchaVerified">点击进行人机验证</span>
                <span v-else class="verified-text">✓ 验证通过</span>
              </button>
              
              <Vcode 
                :show="showCaptcha"
                @success="onCaptchaSuccess"
                @close="showCaptcha = false"
                :imgs="captchaImages"
                :accuracy="0.85"
                :explain="'拖动滑块完成拼图'"
              />
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
            :disabled="isLoading || !isFormValid"
          >
            {{ isLoading ? '登录中...' : '登录' }}
          </button>
        </form>

        <!-- 第三方登录 -->
        <div class="third-party-login">
          <div class="divider">
            <span class="divider-text">其他登录方式</span>
          </div>
          
          <div class="third-party-buttons">
            <button type="button" class="third-party-btn wechat" @click="thirdPartyLogin('wechat')">
              <img src="/assets/icons/微信图标.svg" alt="微信" class="third-party-icon">
              <span>微信</span>
            </button>

            <button type="button" class="third-party-btn work-wechat" @click="thirdPartyLogin('work-wechat')">
              <img src="/assets/icons/企微_企微.svg" alt="企业微信" class="third-party-icon">
              <span>企业微信</span>
            </button>

            <button type="button" class="third-party-btn dingtalk" @click="thirdPartyLogin('dingtalk')">
              <img src="/assets/icons/钉钉.svg" alt="钉钉" class="third-party-icon">
              <span>钉钉</span>
            </button>

            <button type="button" class="third-party-btn feishu" @click="thirdPartyLogin('feishu')">
              <img src="/assets/icons/飞书.svg" alt="飞书" class="third-party-icon">
              <span>飞书</span>
            </button>
          </div>
        </div>

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
    
    <!-- 二维码扫描弹窗 -->
    <QRCodeScan 
      v-if="showQRScan"
      :platform="currentPlatform"
      @close="closeQRScan"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import QRCodeScan from './QRCodeScan.vue'
import { useRouter } from 'vue-router'
// @ts-ignore
import Vcode from 'vue3-puzzle-vcode'

interface Props {
  userType: 'government' | 'enterprise'
}

const props = defineProps<Props>()
const router = useRouter()

// 登录模式
const loginMode = ref<'password' | 'sms'>('password')

// 表单数据 - 根据用户类型初始化默认值
const loginForm = ref({
  phone: props.userType === 'government' ? '13800138001' : '13800138002',
  password: props.userType === 'government' ? 'gov123456' : 'ent123456',
  smsCode: props.userType === 'government' ? '123456' : '654321',
  rememberMe: false
})

// 密码显示状态
const showPassword = ref(false)

// 加载状态
const isLoading = ref(false)

// 拼图验证码相关状态
const showCaptcha = ref(false)
const captchaVerified = ref(false)

// 短信验证码相关状态
const smsCountdown = ref(0)
const smsTimer = ref<number | null>(null)

// 二维码扫描
const showQRScan = ref(false)
const currentPlatform = ref<'wechat' | 'work-wechat' | 'dingtalk' | 'feishu'>('wechat')

// 验证码图片数组
const captchaImages = ref([
  '/assets/images/hero-bg-1.jpg',
  '/assets/images/hero-bg-2.jpg', 
  '/assets/images/hero-bg-3.jpg',
  '/assets/images/hero-bg-4.jpg',
  '/assets/images/hero-bg-5.jpg'
])



// 计算属性
const isValidPhone = computed(() => {
  return /^1[3-9]\d{9}$/.test(loginForm.value.phone)
})

const isFormValid = computed(() => {
  if (!captchaVerified.value || !isValidPhone.value) {
    return false
  }
  
  if (loginMode.value === 'password') {
    return loginForm.value.password.length >= 6
  } else {
    return loginForm.value.smsCode.length === 6
  }
})

// 验证码成功回调
const onCaptchaSuccess = () => {
  captchaVerified.value = true
  showCaptcha.value = false
  console.log('验证码验证成功')
}

// 切换用户类型
const switchUserType = () => {
  const newType = props.userType === 'government' ? 'enterprise' : 'government'
  router.push(`/login/${newType}`)
}



// 发送短信验证码
const sendSmsCode = async () => {
  if (!isValidPhone.value) {
    alert('请输入正确的手机号')
    return
  }
  
  try {
    // 模拟发送短信验证码
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    alert('验证码已发送')
    
    // 开始倒计时
    smsCountdown.value = 60
    smsTimer.value = window.setInterval(() => {
      smsCountdown.value--
      if (smsCountdown.value <= 0) {
        if (smsTimer.value) {
          clearInterval(smsTimer.value)
          smsTimer.value = null
        }
      }
    }, 1000)
  } catch (error) {
    alert('验证码发送失败，请稍后重试')
  }
}

// 第三方登录
const thirdPartyLogin = (platform: 'wechat' | 'work-wechat' | 'dingtalk' | 'feishu') => {
  currentPlatform.value = platform
  showQRScan.value = true
}

// 关闭二维码扫描
const closeQRScan = () => {
  showQRScan.value = false
}

// 处理登录
const handleLogin = async () => {
  if (!captchaVerified.value) {
    alert('请先完成人机验证')
    showCaptcha.value = true
    return
  }
  
  if (!isFormValid.value) {
    alert('请完善登录信息')
    return
  }

  isLoading.value = true
  
  try {
    // 模拟登录请求
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 登录成功，根据用户类型跳转到对应页面
    if (props.userType === 'government') {
      router.push('/dashboard/government')
    } else {
      // 企业端首页暂未实现，先跳转到首页
      router.push('/')
    }
    
  } catch (error) {
    console.error('登录失败:', error)
    alert('登录失败，请检查登录信息')
    // 登录失败时重置验证码
    captchaVerified.value = false
  } finally {
    isLoading.value = false
  }
}

// 组件挂载
onMounted(() => {
  // 组件挂载完成
})

// 组件卸载前清理定时器
onBeforeUnmount(() => {
  if (smsTimer.value) {
    clearInterval(smsTimer.value)
  }
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
  max-width: 672px;
  padding: 2rem;
  position: relative;
  z-index: 10;
}

.login-card {
  padding: 3rem;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;
}

.login-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(64, 158, 255, 0.3), transparent);
}

/* 暗色主题优化 */
[data-theme="dark"] .login-card {
  background: rgba(15, 23, 42, 0.95);
  border: 1px solid rgba(71, 85, 105, 0.4);
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.6),
    0 0 0 1px rgba(148, 163, 184, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

[data-theme="dark"] .form-input {
  background: rgba(30, 41, 59, 0.8);
  border: 1px solid rgba(71, 85, 105, 0.6);
  color: #f1f5f9;
}

[data-theme="dark"] .form-input:focus {
  border-color: #60a5fa;
  box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.2);
  background: rgba(30, 41, 59, 0.9);
}

[data-theme="dark"] .form-input::placeholder {
  color: #94a3b8;
}

[data-theme="dark"] .form-input:hover:not(:focus) {
  border-color: rgba(96, 165, 250, 0.4);
  background: rgba(30, 41, 59, 0.85);
}

[data-theme="dark"] .captcha-trigger-btn {
  background: rgba(50, 50, 50, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #ffffff;
}

[data-theme="dark"] .captcha-trigger-btn:hover:not(:disabled) {
  background: rgba(60, 60, 60, 0.9);
  border-color: var(--primary-color);
  color: var(--primary-color);
}

[data-theme="dark"] .captcha-trigger-btn:disabled {
  background: rgba(34, 197, 94, 0.2);
  border-color: rgba(34, 197, 94, 0.5);
  color: #22c55e;
}

[data-theme="dark"] .decoration-circle {
  background: linear-gradient(135deg, rgba(64, 158, 255, 0.1), rgba(100, 200, 255, 0.15));
  opacity: 0.15;
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
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  margin: 0;
  line-height: 1.75rem;
}

.login-subtitle {
  font-size: 0.75rem;
  line-height: 1rem;
  color: #94a3b8;
  margin: 0;
}

/* 登录方式切换 */
.login-mode-switch {
  display: flex;
  background: rgba(248, 250, 252, 0.8);
  border-radius: 12px;
  padding: 0.25rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(226, 232, 240, 0.8);
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);
}

.mode-btn {
  flex: 1;
  padding: 0.75rem 1rem;
  border: none;
  background: transparent;
  color: #64748b;
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 0.875rem;
}

.mode-btn.active {
  background: linear-gradient(135deg, #409eff, #66b3ff);
  color: white;
  box-shadow: 0 2px 8px rgba(64, 158, 255, 0.3);
  transform: translateY(-1px);
}

.mode-btn:hover:not(.active) {
  background: rgba(64, 158, 255, 0.1);
  color: #409eff;
}

[data-theme="dark"] .login-title {
  color: #f8fafc;
}

[data-theme="dark"] .login-subtitle {
  color: #94a3b8;
}

[data-theme="dark"] .form-label {
  color: #e2e8f0;
  font-weight: 500;
}

[data-theme="dark"] .login-mode-switch {
  background: rgba(30, 41, 59, 0.8);
  border: 1px solid rgba(71, 85, 105, 0.5);
}

[data-theme="dark"] .mode-btn {
  color: #cbd5e1;
  background: transparent;
}

[data-theme="dark"] .mode-btn:hover:not(.active) {
  background: rgba(71, 85, 105, 0.3);
  color: #e2e8f0;
}

[data-theme="dark"] .mode-btn.active {
  background: linear-gradient(135deg, #3b82f6, #60a5fa);
  color: white;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
}



  .login-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.form-label {
  color: #374151;
  font-weight: 600;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
  letter-spacing: 0.025em;
}

.form-input {
  width: 100%;
  padding: 0.625rem 0.875rem;
  border: 1px solid #e1e5e9;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.9);
  color: #1e293b;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary-color);
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 
    0 0 0 4px rgba(64, 158, 255, 0.1),
    0 4px 12px rgba(64, 158, 255, 0.15),
    inset 0 1px 2px rgba(255, 255, 255, 0.9);
  transform: translateY(-1px);
}

.form-input:hover:not(:focus) {
  border-color: rgba(64, 158, 255, 0.3);
  background: rgba(255, 255, 255, 0.9);
}

.form-input:disabled {
  background: var(--gray-3);
  color: var(--gray-8);
  cursor: not-allowed;
}

.captcha-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.captcha-trigger-btn {
  width: 100%;
  padding: 0.875rem 1rem;
  background: linear-gradient(135deg, rgba(248, 250, 252, 0.9), rgba(241, 245, 249, 0.9));
  border: 1.5px solid rgba(226, 232, 240, 0.8);
  border-radius: 12px;
  color: #475569;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 
    0 1px 3px rgba(0, 0, 0, 0.05),
    inset 0 1px 2px rgba(255, 255, 255, 0.9);
}

.captcha-trigger-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, rgba(64, 158, 255, 0.05), rgba(64, 158, 255, 0.1));
  border-color: var(--primary-color);
  color: var(--primary-color);
  transform: translateY(-1px);
  box-shadow: 
    0 4px 12px rgba(64, 158, 255, 0.15),
    inset 0 1px 2px rgba(255, 255, 255, 0.9);
}

.captcha-trigger-btn:disabled {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(34, 197, 94, 0.15));
  border-color: rgba(34, 197, 94, 0.3);
  color: #059669;
  cursor: not-allowed;
  box-shadow: 
    0 2px 8px rgba(34, 197, 94, 0.1),
    inset 0 1px 2px rgba(255, 255, 255, 0.9);
}

.verified-text {
  color: var(--success-11);
  font-weight: 500;
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

/* 密码输入容器 */
.password-input-container {
  position: relative;
}

.password-toggle {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  color: #64748b;
  font-size: 1.2rem;
  transition: color 0.3s ease;
  z-index: 1;
}

.password-toggle:hover {
  color: #409eff;
}

[data-theme="dark"] .password-toggle {
  color: #94a3b8;
}

[data-theme="dark"] .password-toggle:hover {
  color: #66b3ff;
}

/* 短信验证码输入容器 */
.sms-input-container {
  display: flex;
  gap: 0.75rem;
}

.sms-input {
  flex: 1;
}

.sms-btn {
  padding: 0.75rem 1rem;
  background: linear-gradient(135deg, #409eff, #66b3ff);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  font-size: 0.875rem;
  min-width: 100px;
  box-shadow: 0 2px 8px rgba(64, 158, 255, 0.3);
}

.sms-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #337ecc, #409eff);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.4);
}

.sms-btn:disabled {
  background: linear-gradient(135deg, #e2e8f0, #cbd5e1);
  color: #94a3b8;
  cursor: not-allowed;
  transform: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* 第三方登录 */
.third-party-login {
  margin-top: 1rem;
}

.divider {
  position: relative;
  text-align: center;
  margin: 2rem 0 1.5rem;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(226, 232, 240, 0.8), transparent);
}

.divider-text {
  background: rgba(255, 255, 255, 0.95);
  padding: 0 1rem;
  color: #64748b;
  font-size: 0.875rem;
  font-weight: 400;
  position: relative;
  z-index: 1;
}

[data-theme="dark"] .divider::before {
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent);
}

[data-theme="dark"] .divider-text {
  background: rgba(30, 30, 30, 0.95);
  color: #94a3b8;
}

.third-party-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.third-party-btn {
  min-width: 100px;
  height: 48px;
  padding: 0 12px;
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.third-party-btn:hover {
  background: rgba(255, 255, 255, 0.95);
  border-color: var(--primary-color);
  color: var(--primary-color);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.15);
}

.third-party-btn span {
  font-size: 13px;
  font-weight: 500;
}

.third-party-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  object-fit: contain;
}

.third-party-btn.wechat:hover {
  border-color: #07c160;
  color: #07c160;
}

.third-party-btn.work-wechat:hover {
  border-color: #4e83fd;
  color: #4e83fd;
}

.third-party-btn.dingtalk:hover {
  border-color: #1890ff;
  color: #1890ff;
}

.third-party-btn.feishu:hover {
  border-color: #00d4aa;
  color: #00d4aa;
}

[data-theme="dark"] .third-party-btn {
  background: rgba(30, 41, 59, 0.8);
  border-color: rgba(71, 85, 105, 0.6);
  color: #e2e8f0;
}

[data-theme="dark"] .third-party-btn:hover {
  background: rgba(51, 65, 85, 0.9);
  border-color: rgba(96, 165, 250, 0.5);
  color: #f1f5f9;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

[data-theme="dark"] .third-party-btn span {
  color: inherit;
}

.form-checkbox {
  width: 16px;
  height: 16px;
  accent-color: var(--primary-color);
  cursor: pointer;
}

.checkbox-text {
    font-size: 0.875rem;
    color: #64748b;
    font-weight: 400;
  }

  [data-theme="dark"] .checkbox-text {
    color: #e2e8f0;
  }

  .link-button {
    background: none;
    border: none;
    color: #409eff;
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.2s ease;
    position: relative;
  }

  .link-button:hover {
    color: #337ecc;
    text-decoration: none;
  }

  [data-theme="dark"] .link-button {
    color: #66b3ff;
  }

  [data-theme="dark"] .link-button:hover {
    color: #93c5fd;
  }

.link-button::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #409eff, #66b3ff);
  transition: width 0.3s ease;
}

.link-button:hover::after {
  width: 100%;
}

.login-button {
  width: 100%;
  margin-top: 1.5rem;
  padding: 0.625rem;
  background: linear-gradient(135deg, #409eff, #66b3ff);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 4px 12px rgba(64, 158, 255, 0.3),
    inset 0 1px 2px rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
}

.login-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.login-button:hover:not(:disabled) {
  background: linear-gradient(135deg, #337ecc, #409eff);
  transform: translateY(-2px);
  box-shadow: 
    0 8px 25px rgba(64, 158, 255, 0.4),
    inset 0 1px 2px rgba(255, 255, 255, 0.2);
}

.login-button:hover:not(:disabled)::before {
  left: 100%;
}

.login-button:active:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 
    0 4px 12px rgba(64, 158, 255, 0.3),
    inset 0 1px 2px rgba(255, 255, 255, 0.2);
}

.login-button:disabled {
  background: linear-gradient(135deg, #e2e8f0, #cbd5e1);
  color: #94a3b8;
  cursor: not-allowed;
  transform: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

[data-theme="dark"] .login-button {
  background: linear-gradient(135deg, #3b82f6, #60a5fa);
  box-shadow: 
    0 4px 12px rgba(59, 130, 246, 0.4),
    inset 0 1px 2px rgba(255, 255, 255, 0.1);
}

[data-theme="dark"] .login-button:hover:not(:disabled) {
  background: linear-gradient(135deg, #2563eb, #3b82f6);
  box-shadow: 
    0 8px 25px rgba(59, 130, 246, 0.5),
    inset 0 1px 2px rgba(255, 255, 255, 0.1);
}

[data-theme="dark"] .login-button:disabled {
  background: linear-gradient(135deg, #374151, #4b5563);
  color: #6b7280;
}

.login-footer {
  margin-top: 2rem;
  text-align: center;
}

.footer-text {
    margin: 0 0 1rem 0;
    color: #64748b;
    font-size: 0.875rem;
    font-weight: 400;
  }

  [data-theme="dark"] .footer-text {
    color: #cbd5e1;
  }

  .footer-links {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    color: #94a3b8;
    font-weight: 400;
  }

  [data-theme="dark"] .footer-links {
    color: #cbd5e1;
  }

  .separator {
    color: #cbd5e1;
    font-size: 0.75rem;
  }

  [data-theme="dark"] .separator {
    color: #94a3b8;
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
  background: linear-gradient(135deg, rgba(64, 158, 255, 0.08), rgba(100, 200, 255, 0.12));
  opacity: 0.6;
  animation: float 6s ease-in-out infinite;
  box-shadow: 
    0 0 40px rgba(64, 158, 255, 0.1),
    inset 0 0 20px rgba(255, 255, 255, 0.3);
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
@media (max-width: 672px) {
  .login-container {
    padding: 1rem;
  }
  
  .login-card {
    padding: 2rem;
  }
  
  .captcha-container {
    gap: 0.5rem;
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
