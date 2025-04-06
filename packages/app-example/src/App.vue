<script setup lang="ts">
import { ProximityPrefetch } from 'vue-proximity-prefetch';
</script>

<template>
  <div class="app-container">
    <header>
      <h1>Vue Proximity Prefetch Demo</h1>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/contact">Contact</router-link>
      </nav>
    </header>

    <main>
      <!-- Wrap the router view with our ProximityPrefetch component -->
      <ProximityPrefetch :threshold="200" :prediction-interval="100" :debug="true">
        <router-view v-slot="{ Component }">
            <component :is="Component" />
        </router-view>
      </ProximityPrefetch>
    </main>

    <footer>
      <p>Move your mouse near the links to trigger prefetching.</p>
      <p>Check the browser console to see prefetching in action.</p>
    </footer>
  </div>
</template>

<style>
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: #2c3e50;
  background-color: #f8f8f8;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  background-color: #34495e;
  color: white;
  padding: 1rem 2rem;
  text-align: center;
}

h1 {
  margin: 0;
  margin-bottom: 1rem;
}

nav {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

nav a {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

nav a:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

nav a.router-link-active {
  background-color: #41b883;
}

main {
  flex: 1;
  padding: 1rem;
}

footer {
  padding: 1rem;
  background-color: #f0f0f0;
  text-align: center;
  font-size: 0.9rem;
  color: #666;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
