<template>
  <div class="policy-detail-page">
    <!-- 文章头部 -->
    <div class="article-header">
      <div class="article-meta">
        <span class="article-category">政策法规</span>
        <span class="article-date">{{ formatDate(article.publishDate) }}</span>
        <span class="article-views">阅读量: {{ article.views }}</span>
      </div>
      <h1 class="article-title">{{ article.title }}</h1>
      <p class="article-subtitle">{{ article.subtitle }}</p>
      
      <!-- 文章标签 -->
      <div class="article-tags" v-if="article.tags && article.tags.length">
        <span class="tag" v-for="tag in article.tags" :key="tag">{{ tag }}</span>
      </div>
    </div>

    <!-- 文章内容 -->
    <div class="article-content">
      <div class="content-body" v-html="article.content"></div>
      
      <!-- 附件下载 -->
      <div class="attachments-section" v-if="article.attachments && article.attachments.length">
        <h3 class="attachments-title">相关文件下载</h3>
        <div class="attachments-list">
          <div 
            class="attachment-item" 
            v-for="attachment in article.attachments" 
            :key="attachment.id"
            @click="downloadAttachment(attachment)"
          >
            <div class="attachment-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14,2 14,8 20,8"></polyline>
              </svg>
            </div>
            <div class="attachment-info">
              <div class="attachment-name">{{ attachment.name }}</div>
              <div class="attachment-meta">{{ attachment.size }} | {{ attachment.type }}</div>
            </div>
            <div class="attachment-download">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7,10 12,15 17,10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 相关政策推荐 -->
    <div class="related-policies">
      <h3 class="related-title">相关政策推荐</h3>
      <div class="related-list">
        <div 
          class="related-item" 
          v-for="policy in relatedPolicies" 
          :key="policy.id"
          @click="openPolicy(policy.id)"
        >
          <div class="related-content">
            <h4 class="related-policy-title">{{ policy.title }}</h4>
            <p class="related-policy-desc">{{ policy.description }}</p>
            <div class="related-meta">
              <span class="related-date">{{ formatDate(policy.publishDate) }}</span>
              <span class="related-category">{{ policy.category }}</span>
            </div>
          </div>
          <div class="related-arrow">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- 分享和操作 -->
    <div class="article-actions">
      <button class="action-btn" @click="shareArticle">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="18" cy="5" r="3"></circle>
          <circle cx="6" cy="12" r="3"></circle>
          <circle cx="18" cy="19" r="3"></circle>
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
        </svg>
        分享
      </button>
      <button class="action-btn" @click="printArticle">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6,9 6,2 18,2 18,9"></polyline>
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
          <rect x="6" y="14" width="12" height="8"></rect>
        </svg>
        打印
      </button>
      <button class="action-btn" @click="collectArticle">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon>
        </svg>
        收藏
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// 定义props
defineProps<{
  contentData?: any
}>()

// 文章数据
const article = ref({
  id: '1',
  title: '关于加强智能网联汽车时空数据安全监管的通知',
  subtitle: 'Notice on Strengthening the Security Supervision of Spatio-temporal Data for Connected Vehicles',
  publishDate: '2024-12-15',
  views: 1256,
  category: '政策法规',
  tags: ['数据安全', '智能网联汽车', '监管政策', '时空数据'],
  content: `
    <h2>一、总体要求</h2>
    <p>为贯彻落实《数据安全法》《个人信息保护法》《网络安全法》等法律法规，加强智能网联汽车时空数据安全监管，保障国家安全和个人信息安全，促进智能网联汽车产业健康发展，现就有关事项通知如下：</p>
    
    <h2>二、监管范围</h2>
    <p>本通知适用于在中华人民共和国境内从事智能网联汽车时空数据处理活动的汽车制造企业、零部件供应商、软件服务商、运营服务商等相关主体。</p>
    
    <h3>（一）数据类型</h3>
    <ul>
      <li>车辆位置信息数据</li>
      <li>行驶轨迹数据</li>
      <li>地理信息数据</li>
      <li>环境感知数据</li>
      <li>其他涉及时空信息的数据</li>
    </ul>
    
    <h3>（二）处理活动</h3>
    <ul>
      <li>数据收集</li>
      <li>数据存储</li>
      <li>数据传输</li>
      <li>数据使用</li>
      <li>数据共享</li>
      <li>数据销毁</li>
    </ul>
    
    <h2>三、监管要求</h2>
    <p>相关企业应当建立健全数据安全管理制度，采取必要的技术和管理措施，确保数据安全。</p>
    
    <h3>（一）数据分类分级</h3>
    <p>企业应当对收集的时空数据进行分类分级管理，根据数据的重要程度和敏感程度，采取相应的安全保护措施。</p>
    
    <h3>（二）安全技术措施</h3>
    <p>企业应当采用加密、脱敏、匿名化等技术手段，保护时空数据的安全。对于涉及国家安全的敏感数据，应当采取更加严格的安全措施。</p>
    
    <h3>（三）合规审查</h3>
    <p>企业应当定期开展数据安全合规审查，及时发现和整改安全隐患，确保数据处理活动符合法律法规要求。</p>
    
    <h2>四、监督检查</h2>
    <p>监管部门将定期对相关企业的数据安全管理情况进行检查，对违法违规行为依法予以处罚。</p>
    
    <h2>五、实施时间</h2>
    <p>本通知自发布之日起施行。各相关企业应当在通知发布后6个月内完成合规整改工作。</p>
  `,
  attachments: [
    {
      id: '1',
      name: '智能网联汽车时空数据安全监管通知.pdf',
      size: '2.3MB',
      type: 'PDF',
      url: '/assets/documents/policy-notice.pdf'
    },
    {
      id: '2',
      name: '数据安全合规检查表.xlsx',
      size: '156KB',
      type: 'Excel',
      url: '/assets/documents/compliance-checklist.xlsx'
    }
  ]
})

// 相关政策
const relatedPolicies = ref([
  {
    id: '2',
    title: '智能网联汽车数据安全管理若干规定（试行）',
    description: '规范智能网联汽车数据处理活动，保护个人、组织的合法权益，维护国家安全和社会公共利益',
    publishDate: '2024-10-01',
    category: '部门规章'
  },
  {
    id: '3',
    title: '关于加强车联网网络安全和数据安全工作的通知',
    description: '进一步加强车联网网络安全和数据安全管理，推动车联网产业安全健康发展',
    publishDate: '2024-08-15',
    category: '工作通知'
  },
  {
    id: '4',
    title: '汽车数据安全管理若干规定（征求意见稿）',
    description: '为了规范汽车数据处理活动，保护个人、组织的合法权益，维护国家安全和社会公共利益',
    publishDate: '2024-06-20',
    category: '征求意见'
  }
])

// 格式化日期
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 下载附件
const downloadAttachment = (attachment: any) => {
  const link = document.createElement('a')
  link.href = attachment.url
  link.download = attachment.name
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// 打开相关政策
const openPolicy = (policyId: string) => {
  window.open(`/content/policy/${policyId}`, '_blank')
}

// 分享文章
const shareArticle = () => {
  if (navigator.share) {
    navigator.share({
      title: article.value.title,
      text: article.value.subtitle,
      url: window.location.href
    })
  } else {
    // 复制链接到剪贴板
    navigator.clipboard.writeText(window.location.href)
    alert('链接已复制到剪贴板')
  }
}

// 打印文章
const printArticle = () => {
  window.print()
}

// 收藏文章
const collectArticle = () => {
  // 这里可以实现收藏功能
  alert('文章已收藏')
}

// 组件挂载时加载数据
onMounted(() => {
  const id = route.params.id as string
  if (id && id !== 'default') {
    // 根据ID加载具体的政策内容
    // 这里可以调用API获取数据
  }
})
</script>

<style scoped>
.policy-detail-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  line-height: 1.6;
}

/* 文章头部 */
.article-header {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--border-color);
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  color: var(--text-color-secondary);
}

.article-category {
  background: var(--primary-color);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
}

.article-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-color);
  margin: 0 0 0.5rem 0;
  line-height: 1.3;
}

.article-subtitle {
  font-size: 1rem;
  color: var(--text-color-secondary);
  margin: 0 0 1rem 0;
  font-style: italic;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background: var(--card-background);
  color: var(--text-color-secondary);
  padding: 0.25rem 0.75rem;
  border-radius: 16px;
  font-size: 0.75rem;
  border: 1px solid var(--border-color);
}

/* 文章内容 */
.article-content {
  margin-bottom: 2rem;
}

.content-body {
  color: var(--text-color);
}

.content-body h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 2rem 0 1rem 0;
  color: var(--text-color);
  border-bottom: 2px solid var(--primary-color);
  padding-bottom: 0.5rem;
}

.content-body h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 1.5rem 0 0.75rem 0;
  color: var(--text-color);
}

.content-body p {
  margin: 1rem 0;
  text-align: justify;
}

.content-body ul, .content-body ol {
  margin: 1rem 0;
  padding-left: 2rem;
}

.content-body li {
  margin: 0.5rem 0;
}

/* 附件下载 */
.attachments-section {
  margin: 2rem 0;
  padding: 1.5rem;
  background: var(--card-background);
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.attachments-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: var(--text-color);
}

.attachments-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.attachment-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--background-color);
  border-radius: 6px;
  border: 1px solid var(--border-color);
  cursor: pointer;
  transition: all 0.2s ease;
}

.attachment-item:hover {
  background: var(--primary-color);
  color: white;
  transform: translateY(-1px);
}

.attachment-icon {
  color: var(--primary-color);
  flex-shrink: 0;
}

.attachment-item:hover .attachment-icon {
  color: white;
}

.attachment-info {
  flex: 1;
}

.attachment-name {
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.attachment-meta {
  font-size: 0.75rem;
  opacity: 0.7;
}

.attachment-download {
  flex-shrink: 0;
}

/* 相关政策 */
.related-policies {
  margin: 2rem 0;
}

.related-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: var(--text-color);
}

.related-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.related-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--card-background);
  border-radius: 8px;
  border: 1px solid var(--border-color);
  cursor: pointer;
  transition: all 0.2s ease;
}

.related-item:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-color: var(--primary-color);
}

.related-content {
  flex: 1;
}

.related-policy-title {
  font-size: 1rem;
  font-weight: 500;
  margin: 0 0 0.5rem 0;
  color: var(--text-color);
}

.related-policy-desc {
  font-size: 0.875rem;
  color: var(--text-color-secondary);
  margin: 0 0 0.5rem 0;
  line-height: 1.4;
}

.related-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.75rem;
  color: var(--text-color-secondary);
}

.related-arrow {
  color: var(--text-color-secondary);
  flex-shrink: 0;
}

/* 文章操作 */
.article-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 2rem 0;
  border-top: 1px solid var(--border-color);
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  color: var(--text-color);
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;
}

.action-btn:hover {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
  transform: translateY(-1px);
}

/* 深色主题适配 */
[data-theme="dark"] .attachments-section,
[data-theme="dark"] .related-item,
[data-theme="dark"] .action-btn {
  background: rgba(30, 41, 59, 0.8);
  border-color: rgba(51, 65, 85, 0.6);
}

[data-theme="dark"] .attachment-item {
  background: rgba(15, 23, 42, 0.8);
}

[data-theme="dark"] .tag {
  background: rgba(30, 41, 59, 0.8);
  border-color: rgba(51, 65, 85, 0.6);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .policy-detail-page {
    padding: 1rem;
  }
  
  .article-title {
    font-size: 1.5rem;
  }
  
  .article-meta {
    flex-wrap: wrap;
  }
  
  .article-actions {
    flex-wrap: wrap;
    justify-content: stretch;
  }
  
  .action-btn {
    flex: 1;
    justify-content: center;
  }
}

/* 打印样式 */
@media print {
  .article-actions,
  .related-policies {
    display: none;
  }
  
  .policy-detail-page {
    padding: 0;
  }
  
  .article-header {
    border-bottom: 2px solid #000;
  }
}
</style>
