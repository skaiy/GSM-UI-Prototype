# 政府大屏页面组件拆分 & 全局主题样式抽离 - 变更日志（2025-08-12）

## 背景
为提升后续页面/组件的复用性与一致性，将 GovernmentDashboard.vue 中的 Header 与二级菜单抽离为独立组件，并将分散在页面内的主题 CSS 变量统一到全局主题样式表中，供全站复用。

## 变更内容

### 1. 组件拆分
- 新增通用头部组件：`src/components/common/DashboardHeader.vue`
  - 功能：品牌标识、主导航、主题切换、用户信息/退出
  - API：
    - Props: `isDark:boolean`, `mainMenus:{key,label}[]`, `activeMainMenu:string`, `userName?:string`
    - Emits: `toggle-theme`, `menu-select(key)`, `logout`
- 新增通用左侧二级菜单组件：`src/components/common/SideSubMenu.vue`
  - 功能：通用左侧列表式二级菜单，带 hover/active 态
  - API：
    - Props: `title?:string`, `items:{key,label,color?}[]`, `activeKey:string`
    - Emits: `select(key)`

### 2. 页面改造
- `src/components/GovernmentDashboard.vue`
  - 将原顶部 Header 替换为 `<DashboardHeader />` 复用组件
  - 移除页面内自定义的主题变量定义，改为使用全局主题变量

### 3. 全局主题样式
- 新增全局主题样式表：`src/assets/theme.css`
  - 提供深浅两套主题变量：`--primary-color`、`--text-color`、`--background-color`、`--card-bg`、`--gradient-primary` 等
  - 统一在 `src/assets/main.css` 中通过 `@import './theme.css'` 全局加载
- 清理 `src/App.vue` 内的重复主题变量定义，避免与 `theme.css` 冲突

## 使用说明
- 任何页面/组件中，直接使用 `var(--primary-color)`、`var(--text-color)`、`var(--card-bg)` 等变量
- 主题切换：设置 `document.documentElement.dataset.theme = 'dark' | 'light'`
  - 示例：`GovernmentDashboard.vue` 内已有 `toggleTheme` 完整实现
- 二级菜单示例：
  ```vue
  <SideSubMenu
    title="功能菜单"
    :items="[{ key:'a', label:'子项A' }, { key:'b', label:'子项B' }]"
    :active-key="active"
    @select="active = $event"
  />
  ```

## 验证
- 构建：已执行一次 `vite build`，构建成功（作为快速有效的本地验证信号）
- 说明：如需更严格的类型检查，可执行 `npm run type-check`（环境需具备 npm/node）

## 影响范围
- 政府大屏页面顶部区域、主题变量来源发生调整
- 其他页面可直接复用新建组件与主题变量，提升一致性

## 后续建议
- 根据需要将 `SideSubMenu` 接入具体页面布局（如政府大屏左侧）
- 将 Landing/Login 等页面旧变量逐步统一为 `theme.css`，减少冗余
- 如需路由联动的菜单数据结构，可再补充约定/类型定义

