<template>
  <div class="page contact">
    <h1>Contact Page</h1>
    <p>This is the contact page for the Vue Proximity Prefetch demo.</p>
    <p>The plugin is currently tracking mouse movement and prefetching routes when you get close to links.</p>
    
    <div class="navigation">
      <router-link to="/">Home Page</router-link>
      <router-link to="/about">About Page</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
// Contact component
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