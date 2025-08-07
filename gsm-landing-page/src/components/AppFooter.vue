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
        <p class="footer-copyright">© 2025 智能网联汽车时空数据安全监测平台. 依据国家相关法律法规建设运营.</p>
      </div>
    </div>
  </footer>
</template>

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

.footer-copyright {
  font-size: 0.875rem;
  color: var(--gray-light);
  margin: 0;
}
</style>
