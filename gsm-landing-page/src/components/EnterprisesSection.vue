<template>
  <section class="enterprises-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">合规示范企业</h2>
        <p class="section-subtitle">
          行业龙头企业率先响应国家政策，积极接入平台开展数据安全合规工作
        </p>
      </div>
      <div class="enterprises-categories">
        <div class="category-section">
          <h3 class="category-title">整车厂商</h3>
          <div class="enterprises-grid">
            <div v-for="enterprise in getEnterprisesByType('汽车企业')" :key="enterprise.id" class="enterprise-item">
              <div class="enterprise-logo">
                <img :src="`/logos/${enterprise.logo}.svg`" :alt="enterprise.name" @error="handleImageError" />
              </div>
              <span class="enterprise-name">{{ enterprise.name }}</span>
            </div>
          </div>
        </div>

        <div class="category-section">
          <h3 class="category-title">地图服务商</h3>
          <div class="enterprises-grid">
            <div v-for="enterprise in getEnterprisesByType('地图服务商')" :key="enterprise.id" class="enterprise-item">
              <div class="enterprise-logo">
                <img :src="`/logos/${enterprise.logo}.svg`" :alt="enterprise.name" @error="handleImageError" />
              </div>
              <span class="enterprise-name">{{ enterprise.name }}</span>
            </div>
          </div>
        </div>

        <div class="category-section">
          <h3 class="category-title">智驾方案提供商</h3>
          <div class="enterprises-grid">
            <div v-for="enterprise in getEnterprisesByType('智驾方案提供商')" :key="enterprise.id" class="enterprise-item">
              <div class="enterprise-logo">
                <img :src="`/logos/${enterprise.logo}.svg`" :alt="enterprise.name" @error="handleImageError" />
              </div>
              <span class="enterprise-name">{{ enterprise.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
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

.enterprises-categories {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.category-section {
  background: var(--background-color);
  border-radius: 16px;
  padding: 2.5rem;
  border: 1px solid var(--border-color);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.category-section:hover {
  box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.category-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 2rem;
  text-align: center;
  position: relative;
}

.category-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, var(--primary-color), var(--primary-hover));
  border-radius: 2px;
}

.enterprises-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.5rem;
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

  .enterprises-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
}
</style>
