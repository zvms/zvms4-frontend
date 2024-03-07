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
          path: '/register',
          name: 'activity-register',
          component: () => import('../views/activity/UserRegister.vue')
        },
        {
          path: '/activities/mine',
          name: 'activity-type',
          component: () => import('../views/activity/ViewPage.vue')
        },
        {
          path: '/activities/:type',
          name: 'activity-type',
          component: () => import('../views/activity/ViewPage.vue')
        }
      ]
    },
    {
      path: '/trophy',
      name: 'trophy',
      component: () => import('../views/trophy/TrophyHome.vue')
    },
    {
      path: '/trophy/create',
      name: 'trophy-create',
      component: () => import('../views/trophy/TrophyCreate.vue')
    },
    {
      path: '/activity/:id',
      name: 'activity-view',
      component: () => import('../views/activity/ActivityPage.vue')
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
      component: () => import('../views/notifications/NotificationCreate.vue')
    },
    {
      path: '/notifications/edit/:id/',
      name: 'notification-edit',
      component: () => import('../views/notifications/NotificationEdit.vue')
    }
  ]
})

export default router
