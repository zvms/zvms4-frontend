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
      path: '/user',
      name: 'user',
      component: () => import('../views/user/UserHome.vue')
    },
    {
      path: '/user/:id',
      name: 'user-page',
      component: () => import('../views/user/UserPage.vue')
    },
    {
      path: '/user/:id/:action',
      name: 'user-action',
      component: () => import('../views/user/UserPage.vue')
    },
    {
      path: '/activity/create',
      name: 'activity-create',
      component: () => import('../views/activity/CreateActivity.vue'),
      children: [
        {
          path: '/activity/create',
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
      path: '/activity/merge',
      name: 'activity-merge',
      component: () => import('../views/activity/ActivityMerge.vue')
    },
    {
      path: '/activities',
      name: 'activity',
      component: () => import('../views/user/UserActivity.vue')
    },
    {
      path: '/activities/:type',
      name: 'activity-type',
      component: () => import('../views/user/UserActivity.vue')
    },
    {
      path: '/manage',
      name: 'manage',
      component: () => import('../views/manage/ManageHome.vue')
    },
    {
      path: '/manage/:action',
      name: 'manage',
      component: () => import('../views/manage/ManageHome.vue')
    },
    {
      path: '/group/:id',
      name: 'group-user',
      component: () => import('../views/group/GroupPage.vue')
    },
    {
      path: '/group/:id/:action',
      name: 'group-action',
      component: () => import('../views/group/GroupPage.vue')
    },
    {
      path: '/activity/details/:id',
      name: 'activity-view',
      component: () => import('../views/activity/ActivityPage.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFound.vue')
    }
  ]
})

export default router
