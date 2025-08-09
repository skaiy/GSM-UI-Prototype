<template>
  <div class="government-dashboard" :data-theme="isDark ? 'dark' : 'light'">
    <!-- Header 导航栏 -->
    <header class="dashboard-header">
      <div class="header-content">
        <div class="header-left">
          <img src="/logo.svg" alt="平台Logo" class="header-logo" />
          <h1 class="header-title">地理信息安全监测平台</h1>
        </div>
        <div class="header-right">
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
          <div class="user-info">
            <span class="user-name">政府管理员</span>
            <button class="logout-btn" @click="logout">退出</button>
          </div>
        </div>
      </div>
      
      <!-- 一级菜单 -->
      <nav class="main-nav">
        <button 
          v-for="item in mainMenus" 
          :key="item.key"
          :class="['nav-item', { active: activeMainMenu === item.key }]"
          @click="setActiveMainMenu(item.key)"
        >
          {{ item.label }}
        </button>
      </nav>
    </header>

    <div class="dashboard-body">
      <!-- 主内容区域 - 无二级菜单 -->
      <main class="main-content">
        <!-- 综合概览页面 -->
        <div v-if="activeMainMenu === 'overview'" class="overview-content">
          <!-- 顶部统计卡片 -->
          <div class="stats-cards">
            <div class="stat-card">
              <div class="stat-icon vehicle">🚗</div>
              <div class="stat-info">
                <h3>车辆总数</h3>
                <p class="stat-number">{{ stats.totalVehicles.toLocaleString() }}</p>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon online">🟢</div>
              <div class="stat-info">
                <h3>在线车辆总数</h3>
                <p class="stat-number">{{ stats.onlineVehicles.toLocaleString() }}</p>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon risk-vehicle">⚠️</div>
              <div class="stat-info">
                <h3>累计车端风险总数</h3>
                <p class="stat-number">{{ stats.vehicleRisks.toLocaleString() }}</p>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon risk-cloud">☁️</div>
              <div class="stat-info">
                <h3>累计云端风险总数</h3>
                <p class="stat-number">{{ stats.cloudRisks.toLocaleString() }}</p>
              </div>
            </div>
          </div>

          <!-- 新的三栏布局：左侧车端 - 中间地图 - 右侧云端 -->
          <div class="three-column-layout">
            <!-- 左侧车端区域 -->
            <div class="left-column vehicle-section">
              <h2 class="section-title">🚗 车端监控</h2>
              
              <!-- 车辆信息统计 -->
              <div class="stats-panel">
                <h3>车辆信息统计</h3>
                <div class="chart-container">
                  <div class="chart-placeholder">
                    <div class="pie-chart">
                      <div class="chart-legend">
                        <div class="legend-item">
                          <span class="legend-color" style="background: #409EFF"></span>
                          <span>M类 (45%)</span>
                        </div>
                        <div class="legend-item">
                          <span class="legend-color" style="background: #67C23A"></span>
                          <span>N类 (30%)</span>
                        </div>
                        <div class="legend-item">
                          <span class="legend-color" style="background: #E6A23C"></span>
                          <span>O类 (15%)</span>
                        </div>
                        <div class="legend-item">
                          <span class="legend-color" style="background: #F56C6C"></span>
                          <span>低速无人驾驶 (10%)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 车端风险统计 -->
              <div class="stats-panel">
                <h3>车端风险统计</h3>
                <div class="chart-controls">
                  <select v-model="vehicleTimeFilter" class="time-filter">
                    <option value="day">日</option>
                    <option value="week">周</option>
                    <option value="month">月</option>
                    <option value="year">年</option>
                  </select>
                  <div class="chart-type-buttons">
                    <button 
                      v-for="type in chartTypes" 
                      :key="type.key"
                      :class="['chart-btn', { active: vehicleChartType === type.key }]"
                      @click="vehicleChartType = type.key"
                    >
                      {{ type.label }}
                    </button>
                  </div>
                </div>
                <div class="chart-container">
                  <div class="chart-placeholder">
                    <div v-if="vehicleChartType === 'bar'" class="bar-chart">
                      <div class="bar-item" v-for="item in vehicleRiskData" :key="item.stage">
                        <div class="bar" :style="{ height: item.value + '%', background: item.color }"></div>
                        <span class="bar-label">{{ item.stage }}</span>
                      </div>
                    </div>
                    <div v-else-if="vehicleChartType === 'pie'" class="pie-chart-small">
                      <div class="pie-center">风险分布</div>
                    </div>
                    <div v-else class="line-chart">
                      <div class="line-placeholder">风险趋势图</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 车端风险预警 -->
              <div class="stats-panel">
                <h3>车端风险预警</h3>
                <div class="filter-buttons">
                  <button 
                    v-for="filter in timeFilters" 
                    :key="filter"
                    :class="['filter-btn', { active: vehicleRiskFilter === filter }]"
                    @click="vehicleRiskFilter = filter"
                  >
                    {{ filter }}
                  </button>
                </div>
                <div class="risk-list">
                  <div class="risk-item" v-for="risk in vehicleRisks" :key="risk.id">
                    <span class="risk-id">{{ risk.id }}</span>
                    <span class="risk-vin">{{ risk.vin }}</span>
                    <span :class="['risk-level', risk.level]">{{ risk.levelText }}</span>
                    <span class="risk-stage">{{ risk.stage }}</span>
                    <span class="risk-event">{{ risk.event }}</span>
                    <span class="risk-time">{{ risk.time }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 中间地图区域 -->
            <div class="center-column map-section">
              <div class="section-header">
                <h2>🗺️ 属地试点城市区域地图 - 天津市</h2>
                <div class="map-controls">
                  <button class="control-btn" @click="zoomIn">🔍+</button>
                  <button class="control-btn" @click="zoomOut">🔍-</button>
                  <button class="control-btn" @click="resetView">🎯</button>
                </div>
              </div>
              <div class="map-container" ref="mapContainer">
                <div class="map-placeholder">
                  <div class="city-boundary">
                    <h3>天津市地理围栏</h3>
                    <!-- 模拟地图节点 -->
                    <div class="map-nodes">
                      <div 
                        v-for="node in mapNodes" 
                        :key="node.id"
                        :class="['map-node', node.type]"
                        :style="{ left: node.x + '%', top: node.y + '%' }"
                        @mouseenter="showNodeInfo(node)"
                        @mouseleave="hideNodeInfo"
                        @click="selectNode(node)"
                      >
                        <span class="node-icon">{{ node.type === 'vehicle' ? '🚗' : '☁️' }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 节点信息提示 -->
                <div v-if="hoveredNode" class="node-tooltip" :style="tooltipStyle">
                  <h4>{{ hoveredNode.name }}</h4>
                  <p>类型: {{ hoveredNode.type === 'vehicle' ? '车端节点' : '云端节点' }}</p>
                  <p>状态: {{ hoveredNode.status }}</p>
                  <p>风险等级: {{ hoveredNode.riskLevel }}</p>
                </div>
              </div>
            </div>

            <!-- 右侧云端区域 -->
            <div class="right-column cloud-section">
              <h2 class="section-title">☁️ 云端监控</h2>
              
              <!-- 企业信息统计 -->
              <div class="stats-panel">
                <h3>企业信息统计</h3>
                <div class="chart-container">
                  <div class="chart-placeholder">
                    <div class="pie-chart">
                      <div class="chart-legend">
                        <div class="legend-item">
                          <span class="legend-color" style="background: #409EFF"></span>
                          <span>地图服务商 (35%)</span>
                        </div>
                        <div class="legend-item">
                          <span class="legend-color" style="background: #67C23A"></span>
                          <span>汽车企业 (40%)</span>
                        </div>
                        <div class="legend-item">
                          <span class="legend-color" style="background: #E6A23C"></span>
                          <span>智驾方案提供商 (15%)</span>
                        </div>
                        <div class="legend-item">
                          <span class="legend-color" style="background: #F56C6C"></span>
                          <span>平台运营方 (10%)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 云端风险统计 -->
              <div class="stats-panel">
                <h3>云端风险统计</h3>
                <div class="chart-controls">
                  <select v-model="cloudTimeFilter" class="time-filter">
                    <option value="day">日</option>
                    <option value="week">周</option>
                    <option value="month">月</option>
                    <option value="year">年</option>
                  </select>
                  <div class="chart-type-buttons">
                    <button 
                      v-for="type in chartTypes" 
                      :key="type.key"
                      :class="['chart-btn', { active: cloudChartType === type.key }]"
                      @click="cloudChartType = type.key"
                    >
                      {{ type.label }}
                    </button>
                  </div>
                </div>
                <div class="chart-container">
                  <div class="chart-placeholder">
                    <div v-if="cloudChartType === 'bar'" class="bar-chart">
                      <div class="bar-item" v-for="item in cloudRiskData" :key="item.stage">
                        <div class="bar" :style="{ height: item.value + '%', background: item.color }"></div>
                        <span class="bar-label">{{ item.stage }}</span>
                      </div>
                    </div>
                    <div v-else-if="cloudChartType === 'pie'" class="pie-chart-small">
                      <div class="pie-center">风险分布</div>
                    </div>
                    <div v-else class="line-chart">
                      <div class="line-placeholder">风险趋势图</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 云端风险预警 -->
              <div class="stats-panel">
                <h3>云端风险预警</h3>
                <div class="filter-buttons">
                  <button 
                    v-for="filter in timeFilters" 
                    :key="filter"
                    :class="['filter-btn', { active: cloudRiskFilter === filter }]"
                    @click="cloudRiskFilter = filter"
                  >
                    {{ filter }}
                  </button>
                </div>
                <div class="risk-list">
                  <div class="risk-item" v-for="risk in cloudRisks" :key="risk.id">
                    <span class="risk-id">{{ risk.id }}</span>
                    <span class="risk-company">{{ risk.company }}</span>
                    <span :class="['risk-level', risk.level]">{{ risk.levelText }}</span>
                    <span class="risk-operation">{{ risk.operation }}</span>
                    <span class="risk-event">{{ risk.event }}</span>
                    <span class="risk-time">{{ risk.time }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 处理活动信息 -->
          <div class="activity-section">
            <h2>📊 处理活动信息</h2>
            <div class="activity-tabs">
              <button 
                :class="['tab-btn', { active: activeActivityTab === 'vehicle' }]"
                @click="activeActivityTab = 'vehicle'"
              >
                🚗 车端操作日志
              </button>
              <button 
                :class="['tab-btn', { active: activeActivityTab === 'cloud' }]"
                @click="activeActivityTab = 'cloud'"
              >
                ☁️ 云端操作日志
              </button>
            </div>
            <div class="activity-content">
              <div v-if="activeActivityTab === 'vehicle'" class="activity-table">
                <table>
                  <thead>
                    <tr>
                      <th>序号</th>
                      <th>VIN码</th>
                      <th>车辆品牌</th>
                      <th>车辆型号</th>
                      <th>处理阶段</th>
                      <th>处理时间</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="log in vehicleLogs" :key="log.id">
                      <td>{{ log.id }}</td>
                      <td>{{ log.vin }}</td>
                      <td>{{ log.brand }}</td>
                      <td>{{ log.model }}</td>
                      <td>{{ log.stage }}</td>
                      <td>{{ log.time }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div v-else class="activity-table">
                <table>
                  <thead>
                    <tr>
                      <th>序号</th>
                      <th>企业名称</th>
                      <th>企业类型</th>
                      <th>处理阶段</th>
                      <th>处理时间</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="log in cloudLogs" :key="log.id">
                      <td>{{ log.id }}</td>
                      <td>{{ log.company }}</td>
                      <td>{{ log.type }}</td>
                      <td>{{ log.stage }}</td>
                      <td>{{ log.time }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <!-- 其他菜单内容占位 -->
        <div v-else class="placeholder-content">
          <h2>{{ getActiveMenuLabel() }}</h2>
          <p>该功能模块正在开发中...</p>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 主题切换
const isDark = ref(false)
const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
}

// 菜单状态
const activeMainMenu = ref('overview')
const activeSubMenu = ref('')

// 主菜单配置
const mainMenus = [
  { key: 'overview', label: '综合概览' },
  { key: 'registration', label: '备案审核' },
  { key: 'monitoring', label: '风险监测' },
  { key: 'system', label: '系统管理' }
]

// 注意：已移除二级菜单配置，采用简化的单级菜单结构

// 统计数据
const stats = reactive({
  totalVehicles: 125680,
  onlineVehicles: 98432,
  vehicleRisks: 1247,
  cloudRisks: 856
})

// 地图节点数据
const mapNodes = ref([
  { id: 1, name: '滨海新区车端节点', type: 'vehicle', x: 75, y: 45, status: '在线', riskLevel: '低' },
  { id: 2, name: '和平区车端节点', type: 'vehicle', x: 45, y: 35, status: '在线', riskLevel: '中' },
  { id: 3, name: '河西区云端节点', type: 'cloud', x: 40, y: 50, status: '在线', riskLevel: '低' },
  { id: 4, name: '南开区车端节点', type: 'vehicle', x: 35, y: 40, status: '离线', riskLevel: '高' },
  { id: 5, name: '河东区云端节点', type: 'cloud', x: 55, y: 45, status: '在线', riskLevel: '中' }
])

// 节点悬停信息
const hoveredNode = ref(null)
const tooltipStyle = ref({})

// 图表类型
const chartTypes = [
  { key: 'bar', label: '柱状图' },
  { key: 'pie', label: '饼图' },
  { key: 'line', label: '折线图' }
]

// 车端相关状态
const vehicleTimeFilter = ref('day')
const vehicleChartType = ref('bar')
const vehicleRiskFilter = ref('日')

// 云端相关状态
const cloudTimeFilter = ref('day')
const cloudChartType = ref('bar')
const cloudRiskFilter = ref('日')

// 时间过滤器
const timeFilters = ['年', '月', '日']

// 活动日志标签页
const activeActivityTab = ref('vehicle')

// 风险数据
const vehicleRiskData = [
  { stage: '收集', value: 60, color: '#409EFF' },
  { stage: '存储', value: 80, color: '#67C23A' },
  { stage: '传输', value: 45, color: '#E6A23C' }
]

const cloudRiskData = [
  { stage: '收集', value: 70, color: '#409EFF' },
  { stage: '存储', value: 55, color: '#67C23A' },
  { stage: '传输', value: 65, color: '#E6A23C' },
  { stage: '加工', value: 40, color: '#F56C6C' },
  { stage: '提供', value: 30, color: '#909399' },
  { stage: '公开', value: 20, color: '#C0C4CC' },
  { stage: '销毁', value: 15, color: '#E4E7ED' }
]

// 风险列表数据
const vehicleRisks = ref([
  { id: 1, vin: 'LSGJ****1234', level: 'high', levelText: '高', stage: '传输', event: '数据泄露风险', time: '2024-01-15 14:30' },
  { id: 2, vin: 'WBAV****5678', level: 'medium', levelText: '中', stage: '存储', event: '访问异常', time: '2024-01-15 13:45' },
  { id: 3, vin: 'LFPH****9012', level: 'low', levelText: '低', stage: '收集', event: '数据格式异常', time: '2024-01-15 12:20' }
])

const cloudRisks = ref([
  { id: 1, company: '某地图服务商', level: 'high', levelText: '高', operation: '数据提供', event: '未授权访问', time: '2024-01-15 15:20' },
  { id: 2, company: '某汽车企业', level: 'medium', levelText: '中', operation: '数据收集', event: '超范围收集', time: '2024-01-15 14:15' },
  { id: 3, company: '某智驾方案商', level: 'low', levelText: '低', operation: '数据加工', event: '处理延迟', time: '2024-01-15 13:30' }
])

// 操作日志数据
const vehicleLogs = ref([
  { id: 1, vin: 'LSGJ****1234', brand: '比亚迪', model: '汉EV', stage: '数据收集', time: '2024-01-15 15:30' },
  { id: 2, vin: 'WBAV****5678', brand: '宝马', model: 'iX3', stage: '数据存储', time: '2024-01-15 15:25' },
  { id: 3, vin: 'LFPH****9012', brand: '理想', model: 'L9', stage: '数据传输', time: '2024-01-15 15:20' }
])

const cloudLogs = ref([
  { id: 1, company: '高德地图', type: '地图服务商', stage: '数据收集', time: '2024-01-15 15:35' },
  { id: 2, company: '比亚迪汽车', type: '汽车企业', stage: '数据存储', time: '2024-01-15 15:30' },
  { id: 3, company: '百度Apollo', type: '智驾方案提供商', stage: '数据加工', time: '2024-01-15 15:25' }
])

// 方法
const setActiveMainMenu = (key: string) => {
  activeMainMenu.value = key
  activeSubMenu.value = ''
}

const setActiveSubMenu = (key: string) => {
  activeSubMenu.value = key
}

const getActiveMenuLabel = () => {
  const mainMenu = mainMenus.find(m => m.key === activeMainMenu.value)
  return mainMenu?.label || '未知菜单'
}

const showNodeInfo = (node: any) => {
  hoveredNode.value = node
  // 这里可以添加更复杂的tooltip定位逻辑
}

const hideNodeInfo = () => {
  hoveredNode.value = null
}

const selectNode = (node: any) => {
  console.log('选中节点:', node)
}

const zoomIn = () => {
  console.log('放大地图')
}

const zoomOut = () => {
  console.log('缩小地图')
}

const resetView = () => {
  console.log('重置视图')
}

const logout = () => {
  router.push('/')
}

// 生命周期
onMounted(() => {
  // 初始化主题
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark') {
    isDark.value = true
    document.documentElement.setAttribute('data-theme', 'dark')
  }
})
</script>

<style scoped>
/* 基础样式 */
.government-dashboard {
  min-height: 100vh;
  background: var(--background-color);
  color: var(--text-color);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  position: relative;
  overflow-x: hidden;
}

/* 添加背景科技感效果 */
.government-dashboard::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 20%, var(--glow-color) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, var(--glow-color) 0%, transparent 50%),
    radial-gradient(circle at 40% 60%, rgba(74, 144, 226, 0.1) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
}

.government-dashboard > * {
  position: relative;
  z-index: 1;
}

/* Header 样式 */
.dashboard-header {
  background: var(--nav-bg);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header-logo {
  width: 40px;
  height: 40px;
  filter: drop-shadow(0 0 8px var(--primary-color));
}

.header-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
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

/* 深色主题下的主题切换按钮样式调整 */
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

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-name {
  font-weight: 500;
}

.logout-btn {
  background: var(--danger-color);
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.9rem;
}

/* 主导航 */
.main-nav {
  display: flex;
  background: var(--nav-bg);
  border-top: 1px solid var(--border-color);
  padding: 0 2rem;
  gap: 1rem;
  align-items: center;
}

.nav-item {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid transparent;
  padding: 0.8rem 1.5rem;
  cursor: pointer;
  color: var(--text-color-secondary);
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  font-weight: 500;
}

.nav-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.5s ease;
}

.nav-item:hover {
  background: var(--hover-bg);
  border-color: var(--primary-color);
  color: var(--primary-color);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.nav-item:hover::before {
  left: 100%;
}

.nav-item.active {
  background: var(--gradient-primary);
  border-color: var(--primary-color);
  color: white;
  font-weight: 600;
  box-shadow: 0 0 20px var(--glow-color);
}

.nav-item.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 3px;
  background: var(--accent-color);
  border-radius: 2px;
  box-shadow: 0 0 10px var(--accent-color);
}

/* 主体布局 */
.dashboard-body {
  display: flex;
  min-height: calc(100vh - 140px);
}

/* 侧边栏样式已移除 - 采用无二级菜单的简化布局 */

/* 主内容区 */
.main-content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}

/* 三列布局 */
.three-column-layout {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 2rem;
  height: calc(100vh - 200px);
  padding: 2rem;
  margin-bottom: 2rem;
  position: relative;
}

.three-column-layout::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 50% 50%, rgba(0, 123, 255, 0.05) 0%, transparent 70%);
  pointer-events: none;
  z-index: -1;
}

/* 左侧车端区域 */
.left-column {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;
}

.vehicle-section .section-title {
  color: var(--text-color);
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* 中间地图区域 */
.center-column {
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
}

.map-section .section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.map-section .section-header h2 {
  color: var(--text-color);
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0;
}

.map-controls {
  display: flex;
  gap: 0.5rem;
}

.control-btn {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 0.5rem;
  cursor: pointer;
  color: var(--text-color);
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.control-btn:hover {
  background: var(--hover-bg);
  border-color: var(--primary-color);
}

.map-container {
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 20px;
  height: 500px;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(15px);
  transition: all 0.3s ease;
}

.map-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--gradient-secondary);
  opacity: 0.1;
  z-index: -1;
}

.map-container::after {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: var(--gradient-primary);
  border-radius: 22px;
  z-index: -2;
  opacity: 0.3;
}

.map-container:hover {
  border-color: var(--primary-color);
  box-shadow: 0 0 30px var(--glow-color);
}

.map-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

[data-theme="dark"] .map-placeholder {
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
}

.city-boundary {
  width: 90%;
  height: 90%;
  border: 2px dashed var(--primary-color);
  border-radius: 20px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.city-boundary h3 {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: var(--text-color);
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
}

.map-nodes {
  position: absolute;
  width: 100%;
  height: 100%;
}

.map-node {
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translate(-50%, -50%);
  border: 2px solid var(--card-bg);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 2;
}

.map-node::before {
  content: '';
  position: absolute;
  top: -8px;
  left: -8px;
  right: -8px;
  bottom: -8px;
  border-radius: 50%;
  opacity: 0.3;
  animation: pulse 2s infinite;
  z-index: -1;
}

.map-node.vehicle {
  background: linear-gradient(135deg, var(--success-color), #00cc66);
  box-shadow: 0 0 15px rgba(0, 255, 136, 0.6);
}

.map-node.vehicle::before {
  background: var(--success-color);
}

.map-node.cloud {
  background: linear-gradient(135deg, var(--primary-color), #0099cc);
  box-shadow: 0 0 15px rgba(0, 212, 255, 0.6);
}

.map-node.cloud::before {
  background: var(--primary-color);
}

.map-node:hover {
  transform: translate(-50%, -50%) scale(1.4);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  z-index: 3;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.1;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

.node-icon {
  font-size: 1.2rem;
  color: white;
}

.node-tooltip {
  position: absolute;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  min-width: 200px;
}

.node-tooltip h4 {
  margin: 0 0 0.5rem 0;
  color: var(--text-color);
  font-size: 1rem;
}

.node-tooltip p {
  margin: 0.25rem 0;
  color: var(--text-color-secondary);
  font-size: 0.9rem;
}

/* 右侧云端区域 */
.right-column {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;
}

.cloud-section .section-title {
  color: var(--text-color);
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* 统计卡片 */
.stats-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
  padding: 0 1rem;
}

.stat-card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--gradient-secondary);
  opacity: 0.5;
  z-index: -1;
}

.stat-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 1px solid transparent;
  border-radius: 16px;
  background: linear-gradient(135deg, var(--primary-color), transparent, var(--accent-color)) border-box;
  -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: exclude;
  mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.2),
    0 0 20px var(--glow-color);
}

.stat-card:hover::after {
  opacity: 1;
}

.stat-icon {
  width: 70px;
  height: 70px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  color: white;
  position: relative;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

.stat-icon::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 18px;
  background: var(--gradient-primary);
  z-index: -1;
}

.stat-icon.vehicle { background: linear-gradient(135deg, var(--primary-color), var(--primary-dark)); }
.stat-icon.online { background: linear-gradient(135deg, var(--success-color), #00cc66); }
.stat-icon.risk-vehicle { background: linear-gradient(135deg, var(--warning-color), #cc7700); }
.stat-icon.risk-cloud { background: linear-gradient(135deg, var(--danger-color), #cc2222); }

.stat-info h3 {
  margin: 0 0 0.8rem 0;
  font-size: 1rem;
  color: var(--text-color-secondary);
  font-weight: 500;
  letter-spacing: 0.5px;
}

.stat-number {
  margin: 0;
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--text-color);
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 内容网格 */
.content-grid {
  display: grid;
  grid-template-columns: 1fr 350px 350px;
  gap: 2rem;
  margin-bottom: 2rem;
}

/* 地图区域 */
.map-section {
  grid-column: 1;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 1.5rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.section-header h2 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
}

.map-controls {
  display: flex;
  gap: 0.5rem;
}

.control-btn {
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem;
  cursor: pointer;
  font-size: 0.9rem;
}

.map-container {
  position: relative;
  height: 500px;
  background: var(--map-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
}

.map-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  position: relative;
}

.city-boundary {
  position: absolute;
  top: 20%;
  left: 20%;
  right: 20%;
  bottom: 20%;
  border: 2px dashed var(--primary-color);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(64, 158, 255, 0.1);
}

.city-boundary h3 {
  margin: 0;
  color: var(--primary-color);
  font-weight: 600;
}

.map-nodes {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.map-node {
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  transform: translate(-50%, -50%);
}

.map-node.vehicle {
  background: var(--primary-color);
  color: white;
}

.map-node.cloud {
  background: var(--success-color);
  color: white;
}

.map-node:hover {
  transform: translate(-50%, -50%) scale(1.2);
  z-index: 10;
}

.node-tooltip {
  position: absolute;
  background: var(--tooltip-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 20;
  min-width: 200px;
}

.node-tooltip h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  font-weight: 600;
}

.node-tooltip p {
  margin: 0.25rem 0;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

/* 统计面板 */
.left-stats, .right-stats {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.stats-panel {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 2rem;
  position: relative;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.stats-panel::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--gradient-secondary);
  opacity: 0.3;
  border-radius: 16px;
  z-index: -1;
}

.stats-panel:hover {
  border-color: var(--primary-color);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.stats-panel h3 {
  margin: 0 0 1.5rem 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-color);
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 图表控制 */
.chart-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  gap: 1rem;
}

.time-filter {
  background: var(--input-bg);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 0.5rem;
  color: var(--text-color);
}

.chart-type-buttons {
  display: flex;
  gap: 0.5rem;
}

.chart-btn {
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 0.6rem 1.2rem;
  cursor: pointer;
  font-size: 0.8rem;
  color: var(--text-color);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.chart-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.5s ease;
}

.chart-btn:hover {
  background: var(--hover-bg);
  border-color: var(--primary-color);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.chart-btn:hover::before {
  left: 100%;
}

.chart-btn.active {
  background: var(--gradient-primary);
  color: white;
  border-color: var(--primary-color);
  box-shadow: 0 0 20px var(--glow-color);
}

/* 图表容器 */
.chart-container {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chart-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--chart-bg);
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

/* 柱状图 */
.bar-chart {
  display: flex;
  align-items: end;
  justify-content: space-around;
  height: 80%;
  width: 90%;
  gap: 1rem;
}

.bar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}

.bar {
  width: 100%;
  min-height: 20px;
  border-radius: 4px 4px 0 0;
  margin-bottom: 0.5rem;
}

.bar-label {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

/* 饼图 */
.pie-chart, .pie-chart-small {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.pie-center {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-secondary);
}

.chart-legend {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

/* 折线图 */
.line-chart {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.line-placeholder {
  font-size: 1rem;
  color: var(--text-secondary);
}

/* 过滤按钮 */
.filter-buttons {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.filter-btn {
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 0.6rem 1.2rem;
  cursor: pointer;
  font-size: 0.8rem;
  color: var(--text-color);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.filter-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.5s ease;
}

.filter-btn:hover {
  background: var(--hover-bg);
  border-color: var(--primary-color);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.filter-btn:hover::before {
  left: 100%;
}

.filter-btn.active {
  background: var(--gradient-primary);
  color: white;
  border-color: var(--primary-color);
  box-shadow: 0 0 20px var(--glow-color);
}

/* 风险列表 */
.risk-list {
  max-height: 200px;
  overflow-y: auto;
}

.risk-item {
  display: grid;
  grid-template-columns: 40px 1fr 60px 80px 1fr 100px;
  gap: 0.5rem;
  padding: 0.75rem;
  border-bottom: 1px solid var(--border-color);
  font-size: 0.9rem;
  align-items: center;
}

.risk-item:last-child {
  border-bottom: none;
}

.risk-level {
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
  text-align: center;
}

.risk-level.high {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
}

.risk-level.medium {
  background: #fffbeb;
  color: #d97706;
  border: 1px solid #fed7aa;
}

.risk-level.low {
  background: #f0fdf4;
  color: #16a34a;
  border: 1px solid #bbf7d0;
}

/* 活动信息区域 */
.activity-section {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 1.5rem;
}

.activity-section h2 {
  margin: 0 0 1rem 0;
  font-size: 1.2rem;
  font-weight: 600;
}

.activity-tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

.tab-btn {
  background: none;
  border: none;
  padding: 1rem 1.5rem;
  cursor: pointer;
  color: var(--text-secondary);
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease;
}

.tab-btn:hover {
  color: var(--text-color);
}

.tab-btn.active {
  color: var(--primary-color);
  border-bottom-color: var(--primary-color);
  font-weight: 600;
}

/* 活动表格 */
.activity-table {
  overflow-x: auto;
}

.activity-table table {
  width: 100%;
  border-collapse: collapse;
}

.activity-table th,
.activity-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid var(--border-color);
}

.activity-table th {
  background: var(--table-header-bg);
  font-weight: 600;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.activity-table td {
  font-size: 0.9rem;
}

.activity-table tr:hover {
  background: var(--hover-bg);
}

/* 占位内容 */
.placeholder-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  text-align: center;
}

.placeholder-content h2 {
  margin: 0 0 1rem 0;
  color: var(--text-color);
}

.placeholder-content p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 1.1rem;
}

/* 响应式设计 */
@media (max-width: 1400px) {
  .three-column-layout {
    grid-template-columns: 1fr 1.5fr 1fr;
    gap: 1.5rem;
    padding: 1.5rem;
  }
  
  .content-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .left-stats, .right-stats {
    flex-direction: row;
    gap: 1rem;
  }
  
  .stats-panel {
    flex: 1;
  }
}

@media (max-width: 1200px) {
  .three-column-layout {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    height: auto;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  
  .main-nav {
    gap: 0.5rem;
  }
  
  .nav-item {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }
  
  .map-container {
    height: 400px;
  }
}

@media (max-width: 768px) {
  .dashboard-header {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
  
  .main-nav {
    margin-left: 0;
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .nav-item {
    padding: 0.5rem 0.8rem;
    font-size: 0.8rem;
  }
  
  .main-content {
    padding: 1rem;
  }
  
  .stats-cards {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .three-column-layout {
    padding: 1rem;
    gap: 1rem;
  }
  
  .stats-panel {
    padding: 1.5rem;
  }
  
  .map-container {
    height: 300px;
  }
  
  .left-stats, .right-stats {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .dashboard-header {
    padding: 0.5rem;
  }
  
  .header-title {
    font-size: 1.2rem;
  }
  
  .stat-card {
    padding: 1rem;
  }
  
  .stats-panel {
    padding: 1rem;
  }
  
  .three-column-layout {
    padding: 0.5rem;
  }
}

/* CSS变量定义 - 基于Figma蓝色科技风格 */
:root {
  --primary-color: #00d4ff;
  --primary-dark: #0099cc;
  --secondary-color: #4a90e2;
  --accent-color: #00ffff;
  --success-color: #00ff88;
  --warning-color: #ffaa00;
  --danger-color: #ff4444;
  --background-color: #0a0e1a;
  --surface-color: #1a1f2e;
  --card-bg: rgba(26, 31, 46, 0.8);
  --text-color: #ffffff;
  --text-color-secondary: #8892b0;
  --border-color: rgba(0, 212, 255, 0.2);
  --hover-bg: rgba(0, 212, 255, 0.1);
  --nav-bg: rgba(10, 14, 26, 0.95);
  --glow-color: rgba(0, 212, 255, 0.3);
  --gradient-primary: linear-gradient(135deg, #00d4ff 0%, #4a90e2 100%);
  --gradient-secondary: linear-gradient(135deg, #1a1f2e 0%, #2a3441 100%);
  
  /* 兼容旧变量名 */
  --bg-color: var(--background-color);
  --text-secondary: var(--text-color-secondary);
  --header-bg: var(--surface-color);
  --nav-bg: var(--nav-bg);
  --button-bg: var(--surface-color);
  --input-bg: var(--surface-color);
  --chart-bg: var(--surface-color);
  --map-bg: var(--surface-color);
  --tooltip-bg: var(--surface-color);
  --table-header-bg: var(--surface-color);
}

/* 浅色主题 */
[data-theme="light"] {
  --primary-color: #0066cc;
  --primary-dark: #004499;
  --secondary-color: #4a90e2;
  --accent-color: #00aaff;
  --success-color: #00aa66;
  --warning-color: #ff8800;
  --danger-color: #cc3333;
  --background-color: #f0f4f8;
  --surface-color: #ffffff;
  --card-bg: rgba(255, 255, 255, 0.9);
  --text-color: #1a1f2e;
  --text-color-secondary: #64748b;
  --border-color: rgba(0, 102, 204, 0.2);
  --hover-bg: rgba(0, 102, 204, 0.05);
  --nav-bg: rgba(255, 255, 255, 0.95);
  --glow-color: rgba(0, 102, 204, 0.2);
  --gradient-primary: linear-gradient(135deg, #0066cc 0%, #4a90e2 100%);
  --gradient-secondary: linear-gradient(135deg, #ffffff 0%, #f0f4f8 100%);
  
  /* 兼容旧变量名 */
  --bg-color: var(--background-color);
  --text-secondary: var(--text-color-secondary);
  --header-bg: var(--surface-color);
  --button-bg: var(--surface-color);
  --input-bg: var(--surface-color);
  --chart-bg: var(--surface-color);
  --map-bg: var(--surface-color);
  --tooltip-bg: var(--surface-color);
  --table-header-bg: var(--surface-color);
}
</style>