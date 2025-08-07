<template>
  <section class="realtime-stats-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">实时监控数据</h2>
        <p class="section-subtitle">
          实时展示平台监控数据，确保数据安全态势感知
        </p>
      </div>
      <div class="stats-grid">
        <div v-for="stat in realTimeStats" :key="stat.id" class="stat-card">
          <div class="stat-icon">
            <component :is="stat.icon" class="icon" />
          </div>
          <div class="stat-content">
            <div class="stat-value-container">
              <span class="stat-value">{{ stat.value }}</span>
              <span class="stat-trend" :class="stat.trendClass">
                {{ stat.trend }}
              </span>
            </div>
            <h4 class="stat-title">{{ stat.title }}</h4>
            <p class="stat-desc">{{ stat.description }}</p>
          </div>
          <div class="stat-indicator" :class="stat.status"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// 图标组件（简化版SVG）
const CarIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 10h-1.3l-1.4-2.9A3.5 3.5 0 0 0 12.2 5H5.8a3.5 3.5 0 0 0-3.1 2.1L1.3 10H0l-2.5 1.1c-.8.2-1.5 1-1.5 1.9v3c0 .6.4 1 1 1h2"/>
      <circle cx="7" cy="17" r="2"/>
      <circle cx="17" cy="17" r="2"/>
    </svg>
  `
}

const ShieldIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  `
}

const AlertIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  `
}

const ActivityIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/>
    </svg>
  `
}

const realTimeStats = ref([
  {
    id: 1,
    icon: CarIcon,
    value: '1,247,856',
    trend: '+2.3%',
    trendClass: 'positive',
    title: '接入车辆总数',
    description: '当前平台监控的智能网联汽车数量',
    status: 'normal'
  },
  {
    id: 2,
    icon: ShieldIcon,
    value: '99.97%',
    trend: '+0.02%',
    trendClass: 'positive',
    title: '数据安全合规率',
    description: '企业数据处理合规情况统计',
    status: 'normal'
  },
  {
    id: 3,
    icon: AlertIcon,
    value: '3',
    trend: '-2',
    trendClass: 'negative',
    title: '风险事件数量',
    description: '24小时内检测到的风险事件',
    status: 'warning'
  },
  {
    id: 4,
    icon: ActivityIcon,
    value: '156.8TB',
    trend: '+12.5%',
    trendClass: 'positive',
    title: '日数据处理量',
    description: '平台每日处理的数据总量',
    status: 'normal'
  }
])

// 模拟实时数据更新
let updateInterval: number | null = null

const updateStats = () => {
  realTimeStats.value.forEach(stat => {
    // 模拟数据变化
    if (stat.id === 1) {
      const current = parseInt(stat.value.replace(/,/g, ''))
      const newValue = current + Math.floor(Math.random() * 10)
      stat.value = newValue.toLocaleString()
    }
  })
}

onMounted(() => {
  updateInterval = setInterval(updateStats, 30000) // 30秒更新一次
})

onUnmounted(() => {
  if (updateInterval) {
    clearInterval(updateInterval)
  }
})
</script>

<style scoped>
/* 实时数据监控区域 */
.realtime-stats-section {
  padding: 4rem 0;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  position: relative;
}

.realtime-stats-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="%23334155" stroke-width="0.5" opacity="0.3"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
  opacity: 0.1;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #f8fafc;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-subtitle {
  font-size: 1.125rem;
  color: #94a3b8;
  max-width: 600px;
  margin: 0 auto;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: rgba(30, 41, 59, 0.8);
  border: 1px solid rgba(51, 65, 85, 0.6);
  border-radius: 16px;
  padding: 2rem;
  position: relative;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #3b82f6, #60a5fa);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  border-color: rgba(59, 130, 246, 0.5);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.stat-card:hover::before {
  opacity: 1;
}

.stat-icon {
  width: 48px;
  height: 48px;
  margin-bottom: 1.5rem;
  color: #60a5fa;
}

.icon {
  width: 100%;
  height: 100%;
}

.stat-value-container {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 2.25rem;
  font-weight: 700;
  color: #f8fafc;
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
}

.stat-trend {
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
}

.stat-trend.positive {
  color: #10b981;
  background: rgba(16, 185, 129, 0.1);
}

.stat-trend.negative {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
}

.stat-title {
  font-size: 1rem;
  font-weight: 600;
  color: #e2e8f0;
  margin-bottom: 0.5rem;
}

.stat-desc {
  font-size: 0.875rem;
  color: #94a3b8;
  line-height: 1.5;
}

.stat-indicator {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.stat-indicator.normal {
  background: #10b981;
  box-shadow: 0 0 8px rgba(16, 185, 129, 0.6);
}

.stat-indicator.warning {
  background: #f59e0b;
  box-shadow: 0 0 8px rgba(245, 158, 11, 0.6);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .realtime-stats-section {
    padding: 3rem 0;
  }

  .section-title {
    font-size: 2rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .stat-card {
    padding: 1.5rem;
  }
}
</style>
