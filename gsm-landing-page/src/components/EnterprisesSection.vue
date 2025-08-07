<template>
  <section class="enterprises-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">合规示范企业</h2>
        <p class="section-subtitle">
          行业龙头企业率先响应国家政策，积极接入平台开展数据安全合规工作
        </p>
      </div>
      <div class="enterprises-grid">
        <div v-for="enterprise in enterprises" :key="enterprise.id" class="enterprise-item">
          <div class="enterprise-logo">{{ enterprise.name.charAt(0) }}</div>
          <span class="enterprise-name">{{ enterprise.name }}</span>
          <span class="enterprise-badge" :class="getEnterpriseTypeClass(enterprise.type)">
            {{ enterprise.type }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const getEnterpriseTypeClass = (type: string) => {
  switch (type) {
    case '汽车企业': return 'badge-blue'
    case '地图服务商': return 'badge-green'
    case '智驾方案提供商': return 'badge-orange'
    case '平台运营商': return 'badge-purple'
    default: return 'badge-gray'
  }
}

const enterprises = [
  { id: 1, name: '北京汽车集团', type: '汽车企业' },
  { id: 2, name: '吉利汽车研究院', type: '汽车企业' },
  { id: 3, name: '上海汽车集团', type: '汽车企业' },
  { id: 4, name: '长城汽车', type: '汽车企业' },
  { id: 5, name: '东风商用车', type: '汽车企业' },
  { id: 6, name: '郑州宇通客车', type: '汽车企业' },
  { id: 7, name: '蔚马汽车技术', type: '汽车企业' },
  { id: 8, name: '阿里巴巴网络技术', type: '地图服务商' },
  { id: 9, name: '华为技术', type: '智驾方案提供商' },
  { id: 10, name: '杭州飞步科技', type: '智驾方案提供商' },
  { id: 11, name: '百度地图', type: '地图服务商' },
  { id: 12, name: '高德地图', type: '地图服务商' }
]
</script>

<style scoped>
/* 服务企业区域 */
.enterprises-section {
  padding: 6rem 0;
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
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 1rem;
}

.section-subtitle {
  font-size: 1.125rem;
  margin-top: 1rem;
  color: var(--text-color-secondary);
  line-height: 1.6;
}

.enterprises-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
  max-width: none;
}

.enterprise-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1.5rem;
  background: var(--background-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.enterprise-item:hover {
  border-color: var(--primary-color);
  background: var(--gray-extra-light);
  transform: translateY(-2px);
}

.enterprise-logo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--primary-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 600;
}

.enterprise-name {
  font-weight: 500;
  color: var(--text-color);
  text-align: center;
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
