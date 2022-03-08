import { h, resolveComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

import DefaultLayout from '@/layouts/DefaultLayout'
import UserLayout from '@/layouts/UserLayout'
const routes = [
  {
    path: '/admin',
    name: 'Dashboard',
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
            path: 'admin/list-accounts',
            name: 'List Accounts',
            component: () => import('@/views/admin/ListAccount'),
          },
          {
            path: 'admin/groups',
            name: 'Groups',
            component: () => import('@/views/admin/Groups'),
          }
        ],
      },

    ],
  },
  {
    path: '/',
    name: 'Home',
    component: UserLayout,

    meta: { requiresAuth: true },
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '@/views/user/Home.vue'),
      },


      {
        path: 'user/submit',
        name: 'Submission',
        component: () => import('@/views/user/SubmitDetail.vue'),
      },
      {
        path: 'user/project',
        name: 'Project',
        component: () => import('@/views/user/Project.vue'),
      },
      {
        path: 'user/profile',
        name: 'Profile',
        component: () => import('@/views/user/Profile.vue'),
      }


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
const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener()
      },
      reject
    )
  })
}
// router.beforeEach(async (to,from, next)=>{
//   if(to.matched.some((record) => record.meta.requiresAuth)){
//     if(await getCurrentUser()){
//       next()
//     }else{
//       alert("You dont have access permission")
//       next('/login')
//     }
//   }else{
//     next()
//   }
// })

export default router
