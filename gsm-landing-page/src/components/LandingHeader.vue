<template>
  <header class="header">
    <nav class="nav-container">
      <div class="nav-brand">
        <div class="flex items-center space-x-3">
          <div class="relative">
            <div class="w-10 h-10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield w-8 h-8 text-blue-400 drop-shadow-lg filter hover:text-cyan-400 transition-colors duration-300" style="filter: drop-shadow(rgba(59, 130, 246, 0.3) 0px 0px 8px);">
                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
              </svg>
            </div>
          </div>
          <div>
            <h1 class="text-xl font-bold text-white brand-title">地理信息安全监测平台</h1>
            <p class="text-xs text-slate-400 brand-subtitle">Geospatial Security Monitoring Platform</p>
          </div>
        </div>
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
              <svg class="sun-icon" :class="{ active: !isDark }" width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <svg class="moon-icon" :class="{ active: isDark }" width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
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
  background: var(--text-color);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
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

/* Utility classes for the new logo structure */
.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.space-x-3 > * + * {
  margin-left: 0.75rem;
}

.relative {
  position: relative;
}

.w-10 {
  width: 2.5rem;
}

.h-10 {
  height: 2.5rem;
}

.w-8 {
  width: 2rem;
}

.h-8 {
  height: 2rem;
}

.text-blue-400 {
  color: #60a5fa;
}

.text-cyan-400 {
  color: #22d3ee;
}

.text-white {
  color: white;
}

.text-slate-400 {
  color: #94a3b8;
}

.text-xl {
  font-size: 1.25rem;
  line-height: 1.75rem;
}

.text-xs {
  font-size: 0.75rem;
  line-height: 1rem;
}

.font-bold {
  font-weight: 700;
}

.drop-shadow-lg {
  filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));
}

.filter {
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}

.hover\:text-cyan-400:hover {
  color: #22d3ee;
}

.transition-colors {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.duration-300 {
  transition-duration: 300ms;
}

.brand-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  margin: 0;
  line-height: 1.75rem;
}

.brand-subtitle {
  font-size: 0.75rem;
  line-height: 1rem;
  color: #94a3b8;
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
  color: var(--background-color);
  border-color: rgba(255, 255, 255, 0.3);
}

.btn-outline:hover {
  background: var(--background-color);
  color: var(--text-color);
  border-color: var(--background-color);
}

/* VitePress风格的主题切换按钮 */
.theme-switch {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  width: 40px;
  height: 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
  padding: 2px;
}

.theme-switch:hover {
  border-color: rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.15);
}

.theme-switch:focus-visible {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px var(--primary-color);
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
  top: -1px;
  left: 0px;
  width: 16px;
  height: 16px;
  background: var(--background-color);
  border-radius: 50%;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  border: 1px solid var(--border-color);
}

[data-theme="dark"] .switch-thumb {
  transform: translateX(18px);
  background: var(--background-color);
}

/* 主题切换图标 */
.sun-icon, .moon-icon {
  position: absolute;
  width: 10px;
  height: 10px;
  color: var(--text-color-secondary);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  transform: scale(0.6) rotate(180deg);
}

.sun-icon.active, .moon-icon.active {
  opacity: 1;
  transform: scale(1) rotate(0deg);
  color: var(--text-color);
}

/* 深色主题下的样式调整 */
[data-theme="dark"] .header {
  background: rgba(15, 23, 42, 0.95);
  border-bottom: 1px solid rgba(51, 65, 85, 0.6);
}

[data-theme="dark"] .brand-title {
  color: #f8fafc;
}

[data-theme="dark"] .brand-subtitle {
  color: #94a3b8;
}

[data-theme="dark"] .btn-outline {
  color: #e2e8f0;
  border-color: rgba(226, 232, 240, 0.3);
}

[data-theme="dark"] .btn-outline:hover {
  background: rgba(226, 232, 240, 0.1);
  color: #f8fafc;
  border-color: rgba(226, 232, 240, 0.5);
}

[data-theme="dark"] .theme-switch {
  background: rgba(51, 65, 85, 0.6);
  border-color: rgba(71, 85, 105, 0.8);
}

[data-theme="dark"] .theme-switch:hover {
  background: rgba(71, 85, 105, 0.8);
  border-color: rgba(100, 116, 139, 0.8);
}

[data-theme="dark"] .switch-thumb {
  background: #f8fafc;
  border-color: rgba(148, 163, 184, 0.3);
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
