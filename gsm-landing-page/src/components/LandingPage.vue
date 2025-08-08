<template>
  <div class="landing-page">
    <!-- 导航栏 -->
    <LandingHeader />

    <!-- 主要内容区域 -->
    <main class="main-content">
      <!-- 英雄区域 -->
      <HeroSection />

      <!-- 政策动态 -->
      <NewsSection />

      <!-- 实时数据监控面板 -->
      <RealTimeStatsSection />

      <!-- 平台特色功能 -->
      <FeaturesSection />

      <!-- 运营数据展示 -->
      <StatsSection />

      <!-- 服务企业展示 -->
      <EnterprisesSection />
    </main>

    <!-- 页脚 -->
    <LandingFooter />
  </div>
</template>

<script setup lang="ts">
import LandingHeader from './LandingHeader.vue'
import HeroSection from './HeroSection.vue'
import NewsSection from './NewsSection.vue'
import RealTimeStatsSection from './RealTimeStatsSection.vue'
import FeaturesSection from './FeaturesSection.vue'
import StatsSection from './StatsSection.vue'
import EnterprisesSection from './EnterprisesSection.vue'
import LandingFooter from './LandingFooter.vue'
</script>

<style scoped>
.landing-page {
  min-height: 100vh;
  background: var(--background-color);
  width: 100%;
}

/* VitePress风格的CSS变量系统 */
:root {
  --vp-c-text-1: rgba(60, 60, 67);
  --vp-c-text-2: rgba(60, 60, 67, .78);
  --vp-c-text-3: rgba(60, 60, 67, .56);
  --vp-c-border: #c2c2c4;
  --vp-c-bg: #ffffff;
  --vp-c-bg-alt: #f6f6f7;
  --vp-c-brand-1: var(--primary-color, #409EFF);
  --vp-c-brand-2: var(--primary-hover, #66b1ff);
  --vp-c-brand-3: var(--primary-active, #3a8ee6);
}

[data-theme="dark"] {
  --vp-c-text-1: rgba(255, 255, 245, .86);
  --vp-c-text-2: rgba(235, 235, 245, .6);
  --vp-c-text-3: rgba(235, 235, 245, .38);
  --vp-c-border: #3c3f44;
  --vp-c-bg: #1b1b1f;
  --vp-c-bg-alt: #161618;
  --vp-c-brand-1: var(--primary-color, #409EFF);
  --vp-c-brand-2: var(--primary-hover, #66b1ff);
  --vp-c-brand-3: var(--primary-active, #3a8ee6);
}
</style>
