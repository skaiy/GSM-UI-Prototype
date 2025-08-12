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
        <div v-for="news in newsItems" :key="news.id" class="news-card" @click="openPolicyDetail(news.id)">
          <div class="news-meta">
            <span class="news-badge">{{ news.category }}</span>
            <span class="news-date">{{ news.date }}</span>
          </div>
          <h3 class="news-title">{{ news.title }}</h3>
          <p class="news-summary">{{ news.summary }}</p>
          <button class="btn btn-ghost btn-small news-link" @click.stop="openPolicyDetail(news.id)">
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

// 打开政策详情页面
const openPolicyDetail = (newsId: number) => {
  window.open(`/content/policy/${newsId}`, '_blank')
}
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
  cursor: pointer;
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

/* 亮色主题下的层次感优化 */
[data-theme="light"] .news-section {
  background: linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%);
  position: relative;
}

[data-theme="light"] .news-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid-light-news" width="15" height="15" patternUnits="userSpaceOnUse"><path d="M 15 0 L 0 0 0 15" fill="none" stroke="%23e2e8f0" stroke-width="0.5" opacity="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid-light-news)"/></svg>');
  opacity: 0.6;
  z-index: 0;
}

[data-theme="light"] .container {
  position: relative;
  z-index: 1;
}

[data-theme="light"] .section-title {
  color: #1e293b;
  text-shadow: 0 2px 4px rgba(59, 130, 246, 0.1);
}

[data-theme="light"] .news-card {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(203, 213, 225, 0.6);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(10px);
}

[data-theme="light"] .news-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 40px rgba(59, 130, 246, 0.12);
  border-color: rgba(59, 130, 246, 0.3);
  background: rgba(255, 255, 255, 0.95);
}

[data-theme="light"] .news-badge {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.3);
}

[data-theme="light"] .news-date {
  color: #64748b;
}

[data-theme="light"] .news-title {
  color: #1e293b;
}

[data-theme="light"] .news-summary {
  color: #475569;
}

[data-theme="light"] .btn-ghost {
  color: #64748b;
  border: 1px solid rgba(203, 213, 225, 0.6);
}

[data-theme="light"] .btn-ghost:hover {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
  border-color: rgba(59, 130, 246, 0.3);
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
