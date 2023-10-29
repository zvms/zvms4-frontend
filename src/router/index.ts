import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/user/login',
      name: 'user-login',
      component: () => import('../views/user/UserLogin.vue')
    },
    {
      path: '/user/',
      name: 'user',
      component: () => import('../views/user/UserHome.vue')
    },
    {
      path: '/activity/create/:type',
      name: 'activity-create-type',
      component: () => import('../views/activity/CreateActivity.vue')
    },
    {
      path: '/activity/create/',
      name: 'activity-create',
      component: () => import('../views/activity/CreateActivity.vue')
    },
    {
      path: '/activity/',
      name: 'activity',
      component: () => import('../views/user/UserActivity.vue')
    },
    {
      path: '/umbrella/',
      name: 'umbrella',
      component: () => import('../views/umbrella/UmbrellaHome.vue')
    },
    {
      path: '/broadcast/',
      name: 'broadcast',
      component: () => import('../views/broadcast/BroadcastHome.vue')
    }
  ]
})

export default router
