<template>
  <section class="hero-section">
    <!-- 背景图片容器 -->
    <div class="hero-backgrounds">
      <div
        v-for="(image, index) in backgroundImages"
        :key="index"
        class="hero-background"
        :class="{
          active: index === currentImageIndex,
          loaded: isImageLoaded
        }"
        :style="{ backgroundImage: `url(${image})` }"
      ></div>
    </div>

    <div class="container">
      <div class="hero-content">
        <h1 class="hero-title">
          贯彻落实国家数据安全政策 构建智能网联汽车监管新体系
        </h1>
        <p class="hero-subtitle">
          依据《数据安全法》《个人信息保护法》等法律法规，建设"国家-属地-企业-终端"四级分布式监管架构，为政府监管部门提供专业服务，助力企业合规发展
        </p>
        <div class="hero-stats">
          <div class="stat-item">
            <span class="stat-number">100%</span>
            <span class="stat-label">政策合规覆盖</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">50万+</span>
            <span class="stat-label">监管车辆规模</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">30+</span>
            <span class="stat-label">重点企业接入</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">7×24</span>
            <span class="stat-label">全天候监管</span>
          </div>
        </div>
        <div class="hero-actions">
          <button class="btn btn-primary btn-large" @click="$router.push('/login/enterprise')">
            企业合规接入
          </button>
          <button class="btn btn-outline btn-large" @click="scrollToSection('features')">
            政策解读
          </button>
        </div>
      </div>
    </div>

    <!-- 图片指示器 -->
    <div class="hero-indicators">
      <button
        v-for="(image, index) in backgroundImages"
        :key="index"
        class="indicator"
        :class="{ active: index === currentImageIndex }"
        @click="currentImageIndex = index"
        :title="`背景图片 ${index + 1}`"
      ></button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 背景图片轮播功能
const backgroundImages = [
  '/hero-bg-1.jpg',
  '/hero-bg-2.jpg',
  '/hero-bg-3.jpg',
  '/hero-bg-4.jpg',
  '/hero-bg-5.jpg'
]

const currentImageIndex = ref(0)
const isImageLoaded = ref(false)

// 预加载所有图片
const preloadImages = () => {
  backgroundImages.forEach((src, index) => {
    const img = new Image()
    img.onload = () => {
      if (index === 0) {
        isImageLoaded.value = true
      }
    }
    img.src = src
  })
}

// 切换到下一张图片
const nextImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % backgroundImages.length
}

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

// 组件挂载时开始预加载和轮播
onMounted(() => {
  preloadImages()

  // 每10秒切换一次背景图片
  setInterval(nextImage, 10000)
})
</script>

<style scoped>
/* 英雄区域样式 */
.hero-section {
  padding: 8rem 0;
  text-align: center;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  position: relative;
  color: var(--text-color);
  overflow: hidden;
}

/* 背景图片容器 */
.hero-backgrounds {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

/* 单个背景图片 */
.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0;
  transition: opacity 1.5s ease-in-out;
  transform: scale(1.05);
  animation: backgroundZoom 16s infinite linear;
}

/* 激活状态的背景图片 */
.hero-background.active {
  opacity: 1;
}

/* 背景图片缩放动画 */
@keyframes backgroundZoom {
  0% { transform: scale(1.05); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1.05); }
}

/* 渐变遮罩层 - 降低透明度让图片更清晰 */
.hero-background::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(64, 158, 255, 0.08) 0%, rgba(64, 158, 255, 0.04) 100%);
  z-index: 1;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.75);
  z-index: 1;
  transition: background 0.3s ease;
}

[data-theme="dark"] .hero-section::before {
  background: rgba(17, 17, 17, 0.65);
}

.hero-section .container {
  position: relative;
  z-index: 2;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* 图片指示器 */
.hero-indicators {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 3;
}

.hero-indicators .indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.5);
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;
}

.hero-indicators .indicator:hover {
  border-color: rgba(255, 255, 255, 0.8);
  transform: scale(1.1);
}

.hero-indicators .indicator.active {
  background: rgba(255, 255, 255, 0.9);
  border-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

/* 深色主题下的指示器 */
[data-theme="dark"] .hero-indicators .indicator {
  border-color: rgba(255, 255, 255, 0.3);
}

[data-theme="dark"] .hero-indicators .indicator:hover {
  border-color: rgba(255, 255, 255, 0.6);
}

[data-theme="dark"] .hero-indicators .indicator.active {
  background: rgba(255, 255, 255, 0.8);
  border-color: rgba(255, 255, 255, 0.8);
}

.hero-content {
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-active) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.hero-subtitle {
  font-size: 1.35rem;
  margin-bottom: 3rem;
  color: var(--text-color-regular);
  line-height: 1.6;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  font-weight: 500;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.stat-item {
  text-align: center;
  min-width: 120px;
}

.stat-number {
  display: block;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--text-color-secondary);
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
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

.btn:hover {
  transform: translateY(-1px);
}

.btn-primary {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.btn-primary:hover {
  background: var(--primary-hover);
  border-color: var(--primary-hover);
}

.btn-outline {
  color: var(--primary-color);
  border-color: var(--primary-color);
}

.btn-outline:hover {
  background: var(--primary-color);
  color: white;
}

.btn-large {
  padding: 0.75rem 2rem;
  font-size: 1rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-stats {
    gap: 1.5rem;
  }

  .hero-section {
    padding: 4rem 0;
  }
}
</style>
