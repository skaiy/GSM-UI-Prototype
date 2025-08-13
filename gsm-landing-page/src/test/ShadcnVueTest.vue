<template>
  <div class="min-h-screen p-8">
    <div class="max-w-4xl mx-auto space-y-8">
      <h1 class="text-3xl font-bold">Shadcn-vue 测试页面</h1>
      
      <div class="space-y-4">
        <h2 class="text-xl font-semibold">按钮组件测试</h2>
        
        <div class="flex flex-wrap gap-2">
          <Button>默认按钮</Button>
          <Button variant="secondary">次要按钮</Button>
          <Button variant="destructive">危险按钮</Button>
          <Button variant="outline">轮廓按钮</Button>
          <Button variant="ghost">幽灵按钮</Button>
          <Button variant="link">链接按钮</Button>
        </div>
        
        <div class="flex flex-wrap gap-2 mt-4">
          <Button size="sm">小按钮</Button>
          <Button>默认大小</Button>
          <Button size="lg">大按钮</Button>
        </div>
        
        <div class="flex flex-wrap gap-2 mt-4">
          <Button disabled>禁用按钮</Button>
          <Button variant="secondary" disabled>禁用次要按钮</Button>
        </div>
      </div>
      
      <div class="mt-8 p-4 border rounded-lg">
        <p class="text-sm text-muted-foreground">
          如果按钮显示正常，说明 shadcn-vue 已成功配置。
        </p>
        <p class="text-sm text-muted-foreground mt-2">
          当前使用 TailwindCSS 3.x 版本，与 shadcn-vue 完全兼容。
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
</script>