<template>
  <div class="compliance-application-detail">
    <!-- 页面标题 -->
    <div class="page-header">
      <div class="header-content">
        <div class="title-section">
          <h1 class="page-title">智能网联汽车时空数据安全合规接入申请</h1>
          <p class="page-subtitle">Enterprise Compliance Access Application for Connected Vehicle Geospatial Data Security</p>
        </div>
        <div class="action-buttons">
          <button class="btn btn-primary" @click="downloadApplication">
            <svg class="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7,10 12,15 17,10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            下载申请单
          </button>
        </div>
      </div>
    </div>

    <!-- 申请流程说明 -->
    <div class="process-section">
      <h2 class="section-title">申请流程</h2>
      <div class="process-steps">
        <div class="step-item">
          <div class="step-number">1</div>
          <div class="step-content">
            <h3 class="step-title">下载申请表</h3>
            <p class="step-desc">下载《智能网联汽车时空数据安全合规接入申请表》</p>
          </div>
        </div>
        <div class="step-item">
          <div class="step-number">2</div>
          <div class="step-content">
            <h3 class="step-title">填写申请信息</h3>
            <p class="step-desc">按要求填写企业基本信息、数据处理活动等内容</p>
          </div>
        </div>
        <div class="step-item">
          <div class="step-number">3</div>
          <div class="step-content">
            <h3 class="step-title">提交审核材料</h3>
            <p class="step-desc">提交申请表及相关证明材料至监管部门</p>
          </div>
        </div>
        <div class="step-item">
          <div class="step-number">4</div>
          <div class="step-content">
            <h3 class="step-title">审核与接入</h3>
            <p class="step-desc">监管部门审核通过后，完成平台接入配置</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 申请要求 -->
    <div class="requirements-section">
      <h2 class="section-title">申请要求</h2>
      <div class="requirements-grid">
        <div class="requirement-card">
          <div class="card-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14,2 14,8 20,8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10,9 9,9 8,9"></polyline>
            </svg>
          </div>
          <h3 class="card-title">企业资质</h3>
          <ul class="card-list">
            <li>营业执照副本</li>
            <li>组织机构代码证</li>
            <li>税务登记证</li>
            <li>法人身份证明</li>
          </ul>
        </div>
        
        <div class="requirement-card">
          <div class="card-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <circle cx="12" cy="16" r="1"></circle>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
          <h3 class="card-title">安全保障</h3>
          <ul class="card-list">
            <li>数据安全管理制度</li>
            <li>技术安全保障措施</li>
            <li>人员安全管理规定</li>
            <li>应急响应预案</li>
          </ul>
        </div>
        
        <div class="requirement-card">
          <div class="card-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
          </div>
          <h3 class="card-title">合规承诺</h3>
          <ul class="card-list">
            <li>遵守国家法律法规</li>
            <li>接受监管部门监督</li>
            <li>定期报送合规报告</li>
            <li>配合安全检查工作</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 联系方式 -->
    <div class="contact-section">
      <h2 class="section-title">联系方式</h2>
      <div class="contact-info">
        <div class="contact-item">
          <svg class="contact-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
          <span>政策咨询：policy@gsm-platform.gov.cn</span>
        </div>
        <div class="contact-item">
          <svg class="contact-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          <span>咨询热线：400-123-4567</span>
        </div>
        <div class="contact-item">
          <svg class="contact-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="10" r="3"></circle>
            <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z"></path>
          </svg>
          <span>办公地址：北京市海淀区中关村大街1号</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

// 定义props
defineProps<{
  contentData?: any
}>()


// 下载申请单
const downloadApplication = () => {
  // 创建下载链接
  const link = document.createElement('a')
  link.href = '/assets/documents/compliance-application-form.pdf' // 假设的文件路径
  link.download = '智能网联汽车时空数据安全合规接入申请表.pdf'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>

<style scoped>
.compliance-application-detail {
  padding: 2rem;
}

/* 页面标题区域 */
.page-header {
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--border-color);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
}

.title-section {
  flex: 1;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-color);
  margin: 0 0 0.5rem 0;
  line-height: 1.2;
}

.page-subtitle {
  font-size: 1rem;
  color: var(--text-color-secondary);
  margin: 0;
  font-style: italic;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  flex-shrink: 0;
}

/* 按钮样式 */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  background: transparent;
  white-space: nowrap;
}

.btn-primary {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.btn-primary:hover {
  background: var(--primary-hover);
  border-color: var(--primary-hover);
  transform: translateY(-1px);
}

.btn-outline {
  color: var(--primary-color);
  border-color: var(--primary-color);
}

.btn-outline:hover {
  background: var(--primary-color);
  color: white;
  transform: translateY(-1px);
}

.btn-icon {
  flex-shrink: 0;
}

/* 章节标题 */
.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-color);
  margin: 0 0 1.5rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--primary-color);
  display: inline-block;
}

/* 流程步骤 */
.process-section {
  margin-bottom: 3rem;
}

.process-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.step-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--card-background);
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.step-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.step-number {
  width: 2.5rem;
  height: 2.5rem;
  background: var(--primary-color);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.125rem;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-color);
  margin: 0 0 0.5rem 0;
}

.step-desc {
  font-size: 0.875rem;
  color: var(--text-color-secondary);
  margin: 0;
  line-height: 1.5;
}

/* 申请要求网格 */
.requirements-section {
  margin-bottom: 3rem;
}

.requirements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.requirement-card {
  padding: 2rem;
  background: var(--card-background);
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.requirement-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.card-icon {
  width: 3rem;
  height: 3rem;
  background: var(--primary-color);
  color: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-color);
  margin: 0 0 1rem 0;
}

.card-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.card-list li {
  padding: 0.5rem 0;
  color: var(--text-color-secondary);
  border-bottom: 1px solid var(--border-color);
  position: relative;
  padding-left: 1.5rem;
}

.card-list li:last-child {
  border-bottom: none;
}

.card-list li::before {
  content: '•';
  color: var(--primary-color);
  position: absolute;
  left: 0;
  font-weight: bold;
}

/* 联系方式 */
.contact-section {
  margin-bottom: 2rem;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--card-background);
  border-radius: 8px;
  border-left: 4px solid var(--primary-color);
}

.contact-icon {
  color: var(--primary-color);
  flex-shrink: 0;
}

/* 深色主题适配 */
[data-theme="dark"] .step-item,
[data-theme="dark"] .requirement-card,
[data-theme="dark"] .contact-item {
  background: rgba(30, 41, 59, 0.8);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

[data-theme="dark"] .step-item:hover,
[data-theme="dark"] .requirement-card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .compliance-application-detail {
    padding: 1rem;
  }
  
  .header-content {
    flex-direction: column;
    align-items: stretch;
  }
  
  .action-buttons {
    justify-content: stretch;
  }
  
  .btn {
    flex: 1;
    justify-content: center;
  }
  
  .process-steps {
    grid-template-columns: 1fr;
  }
  
  .requirements-grid {
    grid-template-columns: 1fr;
  }
  
  .page-title {
    font-size: 1.5rem;
  }
}
</style>
