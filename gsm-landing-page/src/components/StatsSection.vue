<template>
  <section class="stats-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">政策落地成效</h2>
        <p class="section-subtitle">
          数据见证政策实施成果，服务推动行业健康发展
        </p>
      </div>
      <div class="stats-grid">
        <div v-for="stat in operationalStats" :key="stat.id" class="stat-card">
          <div class="stat-content">
            <span class="stat-value">{{ stat.value }}</span>
            <h4 class="stat-title">{{ stat.title }}</h4>
            <p class="stat-desc">{{ stat.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const operationalStats = [
  {
    id: 1,
    value: '15项',
    title: '政策法规覆盖',
    description: '涵盖数据安全法、个人信息保护法等核心法规政策'
  },
  {
    id: 2,
    value: '31个',
    title: '省市监管接入',
    description: '全国主要省市监管部门已接入平台开展监管工作'
  },
  {
    id: 3,
    value: '50万+',
    title: '监管车辆规模',
    description: '覆盖乘用车、商用车、专用车等各类智能网联汽车'
  },
  {
    id: 4,
    value: '30+',
    title: '重点企业接入',
    description: '行业龙头企业率先接入，发挥示范引领作用'
  },
  {
    id: 5,
    value: '99.9%',
    title: '合规率提升',
    description: '通过平台服务，企业数据安全合规率显著提升'
  },
  {
    id: 6,
    value: '24小时',
    title: '应急响应时效',
    description: '建立快速响应机制，确保数据安全事件及时处置'
  }
]
</script>

<style scoped>
/* 运营数据区域 */
.stats-section {
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
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 1rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: none;
}

.stat-card {
  padding: 2rem;
  text-align: center;
  background: var(--background-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.stat-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-color);
}

.stat-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-color);
}

.stat-desc {
  font-size: 0.875rem;
  color: var(--text-color-secondary);
}

/* 大屏幕优化 */
@media (min-width: 1400px) {
  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 3rem;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .stats-section {
    padding: 4rem 0;
  }

  .section-title {
    font-size: 2rem;
  }

  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
}
</style>
