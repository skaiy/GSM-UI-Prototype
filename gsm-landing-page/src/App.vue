<script setup lang="ts">
// App root component
</script>

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
:root {
  /* Light theme colors - 深化蓝色主题 */
  --primary-color: #1e40af;
  --primary-hover: #3b82f6;
  --primary-active: #1d4ed8;
  --gray-color: #6b7280;
  --gray-light: #9ca3af;
  --gray-lighter: #d1d5db;
  --gray-extra-light: #f3f4f6;
  --background-color: #FFFFFF;
  --text-color: #111827;
  --text-color-regular: #374151;
  --text-color-secondary: #6b7280;
  --text-color-placeholder: #9ca3af;
  --border-color: #d1d5db;
  --border-color-light: #e5e7eb;
  --border-color-lighter: #f3f4f6;
  --border-color-extra-light: #f9fafb;
}

[data-theme="dark"] {
  /* 深色主题 - bolt.new风格 */
  --primary-color: #3b82f6;
  --primary-hover: #60a5fa;
  --primary-active: #2563eb;
  --gray-color: #6b7280;
  --gray-light: #9ca3af;
  --gray-lighter: #4b5563;
  --gray-extra-light: #1f2937;
  --background-color: #0f172a;
  --text-color: #f8fafc;
  --text-color-regular: #e2e8f0;
  --text-color-secondary: #94a3b8;
  --text-color-placeholder: #64748b;
  --border-color: #334155;
  --border-color-light: #475569;
  --border-color-lighter: #1e293b;
  --border-color-extra-light: #0f172a;
}

* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
  background-color: var(--background-color);
  color: var(--text-color);
  transition: background-color 0.3s ease, color 0.3s ease;
}

#app {
  min-height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}
</style>
