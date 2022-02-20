import { h, resolveComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: DefaultLayout,
    
    meta: { requiresAuth: true },
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue'),
      },
      {
        path: '/admin',
        redirect: '/admin/list-accounts',

        name: 'Accounts',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        children: [
          {
            path: 'list-accounts',
            name: 'List Accounts',
            component: () => import('@/views/admin/ListAccount'),
          },
          {
            path: 'groups',
            name: 'Groups',
            component: () => import('@/views/admin/Groups'),
          }
        ],
      },

    ],
  },

  {
    path: '/pages',
    redirect: '/pages/404',
    name: 'Page',
    meta: { requiresVisitor: true },
    component: {
      render() {
        return h(resolveComponent('router-view'))
      },
    },
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/pages/Login'),
      }
    ],
  },

  { path: '/404', meta: { requiresFail: true }, component: () => import(/* webpackChunkName: "demo" */ '@/views/pages/Page404.vue') },
  { path: '/:pathMatch(.*)*', redirect: '/404' },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
})

export default router
