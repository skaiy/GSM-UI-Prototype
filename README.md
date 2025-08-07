# 智能网联汽车时空数据安全监测平台 - UI原型

[![Vue.js](https://img.shields.io/badge/Vue.js-3.5.18-4FC08D?style=flat-square&logo=vue.js)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.0-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.0.6-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

## 📋 项目概述

**智能网联汽车时空数据安全监测平台**（GSM - Geo-Spatial data security Monitoring platform）是一个面向智能网联汽车时空数据安全监管的国家级基础设施平台，旨在构建"国家-属地-企业-终端"四级分布式监管架构。

本项目为平台的**UI原型系统**，包含Landing Page展示页面和核心业务组件，用于展示平台的核心功能、服务能力和运营成果。

### 🎯 核心使命

- **数据安全监管**: 对智能网联汽车时空数据处理活动进行全生命周期监测
- **风险预警防控**: 实时识别违规采集、超范围传输、越权访问等安全风险  
- **合规服务支撑**: 为企业提供政策解读、风险评估、合规指导等服务
- **产业生态赋能**: 推动智能网联汽车产业健康发展

## 🏗️ 项目架构

### 技术栈

- **前端框架**: Vue 3.5.18 + Composition API
- **开发语言**: TypeScript 5.8.0
- **构建工具**: Vite 7.0.6
- **状态管理**: Pinia 3.0.3
- **路由管理**: Vue Router 4.5.1
- **开发工具**: Vue DevTools 8.0.0

### 项目结构

```
01.GSM-UI-Prototype/
├── gsm-landing-page/              # 主应用目录
│   ├── src/
│   │   ├── components/            # Vue组件
│   │   │   ├── AppHeader.vue      # 应用头部导航
│   │   │   ├── AppFooter.vue      # 应用页脚
│   │   │   ├── HeroSection.vue    # 英雄区域
│   │   │   ├── FeaturesSection.vue # 功能特色展示
│   │   │   ├── StatsSection.vue   # 运营数据统计
│   │   │   ├── EnterprisesSection.vue # 服务企业展示
│   │   │   ├── NewsSection.vue    # 政策动态新闻
│   │   │   ├── LandingPage.vue    # 主页面组件
│   │   │   └── LoginPage.vue      # 登录页面
│   │   ├── assets/                # 静态资源
│   │   ├── App.vue               # 根组件
│   │   └── main.ts               # 应用入口
│   ├── public/                   # 公共资源
│   │   ├── hero-bg-*.jpg         # 背景图片
│   │   ├── logo.svg              # 平台Logo
│   │   └── favicon.ico           # 网站图标
│   ├── docs/                     # 项目文档
│   │   └── 信息架构分析.md        # 信息架构分析
│   ├── package.json              # 项目配置
│   ├── vite.config.ts            # Vite配置
│   └── README.md                 # 子项目说明
├── platform-analysis/            # 平台分析文档
│   └── 地理信息安全监测平台-业务架构分析.md
├── task-records/                 # 任务记录
│   ├── 20250805-1430-landing-page-creation.md
│   └── 20250805-2130-reka-ui-component-fix.md
├── .gitignore                    # Git忽略配置
└── README.md                     # 项目主文档
```

## 🚀 快速开始

### 环境要求

- **Node.js**: ^20.19.0 || >=22.12.0
- **npm**: 最新版本
- **Git**: 用于版本控制

### 安装与运行

1. **克隆项目**
   ```bash
   git clone https://github.com/skaiy/GSM-UI-Prototype.git
   cd GSM-UI-Prototype
   ```

2. **进入主应用目录**
   ```bash
   cd gsm-landing-page
   ```

3. **安装依赖**
   ```bash
   npm install
   ```

4. **启动开发服务器**
   ```bash
   npm run dev
   ```

5. **访问应用**
   ```
   http://localhost:5173
   ```

### 构建部署

```bash
# 类型检查
npm run type-check

# 生产构建
npm run build

# 预览构建结果
npm run preview
```

## 🎨 功能特性

### Landing Page 核心模块

1. **导航系统**
   - 支持政府端/企业端分别登录
   - 响应式导航菜单
   - 主题切换功能

2. **英雄区域**
   - 平台核心价值展示
   - 关键数据统计
   - 动态背景轮播

3. **功能特色**
   - 6大核心能力展示
   - 地理围栏、风险预警、备案管理等
   - 图标化功能说明

4. **运营数据**
   - 6项关键指标展示
   - 接入车辆、服务企业、监管架构等
   - 实时数据可视化

5. **服务企业**
   - 12家典型企业展示
   - 按类型分类标识
   - 企业Logo展示

6. **政策动态**
   - 6条最新政策法规
   - 行业动态资讯
   - 时间线展示

### 设计特性

- **响应式设计**: 支持PC端和移动端访问
- **主题系统**: Light/Dark模式切换
- **现代化UI**: 基于现代设计规范
- **无障碍访问**: 符合Web无障碍标准

## 🏛️ 业务架构

### 四级监管体系

```
国家监管中心 (国家级)
    ↓
属地监管中心 (省市级)
    ↓
企业监管节点 (企业级)
    ↓
终端节点 (车辆级)
```

### 用户体系

**政府端用户**
- 超级管理员、安全监测员、审核专员
- 监督检查员、数据分析员

**企业端用户**  
- 管理员、操作员、审计员

### 服务企业类型

- **整车企业**: 北汽、吉利、上汽、长城、东风等
- **地图服务商**: 高德、百度、腾讯等
- **智驾技术公司**: 自动驾驶解决方案提供商
- **平台运营商**: 车联网平台、出行服务平台

## 📊 平台数据

### 建设目标

- **接入车辆**: 不少于50万辆
- **服务企业**: 不少于30家
- **覆盖率**: 行业主要企业80%以上
- **市场占有率**: 30%以上

### 技术指标

- **实时数据更新**: 3分钟内
- **历史数据分析**: 7分钟内  
- **数据存储能力**: PB级
- **并发处理能力**: 千万级车辆

## 🔧 开发指南

### 代码规范

- 使用 TypeScript 进行类型安全开发
- 遵循 Vue 3 Composition API 最佳实践
- 组件化开发，单一职责原则
- 使用 ESLint 和 Prettier 进行代码格式化

### 主题系统

项目支持Light/Dark双主题模式：

```css
:root {
  /* Light theme */
  --primary-color: #409EFF;
  --background-color: #FFFFFF;
  --text-color: #303133;
}

[data-theme="dark"] {
  /* Dark theme */
  --primary-color: #3D63DD;
  --background-color: #111111;
  --text-color: #e4e7ed;
}
```

### 组件开发

```vue
<template>
  <div class="component-name">
    <!-- 组件内容 -->
  </div>
</template>

<script setup lang="ts">
// 使用 Composition API
import { ref, computed } from 'vue'

// 组件逻辑
</script>

<style scoped>
/* 组件样式 */
</style>
```

## 📚 文档资源

- [信息架构分析](./gsm-landing-page/docs/信息架构分析.md)
- [业务架构分析](./platform-analysis/地理信息安全监测平台-业务架构分析.md)
- [开发任务记录](./task-records/)

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 📞 联系方式

- **项目仓库**: [https://github.com/skaiy/GSM-UI-Prototype](https://github.com/skaiy/GSM-UI-Prototype)
- **问题反馈**: [GitHub Issues](https://github.com/skaiy/GSM-UI-Prototype/issues)

## 🙏 致谢

感谢所有为智能网联汽车数据安全事业做出贡献的开发者和研究人员。

---

**智能网联汽车时空数据安全监测平台** - 构建安全可信的智能出行生态