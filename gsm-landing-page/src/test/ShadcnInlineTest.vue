<template>
  <div style="min-height: 100vh; padding: 2rem; background: white;">
    <div style="max-width: 1024px; margin: 0 auto;">
      <h1 style="font-size: 2rem; font-weight: bold; margin-bottom: 2rem;">
        Shadcn-vue 内联样式测试
      </h1>
      
      <div style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem;">
          使用内联样式的按钮
        </h2>
        
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
          <button style="display: inline-flex; align-items: center; justify-content: center; white-space: nowrap; border-radius: 0.375rem; font-size: 0.875rem; font-weight: 500; transition: all 0.2s; padding: 0.5rem 1rem; background: #1a1a1a; color: white; border: none; cursor: pointer;">
            默认按钮
          </button>
          <button style="display: inline-flex; align-items: center; justify-content: center; white-space: nowrap; border-radius: 0.375rem; font-size: 0.875rem; font-weight: 500; transition: all 0.2s; padding: 0.5rem 1rem; background: #f3f4f6; color: #1a1a1a; border: none; cursor: pointer;">
            次要按钮
          </button>
          <button style="display: inline-flex; align-items: center; justify-content: center; white-space: nowrap; border-radius: 0.375rem; font-size: 0.875rem; font-weight: 500; transition: all 0.2s; padding: 0.5rem 1rem; background: #ef4444; color: white; border: none; cursor: pointer;">
            危险按钮
          </button>
          <button style="display: inline-flex; align-items: center; justify-content: center; white-space: nowrap; border-radius: 0.375rem; font-size: 0.875rem; font-weight: 500; transition: all 0.2s; padding: 0.5rem 1rem; background: white; color: #1a1a1a; border: 1px solid #e5e7eb; cursor: pointer;">
            轮廓按钮
          </button>
        </div>
      </div>
      
      <div style="margin-top: 2rem;">
        <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem;">
          使用 shadcn-vue Button 组件
        </h2>
        
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
          <Button>默认按钮</Button>
          <Button variant="secondary">次要按钮</Button>
          <Button variant="destructive">危险按钮</Button>
          <Button variant="outline">轮廓按钮</Button>
        </div>
      </div>
      
      <div style="margin-top: 2rem; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 0.5rem;">
        <p style="font-size: 0.875rem; color: #6b7280;">
          如果上面两组按钮都显示正常，说明 shadcn-vue 配置成功。
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
</script>