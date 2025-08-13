# Shadcn-vue 配置说明

## 当前状态

已完成 shadcn-vue 的基础安装和配置，但由于项目使用的是 TailwindCSS 4.1.11（最新版本），与 shadcn-vue 默认支持的 TailwindCSS 3.x 存在兼容性问题。

## 已安装的依赖

```json
{
  "@vueuse/core": "已安装",
  "class-variance-authority": "已安装",
  "clsx": "已安装",
  "radix-vue": "已安装",
  "tailwind-merge": "已安装"
}
```

## 已创建的文件

1. **配置文件**
   - `components.json` - shadcn-vue 配置文件
   - `src/lib/utils.ts` - 工具函数

2. **组件文件**
   - `src/components/ui/button/` - Button 组件
   - `src/components/ui/button/index.ts` - 组件导出和样式定义
   - `src/components/ui/button/button.vue` - 组件实现

3. **测试页面**
   - `/test/shadcn` - 基础测试页面
   - `/test/shadcn-standalone` - 独立测试页面

## 兼容性问题

### 问题描述
- TailwindCSS 4.x 改变了很多内部实现，导致 shadcn-vue 的样式系统无法正常工作
- CSS 变量系统在 TailwindCSS 4.x 中的处理方式有所不同
- 颜色系统的定义方式发生了变化

### 解决方案

有以下几种选择：

1. **降级 TailwindCSS 到 3.x 版本**（推荐）
   ```bash
   npm uninstall tailwindcss @tailwindcss/postcss
   npm install -D tailwindcss@^3.4.0 autoprefixer@^10.4.0 postcss@^8.4.0
   ```

2. **等待 shadcn-vue 官方支持 TailwindCSS 4.x**
   - 目前 shadcn-vue 团队正在开发对 TailwindCSS 4.x 的支持

3. **手动适配样式**
   - 需要重写所有组件的样式定义
   - 工作量较大，不推荐

## 建议

为了能够正常使用 shadcn-vue，建议暂时降级 TailwindCSS 到 3.x 版本。这样可以：
- 立即使用所有 shadcn-vue 组件
- 保持与 shadcn-vue 生态系统的兼容性
- 等待官方支持后再升级到 TailwindCSS 4.x

## 后续步骤

如果决定降级 TailwindCSS：
1. 执行上述降级命令
2. 恢复 tailwind.config.js 为 TailwindCSS 3.x 格式
3. 调整 CSS 文件中的配置
4. 重新测试 shadcn-vue 组件