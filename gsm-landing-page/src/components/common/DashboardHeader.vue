<template>
  <header class="dashboard-header">
    <div class="header-content">
      <div class="header-left">
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
      </div>

      <nav class="main-nav">
        <button
          v-for="item in mainMenus"
          :key="item.key"
          :class="['nav-item', { active: activeMainMenu === item.key }]"
          @click="$emit('menu-select', item.key)"
        >
          <svg class="nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path v-if="item.key === 'overview'" d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" fill="currentColor"/>
            <path v-else-if="item.key === 'vehicle'" d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" fill="currentColor"/>
            <path v-else-if="item.key === 'cloud'" d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" fill="currentColor"/>
            <path v-else-if="item.key === 'enterprise'" d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" fill="currentColor"/>
            <path v-else d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
          </svg>
          {{ item.label }}
        </button>
      </nav>

      <div class="header-right">
        <button
          class="theme-switch"
          type="button"
          role="switch"
          :title="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
          :aria-checked="isDark"
          @click="$emit('toggle-theme')"
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
        <div class="user-info">
          <span class="user-name">{{ userName }}</span>
          <button class="logout-btn" @click="$emit('logout')">退出</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
interface MenuItem { key: string; label: string }

defineProps<{
  isDark: boolean
  mainMenus: MenuItem[]
  activeMainMenu: string
  userName?: string
}>()

defineEmits<{
  (e: 'toggle-theme'): void
  (e: 'menu-select', key: string): void
  (e: 'logout'): void
}>()
</script>

<style scoped>
.dashboard-header {
  background: var(--nav-bg);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}
.header-content { display: flex; justify-content: space-between; align-items: center; padding: 1rem 2rem; width: 100%; margin: 0; }
.header-left { display: flex; align-items: center; gap: 1rem; flex-shrink: 0; }
.nav-brand { display: flex; align-items: center; gap: 0.75rem; }

/* small utility used by the logo block */
.flex { display: flex; }
.items-center { align-items: center; }
.space-x-3 > * + * { margin-left: 0.75rem; }
.relative { position: relative; }
.w-10 { width: 2.5rem; }
.h-10 { height: 2.5rem; }
.justify-center { justify-content: center; }
.w-8 { width: 2rem; }
.h-8 { height: 2rem; }
.text-blue-400 { color: #60a5fa; }
.drop-shadow-lg { filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1)); }
.filter { filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow); }
.hover\:text-cyan-400:hover { color: #22d3ee; }
.transition-colors { transition-property: color, background-color, border-color, text-decoration-color, fill, stroke; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
.duration-300 { transition-duration: 300ms; }
.brand-title { font-size: 1.25rem; font-weight: 700; color: var(--text-color); margin: 0; line-height: 1.75rem; }
.brand-subtitle { font-size: 0.75rem; line-height: 1rem; color: #94a3b8; margin: 0; }
.text-xl { font-size: 1.25rem; line-height: 1.75rem; }
.font-bold { font-weight: 700; }
.text-white { color: var(--text-color); }
.text-xs { font-size: 0.75rem; line-height: 1rem; }
.text-slate-400 { color: #94a3b8; }

.header-right { display: flex; align-items: center; gap: 1rem; flex-shrink: 0; }
.theme-switch { position: relative; display: inline-flex; align-items: center; justify-content: flex-start; width: 40px; height: 20px; border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 10px; background: rgba(255, 255, 255, 0.1); cursor: pointer; transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); outline: none; padding: 2px; }
.theme-switch:hover { border-color: rgba(255, 255, 255, 0.5); background: rgba(255, 255, 255, 0.15); }
.theme-switch:focus-visible { border-color: var(--primary-color); box-shadow: 0 0 0 2px var(--primary-color); outline: none; }
.switch-track { position: relative; width: 100%; height: 100%; border-radius: 10px; overflow: hidden; }
.switch-thumb { position: absolute; top: -1px; left: 0px; width: 16px; height: 16px; background: var(--background-color); border-radius: 50%; transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); display: flex; align-items: center; justify-content: center; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3); border: 1px solid var(--border-color); }
[data-theme="dark"] .switch-thumb { transform: translateX(18px); background: var(--background-color); }
.sun-icon, .moon-icon { position: absolute; width: 10px; height: 10px; color: var(--text-color-secondary); transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); opacity: 0; transform: scale(0.6) rotate(180deg); }
.sun-icon.active, .moon-icon.active { opacity: 1; transform: scale(1) rotate(0deg); color: var(--text-color); }
[data-theme="dark"] .theme-switch { background: rgba(51, 65, 85, 0.6); border-color: rgba(71, 85, 105, 0.8); }
[data-theme="dark"] .theme-switch:hover { background: rgba(71, 85, 105, 0.8); border-color: rgba(100, 116, 139, 0.8); }
[data-theme="dark"] .switch-thumb { background: #f8fafc; border-color: rgba(148, 163, 184, 0.3); }
.user-info { display: flex; align-items: center; gap: 1rem; }
.user-name { font-weight: 500; }
.logout-btn { background: var(--danger-color); color: white; border: none; border-radius: 6px; padding: 0.5rem 1rem; cursor: pointer; font-size: 0.9rem; }

.main-nav { display: flex; justify-content: center; align-items: center; gap: 1.5rem; flex: 1; margin: 0 2rem; }
.nav-item { background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-color); padding: 1rem 2rem; cursor: pointer; color: var(--text-color-secondary); border-radius: 16px; transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); position: relative; overflow: hidden; backdrop-filter: blur(15px); font-weight: 600; font-size: 0.95rem; display: flex; align-items: center; gap: 0.8rem; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); }
.nav-item::before { content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.15), transparent); transition: left 0.6s ease; }
.nav-item::after { content: ''; position: absolute; top: -2px; left: -2px; right: -2px; bottom: -2px; border-radius: 18px; background: var(--gradient-primary); opacity: 0; transition: opacity 0.4s ease; z-index: -1; }
.nav-item:hover { background: var(--hover-bg); border-color: var(--primary-color); color: var(--primary-color); transform: translateY(-3px) scale(1.02); box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2); }
.nav-item:hover::before { left: 100%; }
.nav-item:hover::after { opacity: 0.3; }
.nav-item.active { background: var(--gradient-primary); border-color: var(--primary-color); color: white; font-weight: 700; box-shadow: 0 0 30px var(--glow-color); transform: translateY(-2px); }
.nav-item.active::before { background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent); }
.nav-item.active::after { opacity: 0.6; }
</style>

