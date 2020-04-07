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
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
  },
  {
    path: '/Register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '@/views/Register.vue'),
  },

  {
    path: '/ForgetPassword',
    name: 'ForgetPassword',
    component: ()=>import(/* webpackChunkName: "forgetPassword" */ '@/views/ForgetPassword.vue'),
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
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/admin',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
        meta: {
          requireAuth: true
        }
      },
    ]
  },
  {
    path: '/error/notFound',
    name: 'Error',
    component: () => import(/* webpackChunkName: "page404" */ '@/views/error/Page404.vue'),
  }, 
  {
    path: '/error/unauthorized',
    name: 'Unauthorized',
    component: () => import(/* webpackChunkName: "page403" */ '@/views/error/Page403.vue'),
  }, 
  {
    path: '/error/serverError',
    name: 'ServerError',
    component: () => import(/* webpackChunkName: "page500" */ '@/views/error/Page500.vue'),
  },
  {
    path: '*',
    component: () => import(/* webpackChunkName: "page404" */ '@/views/error/Page404.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
})

export default router
