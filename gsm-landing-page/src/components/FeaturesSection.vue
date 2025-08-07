<template>
  <section id="features" class="features-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">政策落地与监管服务</h2>
        <p class="section-subtitle">
          以政策宣传为引领，以专业服务为支撑，构建智能网联汽车数据安全监管生态
        </p>
      </div>
      <div class="features-grid">
        <div v-for="feature in features" :key="feature.id" class="feature-card">
          <div class="feature-icon">{{ feature.icon }}</div>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-description">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const features = [
  {
    id: 1,
    icon: '📜',
    title: '政策权威解读',
    description: '第一时间发布国家数据安全政策法规，提供权威解读和实施指南，确保政策传达的准确性和时效性'
  },
  {
    id: 2,
    icon: '🏛️',
    title: '政府监管服务',
    description: '为各级政府监管部门提供专业的数据安全监管工具，支持四级监管体系高效运行'
  },
  {
    id: 3,
    icon: '🏢',
    title: '企业合规助手',
    description: '为企业提供一站式合规服务，包括在线备案、合规自查、技术咨询等全方位支持'
  },
  {
    id: 4,
    icon: '⚠️',
    title: '智能风险预警',
    description: '基于大数据和AI技术，实时监测数据安全风险，提供分级预警和应急响应机制'
  },
  {
    id: 5,
    icon: '🔗',
    title: '全链路监管',
    description: '覆盖数据收集、存储、传输、处理、销毁全生命周期，确保监管无死角'
  },
  {
    id: 6,
    icon: '🤝',
    title: '生态协同发展',
    description: '促进政府、企业、技术服务商协同合作，共建智能网联汽车数据安全生态'
  }
]
</script>

<style scoped>
/* 功能特色区域 */
.features-section {
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

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  max-width: none;
}

.feature-card {
  padding: 2rem;
  text-align: center;
  background: var(--background-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border-color: var(--primary-color);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 1rem;
}

.feature-description {
  color: var(--text-color-regular);
  line-height: 1.6;
}

/* 大屏幕优化 */
@media (min-width: 1400px) {
  .features-grid {
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 3rem;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .features-section {
    padding: 4rem 0;
  }

  .section-title {
    font-size: 2rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>
