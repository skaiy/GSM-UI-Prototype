<template>
  <div class="qr-scan-overlay" @click="handleOverlayClick">
    <div class="qr-scan-modal" @click.stop>
      <div class="qr-scan-header">
        <h3 class="qr-scan-title">{{ platformName }}扫码登录</h3>
        <button class="close-btn" @click="$emit('close')">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      
      <div class="qr-scan-content">
        <div class="qr-code-container">
          <div class="qr-code">
            <!-- 模拟二维码 -->
            <div class="qr-pattern">
              <div class="qr-corner top-left"></div>
              <div class="qr-corner top-right"></div>
              <div class="qr-corner bottom-left"></div>
              <div class="qr-dots">
                <div v-for="i in 64" :key="i" class="qr-dot"></div>
              </div>
            </div>
          </div>
          <div class="qr-scan-line" :class="{ scanning: isScanning }"></div>
        </div>
        
        <div class="qr-instructions">
          <div class="platform-icon">{{ platformIcon }}</div>
          <p class="instruction-text">请使用{{ platformName }}扫描二维码</p>
          <p class="instruction-sub">扫码后在手机上确认登录</p>
        </div>
        
        <div class="qr-actions">
          <button class="refresh-btn" @click="refreshQR">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="23 4 23 10 17 10"></polyline>
              <polyline points="1 20 1 14 7 14"></polyline>
              <path d="m3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
            </svg>
            刷新二维码
          </button>
          <button class="back-btn" @click="$emit('close')">返回登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

interface Props {
  platform: 'wechat' | 'work-wechat' | 'dingtalk' | 'feishu'
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
}>()

const isScanning = ref(false)
let scanInterval: number | null = null

const platformConfig = {
  wechat: { name: '微信', icon: '💬' },
  'work-wechat': { name: '企业微信', icon: '💼' },
  dingtalk: { name: '钉钉', icon: '📱' },
  feishu: { name: '飞书', icon: '🚀' }
}

const platformName = computed(() => platformConfig[props.platform].name)
const platformIcon = computed(() => platformConfig[props.platform].icon)

const handleOverlayClick = () => {
  emit('close')
}

const refreshQR = () => {
  isScanning.value = true
  setTimeout(() => {
    isScanning.value = false
  }, 2000)
}

onMounted(() => {
  // 模拟扫描动画
  scanInterval = setInterval(() => {
    isScanning.value = true
    setTimeout(() => {
      isScanning.value = false
    }, 1000)
  }, 3000)
})

onBeforeUnmount(() => {
  if (scanInterval) {
    clearInterval(scanInterval)
  }
})
</script>

<style scoped>
.qr-scan-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.qr-scan-modal {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.qr-scan-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #f0f0f0;
  background: #fafafa;
}

.qr-scan-title {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  color: #666;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: #f0f0f0;
  color: #333;
}

.qr-scan-content {
  padding: 2rem 1.5rem;
  text-align: center;
}

.qr-code-container {
  position: relative;
  display: inline-block;
  margin-bottom: 1.5rem;
}

.qr-code {
  width: 200px;
  height: 200px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  position: relative;
  overflow: hidden;
}

.qr-pattern {
  width: 100%;
  height: 100%;
  position: relative;
  background: 
    repeating-linear-gradient(
      0deg,
      #000 0px,
      #000 2px,
      transparent 2px,
      transparent 4px
    ),
    repeating-linear-gradient(
      90deg,
      #000 0px,
      #000 2px,
      transparent 2px,
      transparent 4px
    );
}

.qr-corner {
  position: absolute;
  width: 30px;
  height: 30px;
  border: 3px solid #000;
}

.qr-corner.top-left {
  top: 10px;
  left: 10px;
  border-right: none;
  border-bottom: none;
}

.qr-corner.top-right {
  top: 10px;
  right: 10px;
  border-left: none;
  border-bottom: none;
}

.qr-corner.bottom-left {
  bottom: 10px;
  left: 10px;
  border-right: none;
  border-top: none;
}

.qr-dots {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 2px;
  width: 80px;
  height: 80px;
}

.qr-dot {
  width: 8px;
  height: 8px;
  background: #000;
  border-radius: 1px;
}

.qr-dot:nth-child(odd) {
  opacity: 0.8;
}

.qr-scan-line {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #409eff, transparent);
  transform: translateY(-2px);
  transition: transform 2s ease-in-out;
}

.qr-scan-line.scanning {
  transform: translateY(200px);
}

.qr-instructions {
  margin-bottom: 1.5rem;
}

.platform-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.instruction-text {
  font-size: 1rem;
  font-weight: 500;
  color: #333;
  margin: 0 0 0.25rem 0;
}

.instruction-sub {
  font-size: 0.875rem;
  color: #666;
  margin: 0;
}

.qr-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.refresh-btn,
.back-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  background: white;
  color: #666;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.refresh-btn:hover {
  border-color: #409eff;
  color: #409eff;
}

.back-btn:hover {
  background: #f5f5f5;
}

/* 暗色主题 */
[data-theme="dark"] .qr-scan-modal {
  background: #2a2a2a;
  color: #e0e0e0;
}

[data-theme="dark"] .qr-scan-header {
  background: #333;
  border-bottom-color: #444;
}

[data-theme="dark"] .qr-scan-title {
  color: #e0e0e0;
}

[data-theme="dark"] .close-btn {
  color: #ccc;
}

[data-theme="dark"] .close-btn:hover {
  background: #444;
  color: #e0e0e0;
}

[data-theme="dark"] .qr-code {
  background: #f0f0f0;
}

[data-theme="dark"] .instruction-text {
  color: #e0e0e0;
}

[data-theme="dark"] .instruction-sub {
  color: #999;
}

[data-theme="dark"] .refresh-btn,
[data-theme="dark"] .back-btn {
  background: #333;
  border-color: #555;
  color: #ccc;
}

[data-theme="dark"] .refresh-btn:hover {
  border-color: #409eff;
  color: #409eff;
}

[data-theme="dark"] .back-btn:hover {
  background: #444;
}
</style>