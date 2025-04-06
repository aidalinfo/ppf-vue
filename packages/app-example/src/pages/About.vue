<template>
  <div class="page about">
    <h1>About Page</h1>
    <p>This is a demo of the Vue Proximity Prefetch plugin.</p>
    <p>The plugin automatically prefetches routes when you move your mouse near router links.</p>
    
    <div class="navigation">
      <router-link to="/">Home Page</router-link>
      <router-link to="/contact">Contact Page</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
// About component
</script>

<style scoped>
.page {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.navigation {
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
}

a {
  padding: 0.5rem 1rem;
  background-color: #41b883;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: bold;
  transition: background-color 0.2s;
}

a:hover {
  background-color: #34495e;
}
</style>