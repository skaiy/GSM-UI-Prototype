<template>
  <header class="header">
    <nav class="nav-container">
      <div class="nav-brand">
        <img src="/logo.svg" alt="平台Logo" class="logo" />
        <h1 class="brand-title">地理信息安全监测平台</h1>
      </div>
      <div class="nav-actions">
        <button
          class="theme-switch"
          type="button"
          role="switch"
          :title="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
          :aria-checked="isDark"
          @click="toggleTheme"
        >
          <span class="switch-track">
            <span class="switch-thumb">
              <span class="switch-icon">
                <svg class="sun-icon vpi-sun" :class="{ active: !isDark }" width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <svg class="moon-icon vpi-moon" :class="{ active: isDark }" width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </span>
          </span>
        </button>
        <button class="btn btn-outline" @click="$router.push('/login/government')">
          政府端登录
        </button>
        <button class="btn btn-primary" @click="$router.push('/login/enterprise')">
          企业端登录
        </button>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isDark = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
}

onMounted(() => {
  // 初始化主题为暗色主题，体现专业监管平台形象
  isDark.value = true
  document.documentElement.setAttribute('data-theme', 'dark')
})
</script>

<style scoped>
/* 导航栏样式 */
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--background-color);
  border-bottom: 1px solid var(--border-color);
  backdrop-filter: blur(8px);
  width: 100%;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  width: 100%;
  box-sizing: border-box;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo {
  width: 40px;
  height: 40px;
}

.brand-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--primary-color);
  margin: 0;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* 按钮样式 */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border: 1px solid transparent;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  background: transparent;
  white-space: nowrap;
}

.btn:hover {
  transform: translateY(-1px);
}

.btn-primary {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.btn-primary:hover {
  background: var(--primary-hover);
  border-color: var(--primary-hover);
}

.btn-outline {
  color: var(--primary-color);
  border-color: var(--primary-color);
}

.btn-outline:hover {
  background: var(--primary-color);
  color: white;
}

/* VitePress风格的主题切换按钮 */
.theme-switch {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  width: 40px;
  height: 20px;
  border: 1px solid var(--vp-c-border);
  border-radius: 10px;
  background: var(--vp-c-bg-alt);
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
  padding: 1px;
}

.theme-switch:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-bg);
}

.theme-switch:focus-visible {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 2px var(--vp-c-brand-1);
  outline: none;
}

.switch-track {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
}

.switch-thumb {
  position: absolute;
  top: 1px;
  left: 1px;
  width: 16px;
  height: 16px;
  background: var(--vp-c-bg);
  border-radius: 50%;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  border: 1px solid var(--vp-c-border);
}

[data-theme="dark"] .switch-thumb {
  transform: translateX(20px);
  background: var(--vp-c-bg);
}

.switch-icon {
  position: relative;
  width: 10px;
  height: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* VitePress风格的图标系统 */
.vpi-sun, .vpi-moon {
  position: absolute;
  width: 10px;
  height: 10px;
  color: var(--vp-c-text-2, #666);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  transform: scale(0.6) rotate(180deg);
}

.vpi-sun.active, .vpi-moon.active {
  opacity: 1;
  transform: scale(1) rotate(0deg);
  color: var(--vp-c-text-1, #333);
}

/* 深色主题下的图标颜色 */
[data-theme="dark"] .vpi-sun,
[data-theme="dark"] .vpi-moon {
  color: var(--vp-c-text-2, #ccc);
}

[data-theme="dark"] .vpi-sun.active,
[data-theme="dark"] .vpi-moon.active {
  color: var(--vp-c-text-1, #fff);
}

/* 兼容旧的类名 */
.sun-icon, .moon-icon {
  position: absolute;
  width: 12px;
  height: 12px;
  color: var(--vp-c-text-2, #666);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  transform: scale(0.6) rotate(180deg);
}

.sun-icon.active, .moon-icon.active {
  opacity: 1;
  transform: scale(1) rotate(0deg);
  color: var(--vp-c-text-1, #333);
}

/* 深色主题下的样式调整 */
[data-theme="dark"] .theme-switch {
  background: var(--primary-color);
  border-color: var(--primary-color);
}

[data-theme="dark"] .theme-switch:hover {
  background: var(--primary-hover);
  border-color: var(--primary-hover);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .nav-container {
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;
  }

  .nav-actions {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
