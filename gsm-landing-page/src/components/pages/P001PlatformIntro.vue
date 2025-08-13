<template>
  <div class="page-wrapper" :data-theme="isDark ? 'dark' : 'light'">
    <DashboardHeader
      :is-dark="isDark"
      :main-menus="mainMenus"
      :active-main-menu="activeMainMenu"
      user-name="访客"
      @toggle-theme="toggleTheme"
      @menu-select="onMenuSelect"
      @logout="goHome"
    />

    <div class="container mx-auto px-4 py-6 grid grid-cols-12 gap-4">
      <aside class="col-span-12 md:col-span-3">
        <SideSubMenu
          title="门户导航"
          :items="subMenus"
          :active-key="activeSubMenu"
          @select="onSubMenuSelect"
        />
      </aside>

      <main class="col-span-12 md:col-span-9 space-y-6">
        <section class="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-6 shadow-sm">
          <h2 class="text-xl font-semibold text-[var(--text-color)] mb-2">平台简介</h2>
          <p class="text-[var(--text-color-secondary)] leading-7">
            智能网联汽车时空数据安全监测平台，致力于支撑政府监管与企业合规，提供风险监测、应急溯源、备案审核等能力。
          </p>
        </section>

        <section class="grid md:grid-cols-2 gap-4">
          <div class="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-6">
            <h3 class="text-lg font-semibold text-[var(--text-color)] mb-2">核心功能</h3>
            <ul class="list-disc pl-5 text-[var(--text-color-secondary)] space-y-1">
              <li>政府监管：风险监测、规则引擎、日志审计</li>
              <li>企业合规：注册备案、评估处置、通知待办</li>
            </ul>
          </div>
          <div class="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-6">
            <h3 class="text-lg font-semibold text-[var(--text-color)] mb-2">运营看板</h3>
            <div class="grid grid-cols-3 gap-3 text-center">
              <div class="rounded-lg border border-[var(--border-color)] p-4">
                <div class="text-2xl font-bold text-[var(--text-color)]">128</div>
                <div class="text-xs text-[var(--text-color-secondary)]">接入企业</div>
              </div>
              <div class="rounded-lg border border-[var(--border-color)] p-4">
                <div class="text-2xl font-bold text-[var(--text-color)]">9.8k</div>
                <div class="text-xs text-[var(--text-color-secondary)]">监管车辆</div>
              </div>
              <div class="rounded-lg border border-[var(--border-color)] p-4">
                <div class="text-2xl font-bold text-[var(--text-color)]">342</div>
                <div class="text-xs text-[var(--text-color-secondary)]">处置案例</div>
              </div>
            </div>
          </div>
        </section>

        <section class="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-6">
          <h3 class="text-lg font-semibold text-[var(--text-color)] mb-2">政策动态 / 新闻</h3>
          <div class="grid gap-3 md:grid-cols-2">
            <article class="rounded-lg border border-[var(--border-color)] p-4">
              <h4 class="font-medium text-[var(--text-color)]">政策解读示例标题</h4>
              <p class="text-sm text-[var(--text-color-secondary)]">简述政策内容与影响...</p>
            </article>
            <article class="rounded-lg border border-[var(--border-color)] p-4">
              <h4 class="font-medium text-[var(--text-color)]">新闻资讯示例标题</h4>
              <p class="text-sm text-[var(--text-color-secondary)]">行业进展与平台成果...</p>
            </article>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import DashboardHeader from '@/components/common/DashboardHeader.vue'
import SideSubMenu from '@/components/common/SideSubMenu.vue'

const router = useRouter()
const isDark = ref(false)
const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
}

const mainMenus = [
  { key: 'portal', label: '门户首页' },
  { key: 'government', label: '政府端' },
  { key: 'enterprise', label: '企业端' },
]
const activeMainMenu = ref('portal')

const subMenus = [
  { key: 'intro', label: '平台介绍' },
  { key: 'news', label: '新闻动态' },
  { key: 'policies', label: '政策法规' },
]
const activeSubMenu = ref('intro')

const onSubMenuSelect = (key: string) => {
  activeSubMenu.value = key
}

const onMenuSelect = (key: string) => {
  activeMainMenu.value = key
  if (key === 'government') router.push('/dashboard/government')
}

const goHome = () => router.push('/')
</script>

<style scoped>
.page-wrapper { min-height: 100vh; background: var(--background-color); }
</style>

