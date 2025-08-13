<template>
  <div class="rounded-lg border bg-[var(--card-bg)]">
    <div class="p-3 border-b border-[var(--border-color)] text-sm font-medium text-[var(--text-color)]">
      <slot name="title">导航</slot>
    </div>
    <nav class="p-2 space-y-1">
      <button
        v-for="item in items"
        :key="item.key"
        :class="cn(
          'w-full text-left px-3 py-2 rounded-md text-sm transition-colors',
          activeKey === item.key
            ? 'bg-blue-600/90 text-white shadow'
            : 'text-[var(--text-color-secondary)] hover:bg-blue-500/10 hover:text-[var(--text-color)]'
        )"
        @click="$emit('select', item.key)"
      >
        <slot name="item" :item="item">
          {{ item.label }}
        </slot>
      </button>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'

interface Item { key: string; label: string }

defineProps<{
  items: Item[]
  activeKey: string
}>()

defineEmits<{ (e: 'select', key: string): void }>()
</script>

