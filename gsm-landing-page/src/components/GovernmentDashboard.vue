<template>
  <div class="government-dashboard" :data-theme="isDark ? 'dark' : 'light'">
    <!-- Header 导航栏 -->
    <DashboardHeader
      :is-dark="isDark"
      :main-menus="mainMenus"
      :active-main-menu="activeMainMenu"
      user-name="政府管理员"
      @toggle-theme="toggleTheme"
      @menu-select="setActiveMainMenu"
      @logout="logout"
    />

    <div class="dashboard-body">
      <!-- 主内容区域 - 无二级菜单 -->
      <main class="main-content">
        <!-- 综合概览页面 -->
        <div v-if="activeMainMenu === 'overview'" class="overview-content">
          <!-- 上栏：顶部统计卡片 -->
          <div class="top-section">
            <div class="stats-cards">
              <!-- 接入车辆总数 -->
              <div class="stat-card" :title="'当前平台接入的车辆总数：' + stats.totalVehicles.toLocaleString() + '辆'">
                <div class="stat-icon vehicle">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" fill="currentColor"/>
                  </svg>
                </div>
                <div class="stat-info">
                  <h3>接入车辆总数</h3>
                  <p class="stat-number">{{ stats.totalVehicles.toLocaleString() }}</p>
                </div>
              </div>

              <!-- 在线车辆总数 -->
              <div class="stat-card" :title="'当前在线车辆数量：' + stats.onlineVehicles.toLocaleString() + '辆，在线率：' + ((stats.onlineVehicles / stats.totalVehicles) * 100).toFixed(1) + '%'">
                <div class="stat-icon online">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" fill="#10B981"/>
                    <path d="m9 12 2 2 4-4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div class="stat-info">
                  <h3>在线车辆总数</h3>
                  <p class="stat-number">{{ stats.onlineVehicles.toLocaleString() }}</p>
                </div>
              </div>

              <!-- 累计车端风险总数 -->
              <div class="stat-card" :title="'车端累计发现的安全风险总数：' + stats.vehicleRisks.toLocaleString() + '个'">
                <div class="stat-icon risk-vehicle">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" stroke="#F59E0B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="#F59E0B"/>
                  </svg>
                </div>
                <div class="stat-info">
                  <h3>累计车端风险总数</h3>
                  <p class="stat-number">{{ stats.vehicleRisks.toLocaleString() }}</p>
                </div>
              </div>

              <!-- 车端累计上报事件 -->
              <div class="stat-card" :title="'车端累计上报的安全事件总数：' + stats.vehicleEvents.toLocaleString() + '个'">
                <div class="stat-icon event-vehicle">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div class="stat-info">
                  <h3>车端累计上报事件</h3>
                  <p class="stat-number">{{ stats.vehicleEvents.toLocaleString() }}</p>
                </div>
              </div>

              <!-- 累计云端风险总数 -->
              <div class="stat-card" :title="'云端累计发现的安全风险总数：' + stats.cloudRisks.toLocaleString() + '个'">
                <div class="stat-icon risk-cloud">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" fill="currentColor"/>
                  </svg>
                </div>
                <div class="stat-info">
                  <h3>累计云端风险总数</h3>
                  <p class="stat-number">{{ stats.cloudRisks.toLocaleString() }}</p>
                </div>
              </div>

              <!-- 云端累计上报事件 -->
              <div class="stat-card" :title="'云端累计上报的安全事件总数：' + stats.cloudEvents.toLocaleString() + '个'">
                <div class="stat-icon event-cloud">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" fill="currentColor"/>
                    <circle cx="12" cy="14" r="2" fill="white"/>
                    <path d="M12 10v2M12 16v2" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                  </svg>
                </div>
                <div class="stat-info">
                  <h3>云端累计上报事件</h3>
                  <p class="stat-number">{{ stats.cloudEvents.toLocaleString() }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 下栏：左中右三栏布局 -->
          <div class="bottom-section">
            <div class="three-column-layout">
            <!-- 左侧车端区域 -->
            <div class="left-column vehicle-section">
              
              <!-- 车辆信息统计 -->
              <div class="stats-panel">
                <h3>车辆信息统计</h3>
                <div class="chart-container">
                  <div class="chart-placeholder">
                    <div class="pie-chart">
                      <div class="chart-legend">
                        <div class="legend-item">
                          <span class="legend-color" style="background: #8B4513"></span>
                          <span>M类 (45%)</span>
                        </div>
                        <div class="legend-item">
                          <span class="legend-color" style="background: #4B0082"></span>
                          <span>N类 (30%)</span>
                        </div>
                        <div class="legend-item">
                          <span class="legend-color" style="background: #B8860B"></span>
                          <span>O类 (15%)</span>
                        </div>
                        <div class="legend-item">
                          <span class="legend-color" style="background: #8B0000"></span>
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
                <div class="chart-controls compact">
                  <select v-model="vehicleTimeFilter" class="time-filter compact">
                    <option value="day">日</option>
                    <option value="week">周</option>
                    <option value="month">月</option>
                    <option value="year">年</option>
                  </select>
                  <div class="chart-type-buttons compact">
                    <button
                      v-for="type in chartTypes"
                      :key="type.key"
                      :class="['chart-btn compact', { active: vehicleChartType === type.key }]"
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

              <!-- 车端风险事件 -->
              <div class="stats-panel compact">
                <h3>车端风险事件</h3>
                <div class="risk-list compact">
                  <div
                    class="risk-item"
                    v-for="risk in vehicleRisks.slice(0, 5)"
                    :key="risk.id"
                    :class="[
                      'risk-item',
                      { 'risk-high-blink': risk.level === 'high' },
                      { 'risk-medium-pulse': risk.level === 'medium' }
                    ]"
                    :title="`风险等级：${risk.levelText}，处理阶段：${risk.stage}，事件：${risk.event}`"
                  >
                    <span class="risk-level-indicator" :class="risk.level"></span>
                    <span class="risk-vin">{{ risk.vin }}</span>
                    <span class="risk-event">{{ risk.event }}</span>
                    <span class="risk-time">{{ risk.time.split(' ')[1] }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 中间地图区域 -->
            <div class="center-column map-section">
              <div class="section-header">
                <h3>地理信息监控</h3>
                <div class="map-controls">
                  <button class="control-btn" @click="zoomIn" title="放大">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
                      <path d="m21 21-4.35-4.35M11 8v6M8 11h6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                  <button class="control-btn" @click="zoomOut" title="缩小">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
                      <path d="m21 21-4.35-4.35M8 11h6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                  <button class="control-btn" @click="resetView" title="重置视图">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
                      <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
              <div class="map-container" ref="mapContainer">
                <LMap
                  ref="mapRef"
                  :zoom="mapZoom"
                  :center="mapCenter"
                  style="height: 100%; width: 100%;"
                  :options="{ zoomControl: false }"
                >
                  <!-- 动态瓦片层 -->
                  <LTileLayer
                    :key="isDark ? 'dark' : 'light'"
                    :url="getCurrentTileLayerUrl()"
                    :attribution="getCurrentTileLayerAttribution()"
                    :maxZoom="19"
                  />

                  <!-- 地理围栏 -->
                  <LPolygon
                    :lat-lngs="geoFenceData.coordinates"
                    :color="geoFenceData.style.color"
                    :weight="geoFenceData.style.weight"
                    :opacity="geoFenceData.style.opacity"
                    :fill-color="geoFenceData.style.fillColor"
                    :fill-opacity="geoFenceData.style.fillOpacity"
                  >
                    <LPopup>
                      <div class="fence-popup">
                        <h4>{{ geoFenceData.name }}</h4>
                        <p>监管区域范围</p>
                        <p>节点总数: {{ mapNodes.length }}</p>
                        <p>在线节点: {{ mapNodes.filter(n => n.status === '在线').length }}</p>
                      </div>
                    </LPopup>
                  </LPolygon>

                  <!-- 地图节点标记 -->
                  <LMarker
                    v-for="node in mapNodes"
                    :key="node.id"
                    :lat-lng="[node.lat, node.lng]"
                    :icon="createCustomIcon(node.type, node.riskLevel)"
                    @click="selectNode(node)"
                  >
                    <LPopup>
                      <div class="node-popup">
                        <h4>{{ node.name }}</h4>
                        <p><strong>类型:</strong> {{ node.type === 'vehicle' ? '车端节点' : '云端节点' }}</p>
                        <p><strong>状态:</strong>
                          <span :class="['status', node.status === '在线' ? 'online' : 'offline']">
                            {{ node.status }}
                          </span>
                        </p>
                        <p><strong>风险等级:</strong>
                          <span :class="['risk-level', node.riskLevel]">
                            {{ node.riskLevel }}
                          </span>
                        </p>
                        <p><strong>坐标:</strong> {{ node.lat.toFixed(4) }}, {{ node.lng.toFixed(4) }}</p>
                      </div>
                    </LPopup>
                  </LMarker>
                </LMap>
              </div>

              <!-- 风险预警信息 - 移动到地图下方 -->
              <div class="activity-section">
                <div class="activity-tabs">
                  <button
                    :class="['tab-btn', { active: activeActivityTab === 'vehicle' }]"
                    @click="activeActivityTab = 'vehicle'"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" fill="currentColor"/>
                    </svg>
                    车端风险预警
                  </button>
                  <button
                    :class="['tab-btn', { active: activeActivityTab === 'cloud' }]"
                    @click="activeActivityTab = 'cloud'"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" fill="currentColor"/>
                    </svg>
                    云端风险预警
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

            <!-- 右侧云端区域 -->
            <div class="right-column cloud-section">
              
              <!-- 企业信息统计 -->
              <div class="stats-panel">
                <h3>企业信息统计</h3>
                <div class="chart-container">
                  <div class="chart-placeholder">
                    <div class="pie-chart">
                      <div class="chart-legend">
                        <div class="legend-item">
                          <span class="legend-color" style="background: #6B46C1"></span>
                          <span>地图服务商 (35%)</span>
                        </div>
                        <div class="legend-item">
                          <span class="legend-color" style="background: #DC2626"></span>
                          <span>汽车企业 (40%)</span>
                        </div>
                        <div class="legend-item">
                          <span class="legend-color" style="background: #D97706"></span>
                          <span>智驾方案提供商 (15%)</span>
                        </div>
                        <div class="legend-item">
                          <span class="legend-color" style="background: #7C2D12"></span>
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
                <div class="chart-controls compact">
                  <select v-model="cloudTimeFilter" class="time-filter compact">
                    <option value="day">日</option>
                    <option value="week">周</option>
                    <option value="month">月</option>
                    <option value="year">年</option>
                  </select>
                  <div class="chart-type-buttons compact">
                    <button
                      v-for="type in chartTypes"
                      :key="type.key"
                      :class="['chart-btn compact', { active: cloudChartType === type.key }]"
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

              <!-- 云端风险事件 -->
              <div class="stats-panel compact">
                <h3>云端风险事件</h3>
                <div class="risk-list compact">
                  <div
                    class="risk-item"
                    v-for="risk in cloudRisks.slice(0, 5)"
                    :key="risk.id"
                    :class="[
                      'risk-item',
                      { 'risk-high-blink': risk.level === 'high' },
                      { 'risk-medium-pulse': risk.level === 'medium' }
                    ]"
                    :title="`风险等级：${risk.levelText}，操作类型：${risk.operation}，事件：${risk.event}`"
                  >
                    <span class="risk-level-indicator" :class="risk.level"></span>
                    <span class="risk-company">{{ risk.company }}</span>
                    <span class="risk-event">{{ risk.event }}</span>
                    <span class="risk-time">{{ risk.time.split(' ')[1] }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
          <!-- 结束 bottom-section -->
        </div>
        <!-- 结束 overview-content -->

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
import { ref, reactive, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { LMap, LTileLayer, LMarker, LPopup, LPolygon } from '@vue-leaflet/vue-leaflet'
import DashboardHeader from './common/DashboardHeader.vue'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// 修复Leaflet默认图标问题
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

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
  vehicleEvents: 3456,  // 新增：车端累计上报事件
  cloudRisks: 856,
  cloudEvents: 2134     // 新增：云端累计上报事件
})

// 地图配置
const mapCenter = ref([39.114334, 117.220421]) // 天津和平区中心坐标
const mapZoom = ref(13)

// 地理围栏数据 - 和平区边界
const geoFenceData = ref({
  name: '和平区监管区域',
  coordinates: [
    [39.146175, 117.264873],
    [39.146175, 117.168516],
    [39.068985, 117.168516],
    [39.068985, 117.264873]
  ],
  style: {
    color: isDark.value ? '#60a5fa' : '#3b82f6',
    weight: 2,
    opacity: 0.8,
    fillColor: isDark.value ? 'rgba(96, 165, 250, 0.1)' : 'rgba(59, 130, 246, 0.1)',
    fillOpacity: 0.5
  }
})

// 地图节点数据 - 在和平区范围内生成随机坐标
const generateRandomNodes = () => {
  const nodes = []
  const minLat = 39.068985
  const maxLat = 39.146175
  const minLng = 117.168516
  const maxLng = 117.264873

  const getRandomInRange = (min, max) => Math.random() * (max - min) + min

  // 生成车端节点
  for (let i = 1; i <= 8; i++) {
    nodes.push({
      id: `vehicle_${i}`,
      name: `车端节点 ${i}`,
      type: 'vehicle',
      lat: getRandomInRange(minLat, maxLat),
      lng: getRandomInRange(minLng, maxLng),
      status: Math.random() > 0.2 ? '在线' : '离线',
      riskLevel: ['低', '中', '高'][Math.floor(Math.random() * 3)]
    })
  }

  // 生成云端节点
  for (let i = 1; i <= 5; i++) {
    nodes.push({
      id: `cloud_${i}`,
      name: `云端节点 ${i}`,
      type: 'cloud',
      lat: getRandomInRange(minLat, maxLat),
      lng: getRandomInRange(minLng, maxLng),
      status: Math.random() > 0.1 ? '在线' : '离线',
      riskLevel: ['低', '中', '高'][Math.floor(Math.random() * 3)]
    })
  }

  return nodes
}

const mapNodes = ref(generateRandomNodes())

// 地图实例引用
const mapRef = ref(null)

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
const vehicleChartType = ref('pie')
const vehicleRiskFilter = ref('日')

// 云端相关状态
const cloudTimeFilter = ref('day')
const cloudChartType = ref('pie')
const cloudRiskFilter = ref('日')

// 时间过滤器
const timeFilters = ['年', '月', '日']

// 活动日志标签页
const activeActivityTab = ref('vehicle')

// 过滤器状态
const vehicleRiskFilters = reactive({
  level: '',
  stage: '',
  vin: ''
})

const cloudRiskFilters = reactive({
  level: '',
  stage: '',
  company: ''
})

// 风险数据 - 使用专业色彩搭配
const vehicleRiskData = [
  { stage: '收集', value: 60, color: '#8B4513' },  // 暗棕色
  { stage: '存储', value: 80, color: '#4B0082' },  // 暗紫色
  { stage: '传输', value: 45, color: '#B8860B' }   // 暗金色
]

const cloudRiskData = [
  { stage: '收集', value: 70, color: '#8B4513' },  // 暗棕色
  { stage: '存储', value: 55, color: '#4B0082' },  // 暗紫色
  { stage: '传输', value: 65, color: '#B8860B' },  // 暗金色
  { stage: '加工', value: 40, color: '#8B0000' },  // 暗红色
  { stage: '提供', value: 30, color: '#2F4F4F' },  // 暗灰绿色
  { stage: '公开', value: 20, color: '#556B2F' },  // 暗橄榄绿
  { stage: '销毁', value: 15, color: '#483D8B' }   // 暗蓝紫色
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
  if (mapRef.value?.leafletObject) {
    mapRef.value.leafletObject.zoomIn()
  }
}

const zoomOut = () => {
  if (mapRef.value?.leafletObject) {
    mapRef.value.leafletObject.zoomOut()
  }
}

const resetView = () => {
  if (mapRef.value?.leafletObject) {
    mapRef.value.leafletObject.setView(mapCenter.value, mapZoom.value)
  }
}

// 获取当前地图瓦片层URL（基于全局主题状态）
const getCurrentTileLayerUrl = () => {
  if (isDark.value) {
    return 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
  } else {
    return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  }
}

// 获取当前地图瓦片层属性（基于全局主题状态）
const getCurrentTileLayerAttribution = () => {
  if (isDark.value) {
    return '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attribution">CARTO</a>'
  } else {
    return '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }
}

// 监听全局主题变化，更新地理围栏样式
watch(isDark, (newIsDark) => {
  if (newIsDark) {
    geoFenceData.value.style.color = '#60a5fa'
    geoFenceData.value.style.fillColor = 'rgba(96, 165, 250, 0.1)'
  } else {
    geoFenceData.value.style.color = '#3b82f6'
    geoFenceData.value.style.fillColor = 'rgba(59, 130, 246, 0.1)'
  }
})

// 创建自定义图标
const createCustomIcon = (type: string, riskLevel: string) => {
  const color = type === 'vehicle' ? '#00ff88' : '#00d4ff'
  const size = riskLevel === '高' ? 30 : riskLevel === '中' ? 25 : 20
  
  return L.divIcon({
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border: 2px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 12px;
        font-weight: bold;
      ">
        ${type === 'vehicle' ? '🚗' : '☁️'}
      </div>
    `,
    className: 'custom-marker',
    iconSize: [size, size],
    iconAnchor: [size/2, size/2]
  })
}

const logout = () => {
  router.push('/')
}

// 过滤器方法
const clearVehicleFilters = () => {
  vehicleRiskFilters.level = ''
  vehicleRiskFilters.stage = ''
  vehicleRiskFilters.vin = ''
}

const clearCloudFilters = () => {
  cloudRiskFilters.level = ''
  cloudRiskFilters.stage = ''
  cloudRiskFilters.company = ''
}

// 过滤后的风险数据
const filteredVehicleRisks = computed(() => {
  return vehicleRisks.value.filter(risk => {
    const levelMatch = !vehicleRiskFilters.level || risk.level === vehicleRiskFilters.level
    const stageMatch = !vehicleRiskFilters.stage || risk.stage === vehicleRiskFilters.stage
    const vinMatch = !vehicleRiskFilters.vin || risk.vin.toLowerCase().includes(vehicleRiskFilters.vin.toLowerCase())
    return levelMatch && stageMatch && vinMatch
  })
})

const filteredCloudRisks = computed(() => {
  return cloudRisks.value.filter(risk => {
    const levelMatch = !cloudRiskFilters.level || risk.level === cloudRiskFilters.level
    const stageMatch = !cloudRiskFilters.stage || risk.operation === cloudRiskFilters.stage
    const companyMatch = !cloudRiskFilters.company || risk.company.toLowerCase().includes(cloudRiskFilters.company.toLowerCase())
    return levelMatch && stageMatch && companyMatch
  })
})

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
  position: absolute;
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
  width: 100%;
  margin: 0;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
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

.justify-center {
  justify-content: center;
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
  transition-duration: 150ms;
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

.text-xl {
  font-size: 1.25rem;
  line-height: 1.75rem;
}

.font-bold {
  font-weight: 700;
}

.text-white {
  color: rgb(255 255 255);
}

.text-xs {
  font-size: 0.75rem;
  line-height: 1rem;
}

.text-slate-400 {
  color: #94a3b8;
}

.header-subtitle {
  font-size: 0.75rem;
  line-height: 1rem;
  color: #94a3b8;
  margin: 0;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
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
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  flex: 1;
  margin: 0 2rem;
}



.nav-item {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border-color);
  padding: 1rem 2rem;
  cursor: pointer;
  color: var(--text-color-secondary);
  border-radius: 16px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(15px);
  font-weight: 600;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.nav-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.15), transparent);
  transition: left 0.6s ease;
}

.nav-item::after {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border-radius: 18px;
  background: var(--gradient-primary);
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: -1;
}

.nav-item:hover {
  background: var(--hover-bg);
  border-color: var(--primary-color);
  color: var(--primary-color);
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
}

.nav-item:hover::before {
  left: 100%;
}

.nav-item:hover::after {
  opacity: 0.3;
}

.nav-item.active {
  background: var(--gradient-primary);
  border-color: var(--primary-color);
  color: white;
  font-weight: 700;
  box-shadow: 0 0 30px var(--glow-color);
  transform: translateY(-2px);
}

.nav-item.active::before {
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
}

.nav-item.active::after {
  opacity: 0.6;
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

/* 概览内容区 */
.overview-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 100%;
  box-sizing: border-box;
}

/* 上栏布局 - 统计卡片区域 */
.top-section {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 0rem;
}

/* 下栏布局 - 三栏区域 + 活动日志 */
.bottom-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  flex: 1;
  position: relative;
  width: 100%;
  box-sizing: border-box;
}

/* 三列布局 */
.three-column-layout {
  display: grid;
  grid-template-columns: 380px 1fr 380px;
  gap: 1.5rem;
  min-height: calc(100vh - 400px);
  position: relative;
  align-items: start;
  width: 100%;
  box-sizing: border-box;
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
  gap: 1.2rem;
  position: relative;
  width: 100%;
  box-sizing: border-box;
  grid-column: 1;
  grid-row: 1;
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
  grid-column: 2;
  grid-row: 1;
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
  margin-bottom: 1rem;
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

/* 地图区域标题 */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.section-header h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-color);
}

/* 地理围栏弹窗样式 */
.fence-popup h4 {
  margin: 0 0 0.5rem 0;
  color: var(--primary-color);
  font-size: 1rem;
}

.fence-popup p {
  margin: 0.25rem 0;
  font-size: 0.9rem;
  color: var(--text-color);
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
  gap: 1.2rem;
  position: relative;
  width: 100%;
  box-sizing: border-box;
  grid-column: 3;
  grid-row: 1;
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
  grid-template-columns: repeat(6, 1fr);
  gap: 1rem;
  margin-bottom: 0rem;
  padding: 0;
  width: 100%;
}

.stat-card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  padding: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(15px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  min-height: 90px;
  width: 100%;
  box-sizing: border-box;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--gradient-secondary);
  opacity: 0.3;
  z-index: -1;
}

.stat-card::after {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border-radius: 22px;
  background: var(--gradient-primary);
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: -2;
}

.stat-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.25),
    0 0 30px var(--glow-color);
  border-color: var(--primary-color);
}

.stat-card:hover::after {
  opacity: 0.6;
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
  position: relative;
  flex-shrink: 0;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.stat-icon::before {
  content: '';
  position: absolute;
  inset: -3px;
  border-radius: 23px;
  background: var(--gradient-primary);
  z-index: -1;
  opacity: 0.8;
}

.stat-icon::after {
  content: '';
  position: absolute;
  inset: -6px;
  border-radius: 26px;
  background: var(--gradient-primary);
  z-index: -2;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.stat-card:hover .stat-icon {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.3);
}

.stat-card:hover .stat-icon::after {
  opacity: 0.3;
}

.stat-icon.vehicle {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
  box-shadow: 0 12px 24px rgba(0, 212, 255, 0.4);
}
.stat-icon.online {
  background: linear-gradient(135deg, var(--success-color), #00cc66);
  box-shadow: 0 12px 24px rgba(0, 255, 136, 0.4);
}
.stat-icon.risk-vehicle {
  background: linear-gradient(135deg, var(--warning-color), #cc7700);
  box-shadow: 0 12px 24px rgba(255, 170, 0, 0.4);
}
.stat-icon.event-vehicle {
  background: linear-gradient(135deg, #8B5CF6, #7C3AED);
  box-shadow: 0 12px 24px rgba(139, 92, 246, 0.4);
}
.stat-icon.risk-cloud {
  background: linear-gradient(135deg, var(--danger-color), #cc2222);
  box-shadow: 0 12px 24px rgba(255, 68, 68, 0.4);
}
.stat-icon.event-cloud {
  background: linear-gradient(135deg, #EC4899, #DB2777);
  box-shadow: 0 12px 24px rgba(236, 72, 153, 0.4);
}

.stat-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stat-info h3 {
  margin: 0;
  font-size: 0.9rem;
  color: var(--text-color-secondary);
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  opacity: 0.9;
  transition: color 0.3s ease;
  line-height: 1.2;
}

.stat-card:hover .stat-info h3 {
  color: var(--primary-color);
}

.stat-number {
  margin: 0;
  font-size: 2.2rem;
  font-weight: 800;
  color: var(--text-color);
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  transition: all 0.3s ease;
}

.stat-card:hover .stat-number {
  transform: scale(1.05);
  filter: drop-shadow(0 2px 4px rgba(0, 212, 255, 0.3));
}

.stat-trend {
  font-size: 0.9rem;
  color: var(--text-color-secondary);
  font-weight: 500;
  opacity: 0.8;
}

/* 内容网格 */
.content-grid {
  display: grid;
  grid-template-columns: 1fr 350px 350px;
  gap: 2rem;
  margin-bottom: 2rem;
}

/* 地图区域 */
.content-grid .map-section {
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
  gap: 2rem;
}

.stats-panel {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  padding: 0.5rem;
  position: relative;
  backdrop-filter: blur(15px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

/* 紧凑版统计面板 */
.stats-panel.compact {
  padding: 1.2rem;
  border-radius: 12px;
}

.stats-panel::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--gradient-secondary);
  opacity: 0.2;
  border-radius: 20px;
  z-index: -1;
}

.stats-panel::after {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border-radius: 22px;
  background: var(--gradient-primary);
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: -2;
}

.stats-panel:hover {
  border-color: var(--primary-color);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.2);
  transform: translateY(-4px);
}

.stats-panel:hover::after {
  opacity: 0.4;
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

/* 紧凑版图表控制 */
.chart-controls.compact {
  margin-bottom: 0.5rem;
  gap: 0.5rem;
}

.time-filter {
  background: var(--input-bg);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 0.5rem;
  color: var(--text-color);
}

/* 紧凑版时间过滤器 */
.time-filter.compact {
  padding: 0.3rem 0.6rem;
  font-size: 0.8rem;
  border-radius: 4px;
}

.chart-type-buttons {
  display: flex;
  gap: 0.5rem;
}

/* 紧凑版图表按钮组 */
.chart-type-buttons.compact {
  gap: 0.3rem;
}

.chart-btn {
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 0.8rem 1.5rem;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-color);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
}

/* 紧凑版图表按钮 */
.chart-btn.compact {
  padding: 0.4rem 0.8rem;
  font-size: 0.8rem;
  border-radius: 6px;
  font-weight: 500;
}

.chart-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.chart-btn:hover {
  background: var(--hover-bg);
  border-color: var(--primary-color);
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.chart-btn:hover::before {
  left: 100%;
}

.chart-btn.active {
  background: var(--gradient-primary);
  color: white;
  border-color: var(--primary-color);
  box-shadow: 0 0 25px var(--glow-color);
  transform: translateY(-1px);
}

.chart-btn.active::before {
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
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

/* 紧凑版风险列表 */
.risk-list.compact {
  max-height: 150px;
}

.risk-item {
  display: grid;
  grid-template-columns: 40px 1fr 60px 80px 1fr 100px;
  gap: 0.5rem;
  padding: 0.75rem;
  border-bottom: 1px solid var(--border-color);
  font-size: 0.9rem;
  align-items: center;
  color: var(--text-color);
}

/* 紧凑版风险项目 - 简化布局 */
.risk-list.compact .risk-item {
  display: grid;
  grid-template-columns: 12px 1fr 1fr 60px;
  gap: 0.5rem;
  padding: 0.4rem 0.5rem;
  font-size: 0.8rem;
}

/* 风险等级指示器 */
.risk-level-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
}

.risk-level-indicator.high {
  background: #ef4444;
  box-shadow: 0 0 6px rgba(239, 68, 68, 0.5);
}

.risk-level-indicator.medium {
  background: #f59e0b;
  box-shadow: 0 0 6px rgba(245, 158, 11, 0.5);
}

.risk-level-indicator.low {
  background: #10b981;
  box-shadow: 0 0 6px rgba(16, 185, 129, 0.5);
}

.risk-item:last-child {
  border-bottom: none;
}

.risk-item span {
  color: var(--text-color);
}

.risk-id {
  color: var(--text-color-secondary);
  font-weight: 500;
}

.risk-vin,
.risk-company {
  color: var(--text-color);
  font-weight: 500;
}

.risk-stage,
.risk-operation,
.risk-event {
  color: var(--text-color-secondary);
}

.risk-time {
  color: var(--text-color-secondary);
  font-size: 0.85rem;
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
    grid-template-columns: 320px 0.8fr 320px;
    gap: 1.5rem;
    padding: 1.5rem;
  }
  
  .left-column, .right-column {
    max-width: 320px;
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
  
  /* 1400 以下依然保持四卡单行，利用最小宽度挤压换行 */
  .stats-cards {
    grid-template-columns: repeat(4, minmax(200px, 1fr));
  }
}

@media (max-width: 1200px) {
  .three-column-layout {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    height: auto;
  }
  
  .stats-cards {
    grid-template-columns: 1fr;
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

/* moved theme variables to src/assets/theme.css */

/* 地图弹窗样式 */
.node-popup {
  min-width: 200px;
  padding: 0.5rem;
}

.node-popup h4 {
  margin: 0 0 0.5rem 0;
  color: var(--text-color);
  font-size: 1rem;
  font-weight: 600;
}

.node-popup p {
  margin: 0.25rem 0;
  font-size: 0.9rem;
  color: var(--text-color-secondary);
}

.node-popup .status.online {
  color: var(--success-color);
  font-weight: 600;
}

.node-popup .status.offline {
  color: var(--danger-color);
  font-weight: 600;
}

.node-popup .risk-level {
  font-weight: 600;
}

.node-popup .risk-level.低 {
  color: var(--success-color);
}

.node-popup .risk-level.中 {
  color: var(--warning-color);
}

.node-popup .risk-level.高 {
  color: var(--danger-color);
}

/* 自定义标记样式 */
.custom-marker {
  background: transparent !important;
  border: none !important;
}

/* Leaflet 弹窗样式覆盖 */
.leaflet-popup-content-wrapper {
  background: var(--card-bg) !important;
  border: 1px solid var(--border-color) !important;
  border-radius: 8px !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
}

.leaflet-popup-tip {
  background: var(--card-bg) !important;
  border: 1px solid var(--border-color) !important;
}

.leaflet-popup-close-button {
  color: var(--text-color) !important;
  font-size: 18px !important;
  font-weight: bold !important;
}

.leaflet-popup-close-button:hover {
  color: var(--primary-color) !important;
}

/* 暗色主题下的额外样式改进 - 参考着陆页和登录页风格 */
[data-theme="dark"] .section-title,
[data-theme="dark"] .vehicle-section .section-title,
[data-theme="dark"] .cloud-section .section-title {
  color: #f8fafc !important;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  font-weight: 600;
}

[data-theme="dark"] .stat-card {
  background: rgba(15, 23, 42, 0.95) !important;
  border: 1px solid rgba(71, 85, 105, 0.4) !important;
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.6),
    0 0 0 1px rgba(148, 163, 184, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

[data-theme="dark"] .stat-card:hover {
  border-color: #60a5fa !important;
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.7),
    0 0 30px rgba(96, 165, 250, 0.3),
    0 0 0 1px rgba(148, 163, 184, 0.2);
  transform: translateY(-8px) scale(1.02);
}

[data-theme="dark"] .stat-info h3 {
  color: #cbd5e1 !important;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

[data-theme="dark"] .stat-number {
  color: #f8fafc !important;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  background-clip: text !important;
}

[data-theme="dark"] .stat-trend {
  color: #94a3b8 !important;
  font-weight: 500;
}

[data-theme="dark"] .city-boundary h3 {
  color: #60a5fa !important;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  font-weight: 600;
}

[data-theme="dark"] .section-header h2 {
  color: #f8fafc !important;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

[data-theme="dark"] .node-tooltip h4 {
  color: #f8fafc !important;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

[data-theme="dark"] .node-tooltip p {
  color: #cbd5e1 !important;
}

[data-theme="dark"] .stats-panel {
  background: rgba(15, 23, 42, 0.95) !important;
  border: 1px solid rgba(71, 85, 105, 0.4) !important;
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.6),
    0 0 0 1px rgba(148, 163, 184, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

/* 统计面板内通用文本颜色优化 */
[data-theme="dark"] .stats-panel p,
[data-theme="dark"] .stats-panel span,
[data-theme="dark"] .stats-panel li,
[data-theme="dark"] .stats-panel label,
[data-theme="dark"] .stats-panel .stat-value,
[data-theme="dark"] .stats-panel .stat-desc,
[data-theme="dark"] .stats-panel .chart-value,
[data-theme="dark"] .stats-panel .data-label {
  color: #cbd5e1 !important;
  font-weight: 500;
}

[data-theme="dark"] .stats-panel .muted,
[data-theme="dark"] .stats-panel .subtle,
[data-theme="dark"] .stats-panel .hint,
[data-theme="dark"] .stats-panel .secondary-text {
  color: #94a3b8 !important;
}

[data-theme="dark"] .map-placeholder {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%) !important;
}

[data-theme="dark"] .brand-title {
  color: #f8fafc;
}

[data-theme="dark"] .brand-subtitle {
  color: #94a3b8;
}

[data-theme="dark"] .user-name {
  color: #f8fafc !important;
  font-weight: 600;
}

[data-theme="dark"] .logout-btn {
  color: #cbd5e1 !important;
}

[data-theme="dark"] .logout-btn:hover {
  color: #f8fafc !important;
}

[data-theme="dark"] .nav-item {
  color: #cbd5e1 !important;
}

[data-theme="dark"] .nav-item:hover,
[data-theme="dark"] .nav-item.active {
  color: #f8fafc !important;
}

/* 统计面板文字优化 */
[data-theme="dark"] .stats-panel h3 {
  /* 取消渐变文字，使用浅色纯文本 */
  background: none !important;
  -webkit-background-clip: initial !important;
  background-clip: initial !important;
  -webkit-text-fill-color: currentColor !important;
  color: #f8fafc !important;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

[data-theme="dark"] .chart-legend .legend-item span {
  color: #cbd5e1 !important;
  font-weight: 500;
}

[data-theme="dark"] .time-filter {
  color: #f8fafc !important;
  background: rgba(15, 23, 42, 0.95) !important;
  border: 1px solid rgba(71, 85, 105, 0.6) !important;
}

[data-theme="dark"] .chart-btn {
  color: #cbd5e1 !important;
  border: 1px solid rgba(71, 85, 105, 0.6) !important;
  background: rgba(15, 23, 42, 0.8) !important;
}

[data-theme="dark"] .chart-btn.active,
[data-theme="dark"] .chart-btn:hover {
  color: #f8fafc !important;
  border-color: #60a5fa !important;
  background: rgba(59, 130, 246, 0.2) !important;
}

[data-theme="dark"] .filter-btn {
  color: #cbd5e1 !important;
  border: 1px solid rgba(71, 85, 105, 0.6) !important;
  background: rgba(15, 23, 42, 0.8) !important;
}

[data-theme="dark"] .filter-btn.active,
[data-theme="dark"] .filter-btn:hover {
  color: #f8fafc !important;
  border-color: #60a5fa !important;
  background: rgba(59, 130, 246, 0.2) !important;
}

/* 风险列表文字优化 */
[data-theme="dark"] .risk-item span {
  color: #cbd5e1 !important;
}

[data-theme="dark"] .risk-id {
  color: #f8fafc !important;
  font-weight: 600;
}

[data-theme="dark"] .risk-vin,
[data-theme="dark"] .risk-company {
  color: #f8fafc !important;
  font-weight: 500;
}

/* 地图控件文字优化 */
[data-theme="dark"] .control-btn {
  color: #cbd5e1 !important;
  background: rgba(15, 23, 42, 0.95) !important;
  border: 1px solid rgba(71, 85, 105, 0.6) !important;
}

[data-theme="dark"] .control-btn:hover {
  color: #f8fafc !important;
  border-color: #60a5fa !important;
}

/* 地图弹窗文字优化 */
[data-theme="dark"] .node-popup h4 {
  color: #f8fafc !important;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

[data-theme="dark"] .node-popup p {
  color: #cbd5e1 !important;
}

[data-theme="dark"] .node-popup strong {
  color: #f8fafc !important;
  font-weight: 600;
}

/* 活动日志标签页文字优化 */
[data-theme="dark"] .tab-btn {
  color: #cbd5e1 !important;
  border: 1px solid rgba(71, 85, 105, 0.6) !important;
  background: rgba(15, 23, 42, 0.8) !important;
}

[data-theme="dark"] .tab-btn.active,
[data-theme="dark"] .tab-btn:hover {
  color: #f8fafc !important;
  border-color: #60a5fa !important;
  background: rgba(59, 130, 246, 0.2) !important;
}

/* 表格文字优化 */
[data-theme="dark"] .activity-table th {
  color: #f8fafc !important;
  background: rgba(15, 23, 42, 0.95) !important;
  border: 1px solid rgba(71, 85, 105, 0.6) !important;
  font-weight: 600;
}

[data-theme="dark"] .activity-table td {
  color: #cbd5e1 !important;
  border: 1px solid rgba(71, 85, 105, 0.6) !important;
}

/* 占位内容文字优化 */
[data-theme="dark"] .placeholder-content h2 {
  color: #f8fafc !important;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

[data-theme="dark"] .placeholder-content p {
  color: #cbd5e1 !important;
}

/* 图表元素文字优化 */
[data-theme="dark"] .bar-label {
  color: #cbd5e1 !important;
  font-weight: 500;
}

[data-theme="dark"] .pie-center {
  color: #f8fafc !important;
  font-weight: 600;
}

[data-theme="dark"] .line-placeholder {
  color: #cbd5e1 !important;
}

/* 风险等级颜色优化 */
[data-theme="dark"] .risk-level.high {
  color: #f87171 !important;
  font-weight: 600;
}

[data-theme="dark"] .risk-level.medium {
  color: #fbbf24 !important;
  font-weight: 600;
}

[data-theme="dark"] .risk-level.low {
  color: #34d399 !important;
  font-weight: 600;
}

/* 状态颜色优化 */
[data-theme="dark"] .status.online {
  color: #34d399 !important;
  font-weight: 600;
}

[data-theme="dark"] .status.offline {
  color: #f87171 !important;
  font-weight: 600;
}

/* 风险预警动画效果 */
/* 高风险：闪烁效果 */
.risk-high-blink {
  animation: riskBlink 1s infinite;
  border-left: 4px solid #ef4444 !important;
  position: relative;
}

@keyframes riskBlink {
  0%, 50% {
    background-color: rgba(239, 68, 68, 0.1);
    box-shadow: 0 0 10px rgba(239, 68, 68, 0.3);
  }
  51%, 100% {
    background-color: rgba(239, 68, 68, 0.2);
    box-shadow: 0 0 15px rgba(239, 68, 68, 0.5);
  }
}

/* 中风险：呼吸灯效果 */
.risk-medium-pulse {
  animation: riskPulse 2s ease-in-out infinite;
  border-left: 4px solid #f59e0b !important;
  position: relative;
}

@keyframes riskPulse {
  0%, 100% {
    background-color: rgba(245, 158, 11, 0.05);
    box-shadow: 0 0 5px rgba(245, 158, 11, 0.2);
  }
  50% {
    background-color: rgba(245, 158, 11, 0.15);
    box-shadow: 0 0 20px rgba(245, 158, 11, 0.4);
  }
}

/* 低风险：静态样式 */
.risk-item:not(.risk-high-blink):not(.risk-medium-pulse) {
  border-left: 4px solid #10b981 !important;
  background-color: rgba(16, 185, 129, 0.05);
}

/* 深色主题下的风险预警效果 */
[data-theme="dark"] .risk-high-blink {
  border-left: 4px solid #f87171 !important;
}

[data-theme="dark"] .risk-medium-pulse {
  border-left: 4px solid #fbbf24 !important;
}

[data-theme="dark"] .risk-item:not(.risk-high-blink):not(.risk-medium-pulse) {
  border-left: 4px solid #34d399 !important;
  background-color: rgba(52, 211, 153, 0.05);
}

/* 过滤器样式 */
.filter-section {
  margin-bottom: 1rem;
  padding: 1rem;
  background: var(--surface-color);
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.filter-row {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.filter-row:last-child {
  margin-bottom: 0;
}

.filter-select {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background: var(--input-bg);
  color: var(--text-color);
  font-size: 0.9rem;
}

.filter-input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background: var(--input-bg);
  color: var(--text-color);
  font-size: 0.9rem;
}

.filter-input::placeholder {
  color: var(--text-color-secondary);
}

.filter-clear-btn {
  padding: 0.5rem 1rem;
  background: var(--danger-color);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.filter-clear-btn:hover {
  background: #dc2626;
  transform: translateY(-1px);
}

.no-data {
  text-align: center;
  padding: 2rem;
  color: var(--text-color-secondary);
  font-style: italic;
}
</style>