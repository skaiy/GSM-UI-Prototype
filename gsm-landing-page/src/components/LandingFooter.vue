<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h4 class="footer-title">智能网联汽车时空数据安全监测平台</h4>
          <p class="footer-desc">贯彻落实国家数据安全政策，服务政府监管，助力企业合规</p>
        </div>
        <div class="footer-section">
          <h4 class="footer-title">服务导航</h4>
          <div class="footer-links">
            <a href="#features">政策服务</a>
            <a href="#stats">监管成效</a>
            <a href="#news">法规动态</a>
            <a href="#enterprises">合规企业</a>
          </div>
        </div>
        <div class="footer-section">
          <h4 class="footer-title">服务支持</h4>
          <p class="footer-contact">政策咨询：policy@gsm-platform.gov.cn</p>
          <p class="footer-contact">技术支持：support@gsm-platform.gov.cn</p>
          <p class="footer-contact">监管服务：regulation@gsm-platform.gov.cn</p>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="government-links">
          <div class="flex items-center space-x-4">
            <span class="text-sm text-slate-400">相关链接:</span>
            <a
              href="https://www.miit.gov.cn"
              class="flex items-center space-x-1 text-slate-400 hover:text-white transition-colors duration-200 text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>工信部</span>
              <ExternalLinkIcon class="w-3 h-3" />
            </a>
            <a
              href="https://www.mot.gov.cn"
              class="flex items-center space-x-1 text-slate-400 hover:text-white transition-colors duration-200 text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>交通运输部</span>
              <ExternalLinkIcon class="w-3 h-3" />
            </a>
            <a
              href="https://www.mnr.gov.cn"
              class="flex items-center space-x-1 text-slate-400 hover:text-white transition-colors duration-200 text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>自然资源部</span>
              <ExternalLinkIcon class="w-3 h-3" />
            </a>
          </div>
        </div>
        <p class="footer-copyright">© 2025 智能网联汽车时空数据安全监测平台. 依据国家相关法律法规建设运营.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { markRaw, h } from 'vue'

// 外部链接图标组件（使用渲染函数）
const ExternalLinkIcon = markRaw({
  render() {
    return h('svg', {
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }, [
      h('path', { d: 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6' }),
      h('polyline', { points: '15,3 21,3 21,9' }),
      h('line', { x1: '10', y1: '14', x2: '21', y2: '3' })
    ])
  }
})
</script>

<style scoped>
/* 页脚样式 */
.footer {
  padding: 4rem 0 2rem;
  background: var(--text-color);
  color: var(--background-color);
  width: 100vw;
  margin-left: calc(-50vw + 50%);
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--background-color);
}

.footer-desc, .footer-contact {
  font-size: 0.875rem;
  color: var(--gray-light);
  margin-bottom: 0.5rem;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-links a {
  font-size: 0.875rem;
  color: var(--gray-light);
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: var(--primary-color);
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid var(--gray-color);
}

.government-links {
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
}

.government-links .flex {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.government-links .space-x-4 > * + * {
  margin-left: 1rem;
}

.government-links .space-x-1 > * + * {
  margin-left: 0.25rem;
}

.government-links .text-sm {
  font-size: 0.875rem;
}

.government-links .text-slate-400 {
  color: var(--gray-light);
}

.government-links a {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: var(--gray-light);
  text-decoration: none;
  transition: color 0.2s ease;
}

.government-links a:hover {
  color: var(--background-color);
}

.government-links .w-3 {
  width: 0.75rem;
  height: 0.75rem;
}

.footer-copyright {
  font-size: 0.875rem;
  color: var(--gray-light);
  margin: 0;
}

/* 暗色主题下的样式调整 */
[data-theme="dark"] .footer {
  background: rgba(15, 23, 42, 0.95);
  border-top: 1px solid rgba(51, 65, 85, 0.6);
}

[data-theme="dark"] .footer-title {
  color: #f8fafc;
}

[data-theme="dark"] .footer-desc,
[data-theme="dark"] .footer-contact {
  color: #94a3b8;
}

[data-theme="dark"] .footer-links a {
  color: #94a3b8;
}

[data-theme="dark"] .footer-links a:hover {
  color: #60a5fa;
}

[data-theme="dark"] .footer-bottom {
  border-top: 1px solid rgba(51, 65, 85, 0.6);
}

[data-theme="dark"] .government-links .text-slate-400 {
  color: #94a3b8;
}

[data-theme="dark"] .government-links a {
  color: #94a3b8;
}

[data-theme="dark"] .government-links a:hover {
  color: #f8fafc;
}

[data-theme="dark"] .footer-copyright {
  color: #94a3b8;
}
</style>
