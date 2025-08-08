<template>
  <section class="enterprises-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">合规示范企业</h2>
        <p class="section-subtitle">
          行业龙头企业率先响应国家政策，积极接入平台开展数据安全合规工作
        </p>
      </div>
      
      <!-- 分类选项卡 -->
      <div class="category-tabs">
        <button 
          v-for="category in categories" 
          :key="category.key"
          :class="['tab-button', { active: activeCategory === category.key }]"
          @click="setActiveCategory(category.key)"
        >
          <span class="tab-icon">{{ category.icon }}</span>
          <span class="tab-text">{{ category.name }}</span>
          <span class="tab-count">({{ getEnterprisesByType(category.type).length }})</span>
        </button>
      </div>

      <!-- 企业展示区域 -->
      <div class="enterprises-display">
        <transition name="fade" mode="out-in">
          <div :key="activeCategory" class="enterprises-grid">
            <div 
              v-for="(enterprise, index) in currentEnterprises" 
              :key="enterprise.id" 
              class="enterprise-item"
              :style="{ animationDelay: `${index * 0.1}s` }"
            >
              <div class="enterprise-logo">
                <img :src="`/logos/${enterprise.logo}.svg`" :alt="enterprise.name" @error="handleImageError" />
              </div>
              <span class="enterprise-name">{{ enterprise.name }}</span>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// 当前激活的分类
const activeCategory = ref('automotive')

// 分类定义
const categories = [
  { key: 'automotive', name: '整车厂商', type: '汽车企业', icon: '🚗' },
  { key: 'map', name: '地图服务商', type: '地图服务商', icon: '🗺️' },
  { key: 'autonomous', name: '智驾方案提供商', type: '智驾方案提供商', icon: '🤖' }
]

// 设置激活分类
const setActiveCategory = (categoryKey: string) => {
  activeCategory.value = categoryKey
}

// 获取当前分类的企业列表
const currentEnterprises = computed(() => {
  const currentCategory = categories.find(cat => cat.key === activeCategory.value)
  return currentCategory ? getEnterprisesByType(currentCategory.type) : []
})

const getEnterprisesByType = (type: string) => {
  return enterprises.filter(enterprise => enterprise.type === type)
}

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  // 如果图片加载失败，显示企业名称的首字母
  const enterprise = enterprises.find(e => img.alt === e.name)
  if (enterprise) {
    img.style.display = 'none'
    const parent = img.parentElement
    if (parent) {
      parent.innerHTML = enterprise.name.charAt(0)
      parent.classList.add('fallback-logo')
    }
  }
}

const enterprises = [
  // 传统汽车厂商
  { id: 1, name: '中国一汽', type: '汽车企业', logo: 'faw' },
  { id: 2, name: '上汽集团', type: '汽车企业', logo: 'saic' },
  { id: 3, name: '东风汽车', type: '汽车企业', logo: 'dongfeng' },
  { id: 4, name: '北汽集团', type: '汽车企业', logo: 'baic' },
  { id: 5, name: '广汽集团', type: '汽车企业', logo: 'gac' },
  { id: 6, name: '长安汽车', type: '汽车企业', logo: 'changan' },
  { id: 7, name: '吉利汽车', type: '汽车企业', logo: 'geely' },
  { id: 8, name: '长城汽车', type: '汽车企业', logo: 'gwm' },

  // 新能源汽车厂商
  { id: 9, name: '比亚迪', type: '汽车企业', logo: 'byd' },
  { id: 10, name: '蔚来汽车', type: '汽车企业', logo: 'nio' },
  { id: 11, name: '小鹏汽车', type: '汽车企业', logo: 'xpeng' },
  { id: 12, name: '理想汽车', type: '汽车企业', logo: 'li' },
  { id: 13, name: '零跑汽车', type: '汽车企业', logo: 'leapmotor' },
  { id: 14, name: '小米汽车', type: '汽车企业', logo: 'xiaomi' },

  // 地图服务商
  { id: 15, name: '百度地图', type: '地图服务商', logo: 'baidu' },
  { id: 16, name: '高德地图', type: '地图服务商', logo: 'amap' },
  { id: 17, name: '腾讯地图', type: '地图服务商', logo: 'tencent' },
  { id: 18, name: '四维图新', type: '地图服务商', logo: 'navinfo' },

  // 智驾方案提供商
  { id: 19, name: '华为技术', type: '智驾方案提供商', logo: 'huawei' },
  { id: 20, name: '地平线', type: '智驾方案提供商', logo: 'horizon' },
  { id: 21, name: '商汤科技', type: '智驾方案提供商', logo: 'sensetime' },
  { id: 22, name: '文远知行', type: '智驾方案提供商', logo: 'weride' }
]
</script>

<style scoped>
/* 服务企业区域 */
.enterprises-section {
  padding: 6rem 0;
  background: var(--gray-extra-light);
  width: 100vw;
  margin-left: calc(-50vw + 50%);
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-hover) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-subtitle {
  font-size: 1.125rem;
  margin-top: 1rem;
  color: var(--text-color-secondary);
  line-height: 1.6;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

/* 分类选项卡 */
.category-tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.tab-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: var(--background-color);
  border: 2px solid var(--border-color);
  border-radius: 12px;
  color: var(--text-color-secondary);
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.tab-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.tab-button:hover::before {
  left: 100%;
}

.tab-button:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.tab-button.active {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-hover));
  border-color: var(--primary-color);
  color: white;
  box-shadow: 0 4px 15px rgba(var(--primary-color-rgb), 0.3);
}

.tab-button.active:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(var(--primary-color-rgb), 0.4);
}

.tab-icon {
  font-size: 1.2rem;
}

.tab-text {
  font-weight: 600;
}

.tab-count {
  font-size: 0.875rem;
  opacity: 0.8;
  background: rgba(255, 255, 255, 0.2);
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-weight: 500;
}

.tab-button:not(.active) .tab-count {
  background: var(--gray-light);
  color: var(--text-color-secondary);
}

/* 企业展示区域 */
.enterprises-display {
  background: var(--background-color);
  border-radius: 16px;
  padding: 2.5rem;
  border: 1px solid var(--border-color);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  min-height: 400px;
}

.enterprises-display:hover {
  box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
}

.enterprises-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.5rem;
}

/* 切换动画 */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.enterprise-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem 1.5rem;
  background: var(--gray-extra-light);
  border: 1px solid var(--border-color-lighter);
  border-radius: 12px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  animation: slideInUp 0.6s ease forwards;
  opacity: 0;
  transform: translateY(30px);
}

@keyframes slideInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.enterprise-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--primary-color), var(--primary-hover));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.enterprise-item:hover {
  border-color: var(--primary-color);
  background: var(--background-color);
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.enterprise-item:hover::before {
  opacity: 1;
}

.enterprise-logo {
  width: 64px;
  height: 64px;
  border-radius: 12px;
  background: var(--background-color);
  border: 2px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--primary-color);
  transition: all 0.3s ease;
  overflow: hidden;
}

.enterprise-logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 8px;
}

.enterprise-logo.fallback-logo {
  background: var(--primary-color);
  color: white;
  font-size: 1.25rem;
}

.enterprise-item:hover .enterprise-logo {
  border-color: var(--primary-color);
  transform: scale(1.05);
}

.enterprise-name {
  font-weight: 600;
  color: var(--text-color);
  text-align: center;
  font-size: 0.875rem;
  line-height: 1.4;
}

/* 徽章样式 */
.enterprise-badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
}

.badge-blue {
  background: #e3f2fd;
  color: #1976d2;
}

.badge-green {
  background: #e8f5e8;
  color: #2e7d32;
}

.badge-orange {
  background: #fff3e0;
  color: #f57c00;
}

.badge-purple {
  background: #f3e5f5;
  color: #7b1fa2;
}

.badge-gray {
  background: var(--gray-extra-light);
  color: var(--text-color-secondary);
}

/* 大屏幕优化 */
@media (min-width: 1400px) {
  .enterprises-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 3rem;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .enterprises-section {
    padding: 4rem 0;
  }

  .section-title {
    font-size: 2rem;
  }

  .category-tabs {
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
  }

  .tab-button {
    width: 100%;
    max-width: 300px;
    justify-content: center;
    padding: 0.875rem 1.5rem;
  }

  .enterprises-display {
    padding: 1.5rem;
    min-height: 300px;
  }

  .enterprises-grid {
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 1rem;
  }

  .enterprise-item {
    padding: 1.5rem 1rem;
  }
}

@media (max-width: 480px) {
  .tab-button {
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
  }

  .tab-icon {
    font-size: 1rem;
  }

  .enterprises-grid {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  }
}
</style>
