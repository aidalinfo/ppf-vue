<script setup lang="ts">
// Pas besoin d'importer ProximityPrefetch quand on utilise le plugin Vite
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

    <div class="content-wrapper">
      <!-- Sidebar avec de nombreux liens de démonstration -->
      <aside class="sidebar">
        <h3>Demo Links</h3>
        <div class="sidebar-section">
          <h4>Documentation</h4>
          <ul>
            <li><a href="/docs/getting-started">Getting Started</a></li>
            <li><a href="/docs/installation">Installation</a></li>
            <li><a href="/docs/configuration">Configuration</a></li>
            <li><a href="/docs/api-reference">API Reference</a></li>
            <li><a href="/docs/examples">Examples</a></li>
          </ul>
        </div>
        
        <div class="sidebar-section">
          <h4>Features</h4>
          <ul>
            <li><a href="/features/auto-prefetch">Auto Prefetch</a></li>
            <li><a href="/features/threshold-control">Threshold Control</a></li>
            <li><a href="/features/debug-mode">Debug Mode</a></li>
            <li><a href="/features/performance">Performance</a></li>
            <li><a href="/features/ssr-support">SSR Support</a></li>
          </ul>
        </div>
        
        <div class="sidebar-section">
          <h4>Integrations</h4>
          <ul>
            <li><a href="/integrations/vue3">Vue 3</a></li>
            <li><a href="/integrations/nuxt">Nuxt</a></li>
            <li><a href="/integrations/quasar">Quasar</a></li>
            <li><a href="/integrations/vite">Vite</a></li>
            <li><a href="/integrations/webpack">Webpack</a></li>
          </ul>
        </div>
        
        <div class="sidebar-section">
          <h4>Examples</h4>
          <ul>
            <li><a href="/examples/basic">Basic Setup</a></li>
            <li><a href="/examples/advanced">Advanced Configuration</a></li>
            <li><a href="/examples/spa">SPA Example</a></li>
            <li><a href="/examples/ssr">SSR Example</a></li>
            <li><a href="/examples/custom">Custom Implementation</a></li>
          </ul>
        </div>
        
        <div class="sidebar-section">
          <h4>Resources</h4>
          <ul>
            <li><a href="/resources/blog">Blog Posts</a></li>
            <li><a href="/resources/videos">Tutorial Videos</a></li>
            <li><a href="/resources/community">Community</a></li>
            <li><a href="/resources/plugins">Related Plugins</a></li>
            <li><a href="/resources/updates">Updates</a></li>
          </ul>
        </div>
        
        <div class="sidebar-section">
          <h4>Support</h4>
          <ul>
            <li><a href="/support/faq">FAQ</a></li>
            <li><a href="/support/troubleshooting">Troubleshooting</a></li>
            <li><a href="/support/issues">Common Issues</a></li>
            <li><a href="/support/contact">Contact</a></li>
            <li><a href="/support/discord">Discord</a></li>
          </ul>
        </div>
      </aside>

      <main>
        <!-- Plus besoin du wrapper ProximityPrefetch quand on utilise le plugin Vite -->
        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </main>
    </div>

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

.content-wrapper {
  display: flex;
  flex: 1;
}

.sidebar {
  width: 250px;
  background-color: #f5f5f5;
  padding: 1rem;
  border-right: 1px solid #e0e0e0;
}

.sidebar h3 {
  margin-top: 0;
  color: #34495e;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 0.5rem;
}

.sidebar-section {
  margin-bottom: 1.5rem;
}

.sidebar-section h4 {
  margin: 0.5rem 0;
  color: #41b883;
  font-size: 1rem;
}

.sidebar-section ul {
  list-style-type: none;
  padding: 0;
  margin: 0.5rem 0;
}

.sidebar-section ul li {
  padding: 0.3rem 0;
}

.sidebar-section ul li a {
  color: #2c3e50;
  text-decoration: none;
  transition: color 0.2s;
  font-size: 0.9rem;
  display: block;
  padding: 0.3rem 0.5rem;
  border-radius: 4px;
}

.sidebar-section ul li a:hover {
  color: #41b883;
  background-color: rgba(65, 184, 131, 0.1);
}

main {
  flex: 1;
  padding: 1rem 2rem;
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
