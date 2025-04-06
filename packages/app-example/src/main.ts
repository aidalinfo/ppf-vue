import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import { ProximityPrefetchPlugin } from 'vue-proximity-prefetch'

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('./pages/Home.vue')
    },
    {
      path: '/about',
      component: () => import('./pages/About.vue')
    },
    {
      path: '/contact',
      component: () => import('./pages/Contact.vue')
    }
  ]
})

const app = createApp(App)

// Use router
app.use(router)

// Use our ProximityPrefetch plugin
app.use(ProximityPrefetchPlugin)

app.mount('#app')
