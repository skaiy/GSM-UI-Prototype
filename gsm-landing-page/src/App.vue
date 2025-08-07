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
  /* Light theme colors */
  --primary-color: #409EFF;
  --primary-hover: #66b1ff;
  --primary-active: #3a8ee6;
  --gray-color: #909399;
  --gray-light: #c0c4cc;
  --gray-lighter: #e4e7ed;
  --gray-extra-light: #f2f6fc;
  --background-color: #FFFFFF;
  --text-color: #303133;
  --text-color-regular: #606266;
  --text-color-secondary: #909399;
  --text-color-placeholder: #c0c4cc;
  --border-color: #dcdfe6;
  --border-color-light: #e4e7ed;
  --border-color-lighter: #ebeef5;
  --border-color-extra-light: #f2f6fc;
}

[data-theme="dark"] {
  --primary-color: #3D63DD;
  --primary-hover: #5a7ae4;
  --primary-active: #2952cc;
  --gray-color: #8B8D98;
  --gray-light: #6c6e7b;
  --gray-lighter: #4c4e5a;
  --gray-extra-light: #2c2e3a;
  --background-color: #111111;
  --text-color: #e4e7ed;
  --text-color-regular: #cfcfcf;
  --text-color-secondary: #a8abb2;
  --text-color-placeholder: #6c6e7b;
  --border-color: #4c4e5a;
  --border-color-light: #414243;
  --border-color-lighter: #363637;
  --border-color-extra-light: #2c2d2f;
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
