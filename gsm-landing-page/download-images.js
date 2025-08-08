import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 图片URL列表 (这些是示例URL，实际需要替换为真实的高清图片URL)
const imageUrls = [
  {
    url: 'https://images.pexels.com/photos/2366010/pexels-photo-2366010.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
    filename: 'hero-bg-1.jpg',
    description: '地球卫星视图'
  },
  {
    url: 'https://images.pexels.com/photos/30596263/pexels-photo-30596263.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
    filename: 'hero-bg-2.jpg',
    description: '夜晚地球亚洲视图'
  },
  {
    url: 'https://images.pexels.com/photos/8566572/pexels-photo-8566572.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
    filename: 'hero-bg-3.jpg',
    description: '科技网络连接'
  },
  {
    url: 'https://images.pexels.com/photos/32461216/pexels-photo-32461216.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
    filename: 'hero-bg-4.jpg',
    description: '数字地球网络'
  },
  {
    url: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
    filename: 'hero-bg-5.jpg',
    description: 'GPS导航设备'
  }
];

// 确保public/assets/images目录存在
const imagesDir = path.join(__dirname, 'public', 'assets', 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// 下载图片函数
function downloadImage(imageInfo) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(imagesDir, imageInfo.filename);
    
    // 如果文件已存在，跳过下载
    if (fs.existsSync(filePath)) {
      console.log(`✅ ${imageInfo.filename} 已存在，跳过下载`);
      resolve();
      return;
    }

    console.log(`📥 开始下载: ${imageInfo.description} -> ${imageInfo.filename}`);
    
    const file = fs.createWriteStream(filePath);
    
    https.get(imageInfo.url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        
        file.on('finish', () => {
          file.close();
          console.log(`✅ 下载完成: ${imageInfo.filename}`);
          resolve();
        });
        
        file.on('error', (err) => {
          fs.unlink(filePath, () => {}); // 删除不完整的文件
          reject(err);
        });
      } else {
        reject(new Error(`HTTP ${response.statusCode}: ${imageInfo.url}`));
      }
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// 下载所有图片
async function downloadAllImages() {
  console.log('🚀 开始下载hero背景图片...\n');
  
  try {
    for (const imageInfo of imageUrls) {
      await downloadImage(imageInfo);
    }
    
    console.log('\n🎉 所有图片下载完成！');
    console.log('\n📋 下载的图片列表:');
    imageUrls.forEach((img, index) => {
      console.log(`${index + 1}. ${img.filename} - ${img.description}`);
    });
    
  } catch (error) {
    console.error('❌ 下载失败:', error.message);
    process.exit(1);
  }
}

// 执行下载
downloadAllImages();
