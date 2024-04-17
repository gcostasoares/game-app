import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/memory',
    name: 'memory',
    component: () => import('../views/MemoryView.vue')
  },
  {
    path: '/quiz',
    name: 'quiz',
    component: () => import('../views/QuizView.vue')
  },
  {
    path: '/simon',
    name: 'simon',
    component: () => import('../views/SimonView.vue')
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
