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
          <div class="feature-icon">
            <ElementIcon :name="feature.icon" size="48" color="#3b82f6" />
          </div>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-description">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ElementIcon from './ElementIcon.vue'

const features = ref([
  {
    icon: 'document',
    title: '政策法规管理',
    description: '建立完善的政策法规体系，确保智能网联汽车数据安全合规运营'
  },
  {
    icon: 'office-building',
    title: '政府监管平台',
    description: '为政府部门提供统一的监管平台，实现对企业数据安全的有效监督'
  },
  {
    icon: 'shop',
    title: '企业合规管理',
    description: '帮助企业建立数据安全管理体系，确保符合国家相关法规要求'
  },
  {
    icon: 'warning',
    title: '风险预警系统',
    description: '实时监测数据安全风险，及时发现并处置潜在的安全威胁'
  },
  {
    icon: 'connection',
    title: '数据流向追踪',
    description: '全程追踪数据流向，确保数据在传输和使用过程中的安全可控'
  },
  {
    icon: 'user',
    title: '多方协同治理',
    description: '构建政府、企业、第三方机构协同治理的数据安全生态体系'
  }
])
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

/* 亮色主题下的层次感优化 */
[data-theme="light"] .features-section {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  position: relative;
}

[data-theme="light"] .features-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid-light-features" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="%23cbd5e1" stroke-width="0.5" opacity="0.3"/></pattern></defs><rect width="100" height="100" fill="url(%23grid-light-features)"/></svg>');
  opacity: 0.4;
  z-index: 0;
}

[data-theme="light"] .container {
  position: relative;
  z-index: 1;
}

[data-theme="light"] .section-title {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 2px 4px rgba(59, 130, 246, 0.1);
}

[data-theme="light"] .section-subtitle {
  color: #475569;
}

[data-theme="light"] .feature-card {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(203, 213, 225, 0.6);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(10px);
}

[data-theme="light"] .feature-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 30px rgba(59, 130, 246, 0.15);
  border-color: rgba(59, 130, 246, 0.4);
  background: rgba(255, 255, 255, 0.95);
}

[data-theme="light"] .feature-title {
  color: #1e293b;
}

[data-theme="light"] .feature-description {
  color: #475569;
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
