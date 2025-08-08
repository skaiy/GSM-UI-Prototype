# 🚀 项目部署指南

本文档介绍如何将GSM时空数据安全监测平台快速部署到互联网，让客户可以在线访问。

## 📋 部署前准备

确保项目可以正常构建：
```bash
npm run build
```

## 🌟 方案一：Vercel部署 (推荐)

### 优势
- ✅ 完全免费
- ✅ 自动部署
- ✅ 全球CDN加速
- ✅ 支持自定义域名
- ✅ HTTPS自动配置

### 部署步骤

#### 1. 命令行部署 (最快)
```bash
# 登录Vercel (首次使用需要注册)
vercel login

# 部署项目
vercel

# 生产环境部署
vercel --prod
```

#### 2. GitHub集成部署
1. 将代码推送到GitHub仓库
2. 访问 [vercel.com](https://vercel.com)
3. 使用GitHub账号登录
4. 点击"New Project"导入GitHub仓库
5. 自动检测为Vite项目，点击"Deploy"

### 部署后
- 获得免费的 `.vercel.app` 域名
- 每次推送代码自动重新部署
- 可绑定自定义域名

---

## 🔥 方案二：Netlify部署

### 优势
- ✅ 免费额度充足
- ✅ 拖拽部署
- ✅ 表单处理功能
- ✅ 分支预览

### 部署步骤
1. 构建项目：`npm run build`
2. 访问 [netlify.com](https://netlify.com)
3. 拖拽 `dist` 文件夹到部署区域
4. 或连接GitHub仓库自动部署

---

## ⚡ 方案三：GitHub Pages

### 优势
- ✅ 完全免费
- ✅ 与GitHub仓库集成
- ✅ 简单易用

### 部署步骤
1. 安装gh-pages：`npm install --save-dev gh-pages`
2. 在package.json添加部署脚本：
   ```json
   {
     "scripts": {
       "deploy": "npm run build && gh-pages -d dist"
     }
   }
   ```
3. 运行：`npm run deploy`
4. 在GitHub仓库设置中启用Pages

---

## 🏢 方案四：阿里云/腾讯云

### 适用场景
- 需要备案的正式项目
- 企业级部署需求
- 需要服务器端功能

### 部署步骤
1. 购买云服务器
2. 安装Nginx
3. 上传构建后的文件到服务器
4. 配置域名和SSL证书

---

## 📱 快速体验链接

部署完成后，您将获得类似以下的访问链接：

- **Vercel**: `https://your-project.vercel.app`
- **Netlify**: `https://your-project.netlify.app`
- **GitHub Pages**: `https://username.github.io/repository-name`

## 🔧 自定义域名配置

所有平台都支持绑定自定义域名：

1. 在部署平台添加自定义域名
2. 在域名DNS设置中添加CNAME记录
3. 等待DNS生效（通常几分钟到几小时）

## 📊 推荐选择

| 需求场景 | 推荐方案 | 理由 |
|---------|---------|------|
| 快速演示 | Vercel | 最快速，性能最好 |
| 长期使用 | Vercel/Netlify | 稳定可靠，功能丰富 |
| 企业项目 | 阿里云/腾讯云 | 可备案，更多控制权 |
| 开源项目 | GitHub Pages | 与代码仓库集成 |

## 🎯 下一步

选择合适的部署方案后：
1. 测试所有功能是否正常
2. 配置自定义域名（可选）
3. 设置监控和分析
4. 分享链接给客户

---

**💡 提示**: 推荐使用Vercel，只需要一条命令 `vercel` 就能完成部署！