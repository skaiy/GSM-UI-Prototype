<script setup lang="ts">
// App root component
</script>

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
/* Theme variables are centralized in src/assets/theme.css */

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
