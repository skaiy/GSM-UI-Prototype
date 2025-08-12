<template>
  <aside class="side-submenu" v-if="items && items.length">
    <div class="submenu-header" v-if="title">
      <slot name="title">
        <h3>{{ title }}</h3>
      </slot>
    </div>
    <ul class="submenu-list">
      <li v-for="item in items" :key="item.key">
        <button
          :class="['submenu-item', { active: activeKey === item.key }]"
          @click="$emit('select', item.key)"
        >
          <span class="dot" :style="{ background: item.color || 'var(--primary-color)' }"></span>
          <span class="label">{{ item.label }}</span>
        </button>
      </li>
    </ul>
  </aside>
</template>

<script setup lang="ts">
interface SubItem { key: string; label: string; color?: string }

defineProps<{
  title?: string
  items: SubItem[]
  activeKey: string
}>()

defineEmits<{
  (e: 'select', key: string): void
}>()
</script>

<style scoped>
.side-submenu { width: 240px; background: var(--card-bg); border-right: 1px solid var(--border-color); padding: 1rem; border-radius: 12px; }
.submenu-header { margin-bottom: 0.75rem; }
.submenu-header h3 { margin: 0; font-size: 1rem; color: var(--text-color); }
.submenu-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.5rem; }
.submenu-item { width: 100%; display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 0.75rem; border-radius: 8px; border: 1px solid var(--border-color); background: transparent; color: var(--text-color-secondary); cursor: pointer; text-align: left; transition: all .2s ease; }
.submenu-item .dot { width: 6px; height: 6px; border-radius: 999px; display: inline-block; }
.submenu-item:hover { background: var(--hover-bg); border-color: var(--primary-color); color: var(--primary-color); }
.submenu-item.active { background: var(--gradient-primary); color: white; border-color: var(--primary-color); }
.label { flex: 1; }
</style>

