import { h, resolveComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { Role } from '../config/role'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

import DefaultLayout from '@/layouts/DefaultLayout'
import UserLayout from '@/layouts/UserLayout'
const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: DefaultLayout,

    meta: {
      requiresAuth: true,
      authorize: [Role.Admin]
    },
    redirect: '/admin/dashboard',
    children: [
      {
        path: '/admin/dashboard',
        name: 'Dashboard',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue'),
      },
      {
        path: '/',
        redirect: '/admin/list-accounts',
        name: 'Accounts',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        children: [
          {
            path: '/admin/list-accounts',
            name: 'List Accounts',
            component: () => import('@/views/admin/ListAccount.vue'),
          },
          {
            path: '/admin/groups',
            name: 'Groups',
            component: () => import('@/views/admin/Groups.vue'),
          },
        ],
      },
      {
        path: '/',
        redirect: '/admin/list-projects',
        name: 'Projects',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        children: [
          {
            path: '/admin/list-projects',
            name: 'List Projects',
            component: () => import('@/views/admin/ListProjects.vue'),
          },
          {
            path: '/admin/groups',
            name: 'Groups',
            component: () => import('@/views/admin/Groups.vue'),
          },
        ],
      },

    ],
  },
  {
    path: '/',
    name: 'Home',
    component: UserLayout,
    meta: {
      requiresAuth: true
    },
    redirect: '/user/home',
    children: [
      {
        path: '/user/home',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '@/views/user/Home.vue'),
      },
      {
        path: '/user/submit',
        name: 'Submission',
        component: () => import('@/views/user/SubmitDetail.vue'),
      },
      {
        path: '/user/project',
        name: 'Project',
        component: () => import('@/views/user/Project.vue'),
      },
      {
        path: 'user/profile',
        name: 'Profile',
        component: () => import('@/views/user/Profile.vue'),
      },


    ],
  },

  {
    path: '/pages',
    redirect: '/404',
    name: 'Page',
    meta: { requiresVisitor: true },
    component: {
      render() {
        return h(resolveComponent('router-view'))
      },
    },
    children: [
      {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/pages/Login.vue'),
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

router.beforeEach(async (to, from, next) => {
  const { authorize } = to.meta
  const currentUser = localStorage.getItem('USER');
  const user = JSON.parse(currentUser)
  if(to.matched.some((record) => record.meta.requiresAuth)){
    if(currentUser === null){
      next('/login')
    }else{
      
      if(authorize.length && !authorize.includes(user.account.roleName)){
        alert("You dont have access permission")
        return next({
          path: '/login'
        })
      }else{
        next()
      }
      
    }
  }
  next()
  // if(currentUser.roleName === Role.Staff || currentUser.roleName === Role.Admin){
  //   currentUser.roleName = Role.Admin
  // }

  // if (authorize) {
  //   if (!currentUser) {
  //     alert("You dont have access permission")
  //     return next({
  //       path: '/login',
  //       query: { returnUrl: to.path }
  //     })
  //   }
  //   else {
  //     if (authorize.length && !authorize.includes(currentUser.roleName)) {
  //       alert("You dont have access permission")
  //       return next({
  //         path: '/login',
  //         query: { returnUrl: to.path }
  //       })
  //     }
  //   }
  // }
  // next()
})

export default router
