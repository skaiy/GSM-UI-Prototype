<template>
  <div class="page-wrapper" :data-theme="isDark ? 'dark' : 'light'">
    <DashboardHeader
      :is-dark="isDark"
      :main-menus="mainMenus"
      :active-main-menu="activeMainMenu"
      user-name="政府管理员"
      @toggle-theme="toggleTheme"
      @menu-select="onMenuSelect"
      @logout="goHome"
    />

    <DashboardLayout>
      <template #sidebar>
        <Sidebar08 :items="subMenus" :active-key="activeSubMenu" @select="onSubMenuSelect" />
      </template>

      <section class="rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)] p-6 shadow-sm">
        <h2 class="text-xl font-semibold text-[var(--text-color)] mb-2">处理活动信息统计</h2>
        <p class="text-[var(--text-color-secondary)]">分栏显示车端操作日志和云端操作日志，支持时间过滤。</p>
      </section>

      <section class="grid gap-4 md:grid-cols-2">
        <div class="rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)] p-4">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-lg font-semibold text-[var(--text-color)]">车端操作日志</h3>
            <select v-model="vehicleTime" class="rounded-md border border-[var(--border-color)] bg-[var(--input-bg)] px-2 py-1 text-[var(--text-color)]">
              <option value="day">日</option>
              <option value="week">周</option>
              <option value="month">月</option>
            </select>
          </div>
          <div class="rounded-md border border-[var(--border-color)] overflow-hidden">
            <table class="w-full text-sm">
              <thead class="bg-[var(--surface-color)] text-[var(--text-color-secondary)]">
                <tr>
                  <th class="text-left p-2">#</th>
                  <th class="text-left p-2">VIN码</th>
                  <th class="text-left p-2">品牌</th>
                  <th class="text-left p-2">车型</th>
                  <th class="text-left p-2">阶段</th>
                  <th class="text-left p-2">时间</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="log in vehicleLogs" :key="log.id" class="border-t border-[var(--border-color)] text-[var(--text-color)]">
                  <td class="p-2">{{ log.id }}</td>
                  <td class="p-2">{{ log.vin }}</td>
                  <td class="p-2">{{ log.brand }}</td>
                  <td class="p-2">{{ log.model }}</td>
                  <td class="p-2">{{ log.stage }}</td>
                  <td class="p-2">{{ log.time }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)] p-4">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-lg font-semibold text-[var(--text-color)]">云端操作日志</h3>
            <select v-model="cloudTime" class="rounded-md border border-[var(--border-color)] bg-[var(--input-bg)] px-2 py-1 text-[var(--text-color)]">
              <option value="day">日</option>
              <option value="week">周</option>
              <option value="month">月</option>
            </select>
          </div>
          <div class="rounded-md border border-[var(--border-color)] overflow-hidden">
            <table class="w-full text-sm">
              <thead class="bg-[var(--surface-color)] text-[var(--text-color-secondary)]">
                <tr>
                  <th class="text-left p-2">#</th>
                  <th class="text-left p-2">企业名称</th>
                  <th class="text-left p-2">类型</th>
                  <th class="text-left p-2">阶段</th>
                  <th class="text-left p-2">时间</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="log in cloudLogs" :key="log.id" class="border-t border-[var(--border-color)] text-[var(--text-color)]">
                  <td class="p-2">{{ log.id }}</td>
                  <td class="p-2">{{ log.company }}</td>
                  <td class="p-2">{{ log.type }}</td>
                  <td class="p-2">{{ log.stage }}</td>
                  <td class="p-2">{{ log.time }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </DashboardLayout>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import DashboardHeader from '@/components/common/DashboardHeader.vue'
import DashboardLayout from '@/components/layouts/DashboardLayout.vue'
import Sidebar08 from '@/components/ui/sidebar/Sidebar08.vue'

const router = useRouter()
const isDark = ref(document.documentElement.getAttribute('data-theme') === 'dark')
const toggleTheme = () => {
  isDark.value = !isDark.value
  const theme = isDark.value ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('theme', theme)
}

const mainMenus = [
  { key: 'overview', label: '综合概览' },
  { key: 'registration', label: '备案审核' },
  { key: 'monitoring', label: '风险监测' },
]
const activeMainMenu = ref('overview')

const subMenus = [
  { key: 'dashboard', label: '首页控制台' },
  { key: 'activity-stats', label: '处理活动信息统计' },
]
const activeSubMenu = ref('activity-stats')

const onSubMenuSelect = (key: string) => {
  activeSubMenu.value = key
  if (key === 'dashboard') router.push('/dashboard/government')
}

const onMenuSelect = (key: string) => {
  activeMainMenu.value = key
  if (key === 'registration') router.push('/content/registration')
  if (key === 'monitoring') router.push('/content/monitoring')
}

const goHome = () => router.push('/')

// filters
const vehicleTime = ref('day')
const cloudTime = ref('day')

// stubs: using a few rows for structure demo
const vehicleLogs = ref([
  { id: 1, vin: 'LSGJ****1234', brand: '比亚迪', model: '汉EV', stage: '收集', time: '2024-01-15 15:30' },
  { id: 2, vin: 'WBAV****5678', brand: '宝马', model: 'iX3', stage: '存储', time: '2024-01-15 15:25' },
])

const cloudLogs = ref([
  { id: 1, company: '高德地图', type: '地图服务商', stage: '加工', time: '2024-01-15 15:35' },
  { id: 2, company: '比亚迪汽车', type: '汽车企业', stage: '传输', time: '2024-01-15 15:30' },
])
</script>

<style scoped>
.page-wrapper { min-height: 100vh; background: var(--background-color); }
</style>

