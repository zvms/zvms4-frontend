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
      component: () => import('../views/activity/CreateActivity.vue'),
      children: [
        {
          path: '/activity/create/',
          name: 'activity-create',
          component: () => import('../views/activity/CreateHome.vue')
        },
        {
          path: '/activity/create/:type',
          name: 'activity-create-type',
          component: () => import('../views/activity/CreatePage.vue')
        }
      ]
    },
    {
      path: '/activities/',
      name: 'activity',
      component: () => import('../views/user/UserActivity.vue'),
      children: [
        {
          path: '/activities/',
          name: 'activity',
          component: () => import('../views/activity/ViewPage.vue')
        },
        {
          path: '/activity/register/',
          name: 'activity-register',
          component: () => import('../views/activity/UserRegister.vue')
        },
        {
          path: '/activities/:type',
          name: 'activity-type',
          component: () => import('../views/activity/ViewPage.vue')
        },
        {
          path: '/activity/:_id',
          name: 'activity-view',
          component: () => import('../views/activity/ActivityPage.vue')
        }
      ]
    },
    {
      path: '/umbrella/',
      name: 'umbrella',
      component: () => import('../views/umbrella/UmbrellaHome.vue')
    },
    {
      path: '/notifications/',
      name: 'notifications',
      component: () => import('../views/notifications/NotificationHome.vue')
    },
    {
      path: '/notifications/create',
      name: 'notifications-create',
      component: ()=>import('../views/notifications/NotificationCreate.vue')
    }
  ]
})

export default router
