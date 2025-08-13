<template>
  <div class="container mx-auto px-4 py-6">
    <div class="grid gap-6 lg:grid-cols-[240px_1fr]">
      <aside class="lg:sticky lg:top-20 self-start">
        <slot name="sidebar" />
      </aside>
      <main class="space-y-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
// 无逻辑，仅做布局容器
</script>

