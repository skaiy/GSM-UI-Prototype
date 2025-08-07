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
    category: '国家标准',
    date: '2024-08-23',
    title: '三项智能网联汽车强制性国家标准正式发布',
    summary: '工信部发布GB 44495-2024《汽车整车信息安全技术要求》等三项强制性国家标准，为我国汽车产品信息安全防护技术水平提供规范。'
  },
  {
    id: 2,
    category: '数据要素',
    date: '2024-01-04',
    title: '国家数据局发布"数据要素X"三年行动计划',
    summary: '17部门联合印发《"数据要素X"三年行动计划（2024-2026年）》，明确智能网联汽车产业数据合规发展路径。'
  },
  {
    id: 3,
    category: '产业政策',
    date: '2024-10-30',
    title: '北京经开区发布智能网联汽车产业高质量发展政策',
    summary: '北京经济技术开发区出台若干政策措施，支持智能网联汽车产业高质量发展，推动技术创新和应用示范。'
  },
  {
    id: 4,
    category: '安全管理',
    date: '2024-07-15',
    title: '自然资源部加强智能网联汽车测绘地理信息安全管理',
    summary: '发布《关于加强智能网联汽车有关测绘地理信息安全管理的通知》，规范智能网联汽车地理信息数据安全管理。'
  }
]
</script>

<style scoped>
/* 新闻动态区域 */
.news-section {
  padding: 6rem 0;
  background: var(--background-color);
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  position: relative;
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

.news-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  max-width: none;
}

.news-card {
  padding: 2rem;
  background: var(--gray-extra-light);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.news-card::before {
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

.news-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
  border-color: var(--primary-color);
  background: var(--background-color);
}

.news-card:hover::before {
  opacity: 1;
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
