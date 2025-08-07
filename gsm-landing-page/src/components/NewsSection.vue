<template>
  <section class="news-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">政策法规与实施动态</h2>
        <p class="section-subtitle">
          及时发布最新政策法规，提供权威解读和实施指导
        </p>
      </div>
      <div class="news-grid">
        <div v-for="news in newsItems" :key="news.id" class="news-card">
          <div class="news-meta">
            <span class="news-badge">{{ news.category }}</span>
            <span class="news-date">{{ news.date }}</span>
          </div>
          <h3 class="news-title">{{ news.title }}</h3>
          <p class="news-summary">{{ news.summary }}</p>
          <button class="btn btn-ghost btn-small news-link">
            查看详情 →
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const newsItems = [
  {
    id: 1,
    category: '政策解读',
    date: '2025-01-15',
    title: '《数据安全法》在智能网联汽车领域的实施要点解读',
    summary: '深入解读数据安全法在智能网联汽车行业的具体要求，为政府监管部门和企业提供权威的政策指导和合规建议。'
  },
  {
    id: 2,
    category: '监管指南',
    date: '2025-01-10',
    title: '智能网联汽车数据安全监管实施指南正式发布',
    summary: '明确监管职责分工、监管流程标准、技术要求规范，为各级监管部门开展数据安全监管工作提供操作指南。'
  },
  {
    id: 3,
    category: '合规服务',
    date: '2025-01-08',
    title: '企业数据安全合规服务体系全面上线',
    summary: '平台正式推出企业合规服务体系，包括在线备案、合规评估、风险预警等一站式服务，助力企业快速达成合规要求。'
  }
]
</script>

<style scoped>
/* 新闻动态区域 */
.news-section {
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

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  max-width: none;
}

.news-card {
  padding: 2rem;
  background: var(--background-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.news-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border-color: var(--primary-color);
}

.news-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.news-badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  background: var(--primary-color);
  color: white;
}

.news-date {
  font-size: 0.875rem;
  color: var(--text-color-secondary);
}

.news-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 1rem;
  line-height: 1.4;
}

.news-summary {
  margin-bottom: 1.5rem;
  color: var(--text-color-regular);
  line-height: 1.6;
}

.news-link {
  align-self: flex-start;
}

/* 按钮样式 */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border: 1px solid transparent;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  background: transparent;
  white-space: nowrap;
}

.btn-ghost {
  color: var(--text-color-regular);
}

.btn-ghost:hover {
  background: var(--gray-extra-light);
  color: var(--text-color);
}

.btn-small {
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
}

/* 大屏幕优化 */
@media (min-width: 1400px) {
  .news-grid {
    grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
    gap: 3rem;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .news-section {
    padding: 4rem 0;
  }

  .section-title {
    font-size: 2rem;
  }

  .news-grid {
    grid-template-columns: 1fr;
  }
}
</style>
