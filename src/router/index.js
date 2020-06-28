import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login'
import Changecode from '../views/Changecode'
import Register from '../views/Register'
import ForgetPassword from '../views/ForgetPassword'
import Navbar from '../views/NavBar/index'
import Users from '../views/Users'
import Roles from '../views/Roles/RolesManageIndex'
import Menus from '../views/Menus/MenusManageIndex'
import Perms from '../views/Perms/PermsManageIndex'
import Page404 from '../views/error/Page404'
import Page403 from '../views/error/Page403'
import Page500 from '../views/error/Page500'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    // component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
    component:resolve => require(['@/views/Login.vue'],resolve)
  },
  {
    path: '/Register',
    name: 'Register',
    // component: () => import(/* webpackChunkName: "register" */ '@/views/Register.vue'),
    component:resolve => require(['@/views/Register.vue'],resolve)
  },

  {
    path: '/ForgetPassword',
    name: 'ForgetPassword',
    // component: ()=>import(/* webpackChunkName: "forgetPassword" */ '@/views/ForgetPassword.vue'),
    component:resolve => require(['@/views/ForgetPassword.vue'],resolve)
  },

  
  {
    path:'/admin',
    name: 'Admin',
    component: Navbar,
    meta:{
      requireAuth: true
    },
    children:[
      {
        path: '/admin',
        name: 'AdminIndex',
        // component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
        component:resolve => require(['@/views/Home.vue'],resolve),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/admin/about',
        name: 'About',
        component:resolve => require(['@/views/About.vue'],resolve),
        meta: {
          requireAuth: true
        }
      },
      
    ]
  },
  {
    path: '/error/notFound',
    name: 'Error',
    // component: () => import(/* webpackChunkName: "page404" */ '@/views/error/Page404.vue'),
    component: resolve => require(['@/views/error/Page404.vue'],resolve),
  }, 
  {
    path: '/error/unauthorized',
    name: 'Unauthorized',
    // component: () => import(/* webpackChunkName: "page403" */ '@/views/error/Page403.vue'),
    component:resolve => require(['@/views/error/Page403.vue'],resolve),
  }, 
  {
    path: '/error/serverError',
    name: 'ServerError',
    // component: () => import(/* webpackChunkName: "page500" */ '@/views/error/Page500.vue'),
    component:resolve => require(['@/views/error/Page500.vue'],resolve),
  },
  {
    path: '*',
    // component: () => import(/* webpackChunkName: "page404" */ '@/views/error/Page404.vue'),
    component:resolve => require(['@/views/error/Page404.vue'],resolve),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
})

export default router
