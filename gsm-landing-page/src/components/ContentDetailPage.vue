<template>
  <div class="content-detail-page">
    <!-- 导航栏 -->
    <LandingHeader />

    <!-- 主要内容区域 -->
    <main class="main-content">
      <!-- 面包屑导航 -->
      <div class="breadcrumb-container">
        <div class="container">
          <nav class="breadcrumb">
            <a href="/" class="breadcrumb-link" @click.prevent="goHome">首页</a>
            <span class="breadcrumb-separator">/</span>
            <span class="breadcrumb-current">{{ breadcrumbText }}</span>
          </nav>
        </div>
      </div>

      <!-- 内容详情区域 -->
      <div class="content-container">
        <div class="container">
          <div class="content-wrapper">
            <!-- 动态组件渲染 -->
            <component :is="currentComponent" :content-data="contentData" />
          </div>
        </div>
      </div>
    </main>

    <!-- 页脚 -->
    <LandingFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import LandingHeader from './LandingHeader.vue'
import LandingFooter from './LandingFooter.vue'
import ComplianceApplicationDetail from './ComplianceApplicationDetail.vue'
import PolicyDetailPage from './PolicyDetailPage.vue'

const route = useRoute()
const router = useRouter()

// 内容数据
const contentData = ref<any>({})

// 当前组件
const currentComponent = computed(() => {
  const type = route.params.type as string
  switch (type) {
    case 'compliance':
      return ComplianceApplicationDetail
    case 'policy':
      return PolicyDetailPage
    default:
      return ComplianceApplicationDetail
  }
})

// 面包屑文本
const breadcrumbText = computed(() => {
  const type = route.params.type as string
  switch (type) {
    case 'compliance':
      return '企业合规接入申请'
    case 'policy':
      return '政策法规详情'
    default:
      return '内容详情'
  }
})

// 返回首页
const goHome = () => {
  window.open('/', '_blank')
}

// 组件挂载时初始化数据
onMounted(() => {
  // 根据路由参数加载对应的内容数据
  const type = route.params.type as string
  const id = route.params.id as string
  
  // 这里可以根据实际需求从API获取数据
  // 目前使用模拟数据
  loadContentData(type, id)
})

// 加载内容数据
const loadContentData = (type: string, id: string) => {
  // 模拟数据加载
  if (type === 'compliance') {
    contentData.value = {
      title: '智能网联汽车时空数据安全合规接入申请',
      type: 'compliance',
      id: id || 'default'
    }
  } else if (type === 'policy') {
    contentData.value = {
      title: '政策法规与实施动态',
      type: 'policy',
      id: id || 'default'
    }
  }
}
</script>

<style scoped>
/* 页面基础样式 */
.content-detail-page {
  min-height: 100vh;
  background: var(--background-color);
  color: var(--text-color);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.main-content {
  flex: 1;
  padding-top: 0;
}

/* 面包屑导航样式 */
.breadcrumb-container {
  background: var(--background-color);
  border-bottom: 1px solid var(--border-color);
  padding: 1rem 0;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.breadcrumb-link {
  color: var(--primary-color);
  text-decoration: none;
  transition: color 0.2s ease;
}

.breadcrumb-link:hover {
  color: var(--primary-hover);
}

.breadcrumb-separator {
  color: var(--text-color-secondary);
}

.breadcrumb-current {
  color: var(--text-color);
  font-weight: 500;
}

/* 内容容器样式 */
.content-container {
  padding: 2rem 0;
  min-height: 60vh;
}

.content-wrapper {
  background: var(--card-background);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

/* 深色主题适配 */
[data-theme="dark"] .breadcrumb-container {
  background: rgba(15, 23, 42, 0.95);
  border-bottom: 1px solid rgba(51, 65, 85, 0.6);
}

[data-theme="dark"] .content-wrapper {
  background: rgba(30, 41, 59, 0.8);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }
  
  .content-container {
    padding: 1rem 0;
  }
}
</style>
