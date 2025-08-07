import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 创建简单的SVG logo
function createSVGLogo(text, bgColor, textColor) {
  return `<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <rect width="64" height="64" rx="8" fill="${bgColor}"/>
  <text x="32" y="40" font-family="Arial, sans-serif" font-size="18" font-weight="bold" text-anchor="middle" fill="${textColor}">${text}</text>
</svg>`;
}

// 企业logo配置
const logos = [
  // 传统汽车厂商
  { name: 'faw', text: '一汽', bgColor: '#1e40af', textColor: '#ffffff' },
  { name: 'saic', text: '上汽', bgColor: '#dc2626', textColor: '#ffffff' },
  { name: 'dongfeng', text: '东风', bgColor: '#059669', textColor: '#ffffff' },
  { name: 'baic', text: '北汽', bgColor: '#7c3aed', textColor: '#ffffff' },
  { name: 'gac', text: '广汽', bgColor: '#ea580c', textColor: '#ffffff' },
  { name: 'changan', text: '长安', bgColor: '#0891b2', textColor: '#ffffff' },
  { name: 'geely', text: '吉利', bgColor: '#1d4ed8', textColor: '#ffffff' },
  { name: 'gwm', text: '长城', bgColor: '#be123c', textColor: '#ffffff' },
  
  // 新能源汽车厂商
  { name: 'byd', text: 'BYD', bgColor: '#16a34a', textColor: '#ffffff' },
  { name: 'nio', text: 'NIO', bgColor: '#3b82f6', textColor: '#ffffff' },
  { name: 'xpeng', text: '小鹏', bgColor: '#f59e0b', textColor: '#ffffff' },
  { name: 'li', text: '理想', bgColor: '#8b5cf6', textColor: '#ffffff' },
  { name: 'leapmotor', text: '零跑', bgColor: '#06b6d4', textColor: '#ffffff' },
  { name: 'xiaomi', text: '小米', bgColor: '#ff6600', textColor: '#ffffff' },
  
  // 地图服务商
  { name: 'baidu', text: '百度', bgColor: '#2563eb', textColor: '#ffffff' },
  { name: 'amap', text: '高德', bgColor: '#10b981', textColor: '#ffffff' },
  { name: 'tencent', text: '腾讯', bgColor: '#1e40af', textColor: '#ffffff' },
  { name: 'navinfo', text: '四维', bgColor: '#7c2d12', textColor: '#ffffff' },
  
  // 智驾方案提供商
  { name: 'huawei', text: '华为', bgColor: '#dc2626', textColor: '#ffffff' },
  { name: 'horizon', text: '地平线', bgColor: '#0d9488', textColor: '#ffffff' },
  { name: 'sensetime', text: '商汤', bgColor: '#7c3aed', textColor: '#ffffff' },
  { name: 'weride', text: '文远', bgColor: '#059669', textColor: '#ffffff' }
];

// 创建logos目录
const logosDir = path.join(__dirname, 'public', 'logos');
if (!fs.existsSync(logosDir)) {
  fs.mkdirSync(logosDir, { recursive: true });
}

// 生成SVG文件
logos.forEach(logo => {
  const svgContent = createSVGLogo(logo.text, logo.bgColor, logo.textColor);
  const filePath = path.join(logosDir, `${logo.name}.svg`);
  fs.writeFileSync(filePath, svgContent);
  console.log(`Created logo: ${logo.name}.svg`);
});

console.log('All logos created successfully!');
