# 资源文件目录结构

本目录包含项目中使用的所有静态资源文件，按照类型进行分类管理。

## 目录结构

```
public/assets/
├── icons/          # 图标文件
│   ├── 微信图标.svg
│   ├── 企微_企微.svg
│   ├── 钉钉.svg
│   └── 飞书.svg
├── images/         # 图片文件
│   ├── hero-bg-1.jpg
│   ├── hero-bg-2.jpg
│   ├── hero-bg-3.jpg
│   ├── hero-bg-4.jpg
│   └── hero-bg-5.jpg
└── logos/          # 品牌Logo文件
    ├── amap.svg
    ├── baidu.svg
    ├── huawei.svg
    ├── tencent.svg
    └── ... (其他品牌logo)
```

## 使用说明

### 在代码中引用资源

所有资源文件都应该使用统一的路径格式：

- **图标文件**: `/assets/icons/文件名.svg`
- **图片文件**: `/assets/images/文件名.jpg`
- **Logo文件**: `/assets/logos/文件名.svg`

### 示例

```vue
<!-- 引用图标 -->
<img src="/assets/icons/微信图标.svg" alt="微信">

<!-- 引用背景图片 -->
<div :style="{ backgroundImage: 'url(/assets/images/hero-bg-1.jpg)' }">

<!-- 引用品牌Logo -->
<img :src="`/assets/logos/${logoName}.svg`" :alt="brandName">
```

## 文件管理规范

1. **图标文件** (`icons/`)
   - 用于第三方登录按钮、功能图标等
   - 推荐使用SVG格式
   - 文件命名应清晰明确

2. **图片文件** (`images/`)
   - 用于背景图片、装饰图片等
   - 支持JPG、PNG等格式
   - 建议压缩优化以提高加载速度

3. **Logo文件** (`logos/`)
   - 用于合作企业、品牌展示等
   - 推荐使用SVG格式
   - 文件名应与品牌标识一致

## 添加新资源

当需要添加新的资源文件时：

1. 将文件放置到对应的分类目录中
2. 使用统一的命名规范
3. 更新相关代码中的引用路径
4. 如有必要，更新本文档

## 注意事项

- 所有路径都是相对于项目根目录的绝对路径
- 确保文件名不包含特殊字符或空格
- 定期清理不再使用的资源文件
- 新增资源时注意文件大小，避免影响页面加载性能