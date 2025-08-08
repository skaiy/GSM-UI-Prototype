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
          <!-- 背景折线图 -->
          <div class="chart-background">
            <svg class="mini-chart" viewBox="0 0 120 40" preserveAspectRatio="none">
              <defs>
                <linearGradient :id="`gradient-${stat.id}`" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" :style="`stop-color:${stat.chartColor};stop-opacity:0.3`" />
                  <stop offset="100%" :style="`stop-color:${stat.chartColor};stop-opacity:0.05`" />
                </linearGradient>
              </defs>
              <path
                :d="stat.chartPath"
                :stroke="stat.chartColor"
                stroke-width="1.5"
                fill="none"
                class="chart-line"
              />
              <path
                :d="stat.chartAreaPath"
                :fill="`url(#gradient-${stat.id})`"
                class="chart-area"
              />
            </svg>
          </div>

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
import { ref, onMounted, onUnmounted, markRaw, h } from 'vue'

// 图标组件（使用渲染函数）
const CarIcon = markRaw({
  render() {
    return h('svg', {
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2'
    }, [
      h('path', { d: 'M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 10h-1.3l-1.4-2.9A3.5 3.5 0 0 0 12.2 5H5.8a3.5 3.5 0 0 0-3.1 2.1L1.3 10H0l-2.5 1.1c-.8.2-1.5 1-1.5 1.9v3c0 .6.4 1 1 1h2' }),
      h('circle', { cx: '7', cy: '17', r: '2' }),
      h('circle', { cx: '17', cy: '17', r: '2' })
    ])
  }
})

const ShieldIcon = markRaw({
  render() {
    return h('svg', {
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2'
    }, [
      h('path', { d: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' })
    ])
  }
})

const AlertIcon = markRaw({
  render() {
    return h('svg', {
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2'
    }, [
      h('path', { d: 'M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z' }),
      h('line', { x1: '12', y1: '9', x2: '12', y2: '13' }),
      h('line', { x1: '12', y1: '17', x2: '12.01', y2: '17' })
    ])
  }
})

const ActivityIcon = markRaw({
  render() {
    return h('svg', {
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2'
    }, [
      h('polyline', { points: '22,12 18,12 15,21 9,3 6,12 2,12' })
    ])
  }
})

// 生成图表路径的函数
const generateChartPath = (data: number[]) => {
  const width = 120
  const height = 40
  const padding = 5

  const maxValue = Math.max(...data)
  const minValue = Math.min(...data)
  const range = maxValue - minValue || 1

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * (width - padding * 2) + padding
    const y = height - padding - ((value - minValue) / range) * (height - padding * 2)
    return `${x},${y}`
  })

  return `M ${points.join(' L ')}`
}

const generateChartAreaPath = (data: number[]) => {
  const width = 120
  const height = 40
  const padding = 5

  const maxValue = Math.max(...data)
  const minValue = Math.min(...data)
  const range = maxValue - minValue || 1

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * (width - padding * 2) + padding
    const y = height - padding - ((value - minValue) / range) * (height - padding * 2)
    return `${x},${y}`
  })

  const firstPoint = points[0]
  const lastPoint = points[points.length - 1]
  const lastX = lastPoint.split(',')[0]
  const firstX = firstPoint.split(',')[0]

  return `M ${firstX},${height - padding} L ${points.join(' L ')} L ${lastX},${height - padding} Z`
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
    status: 'normal',
    chartColor: '#60a5fa',
    chartData: [1200000, 1210000, 1225000, 1235000, 1240000, 1247856],
    chartPath: '',
    chartAreaPath: ''
  },
  {
    id: 2,
    icon: ShieldIcon,
    value: '99.97%',
    trend: '+0.02%',
    trendClass: 'positive',
    title: '数据安全合规率',
    description: '企业数据处理合规情况统计',
    status: 'normal',
    chartColor: '#10b981',
    chartData: [99.92, 99.94, 99.95, 99.96, 99.96, 99.97],
    chartPath: '',
    chartAreaPath: ''
  },
  {
    id: 3,
    icon: AlertIcon,
    value: '3',
    trend: '-2',
    trendClass: 'negative',
    title: '风险事件数量',
    description: '24小时内检测到的风险事件',
    status: 'warning',
    chartColor: '#f59e0b',
    chartData: [8, 6, 5, 4, 5, 3],
    chartPath: '',
    chartAreaPath: ''
  },
  {
    id: 4,
    icon: ActivityIcon,
    value: '156.8TB',
    trend: '+12.5%',
    trendClass: 'positive',
    title: '日数据处理量',
    description: '平台每日处理的数据总量',
    status: 'normal',
    chartColor: '#8b5cf6',
    chartData: [140, 145, 148, 152, 154, 156.8],
    chartPath: '',
    chartAreaPath: ''
  }
])

// 初始化图表路径
const initializeCharts = () => {
  realTimeStats.value.forEach(stat => {
    stat.chartPath = generateChartPath(stat.chartData)
    stat.chartAreaPath = generateChartAreaPath(stat.chartData)
  })
}

// 模拟实时数据更新
let updateInterval: number | null = null

const updateStats = () => {
  realTimeStats.value.forEach(stat => {
    // 模拟数据变化
    if (stat.id === 1) {
      const current = parseInt(stat.value.replace(/,/g, ''))
      const newValue = current + Math.floor(Math.random() * 10)
      stat.value = newValue.toLocaleString()

      // 更新图表数据
      stat.chartData.shift()
      stat.chartData.push(newValue)
      stat.chartPath = generateChartPath(stat.chartData)
      stat.chartAreaPath = generateChartAreaPath(stat.chartData)
    } else if (stat.id === 2) {
      // 合规率微调
      const currentRate = parseFloat(stat.value.replace('%', ''))
      const newRate = Math.max(99.90, Math.min(99.99, currentRate + (Math.random() - 0.5) * 0.02))
      stat.value = newRate.toFixed(2) + '%'

      stat.chartData.shift()
      stat.chartData.push(newRate)
      stat.chartPath = generateChartPath(stat.chartData)
      stat.chartAreaPath = generateChartAreaPath(stat.chartData)
    } else if (stat.id === 3) {
      // 风险事件数量
      const newCount = Math.max(0, Math.floor(Math.random() * 8))
      stat.value = newCount.toString()

      stat.chartData.shift()
      stat.chartData.push(newCount)
      stat.chartPath = generateChartPath(stat.chartData)
      stat.chartAreaPath = generateChartAreaPath(stat.chartData)
    } else if (stat.id === 4) {
      // 数据处理量
      const currentValue = parseFloat(stat.value.replace('TB', ''))
      const newValue = currentValue + (Math.random() - 0.5) * 2
      stat.value = newValue.toFixed(1) + 'TB'

      stat.chartData.shift()
      stat.chartData.push(newValue)
      stat.chartPath = generateChartPath(stat.chartData)
      stat.chartAreaPath = generateChartAreaPath(stat.chartData)
    }
  })
}

onMounted(() => {
  initializeCharts()
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

/* 图表背景样式 */
.chart-background {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 120px;
  height: 40px;
  opacity: 0.6;
  pointer-events: none;
  z-index: 1;
}

.mini-chart {
  width: 100%;
  height: 100%;
}

.chart-line {
  stroke-linecap: round;
  stroke-linejoin: round;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
  animation: drawLine 2s ease-in-out;
}

.chart-area {
  opacity: 0.8;
  animation: fillArea 2s ease-in-out;
}

/* 图表动画 */
@keyframes drawLine {
  0% {
    stroke-dasharray: 200;
    stroke-dashoffset: 200;
  }
  100% {
    stroke-dasharray: 200;
    stroke-dashoffset: 0;
  }
}

@keyframes fillArea {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 0.8;
  }
}

/* 悬停时图表增强效果 */
.stat-card:hover .chart-background {
  opacity: 0.9;
}

.stat-card:hover .chart-line {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4));
}

/* 确保内容在图表之上 */
.stat-icon,
.stat-content {
  position: relative;
  z-index: 2;
}

.stat-indicator {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  z-index: 3;
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
