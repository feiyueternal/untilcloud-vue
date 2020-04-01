import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login'
import Changecode from '../views/Changecode'
import Register from '../views/Register'
import ForgetPassword from '../views/ForgetPassword'
import UserAdmin from '../views/UserAdmin'
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
    component: Login
  },
  {
    path: '/Register',
    name: 'Register',
    component: Register
  },

  {
    path: '/ForgetPassword',
    name: 'ForgetPassword',
    component: ForgetPassword
  },

  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
  // },
  {
    path:'/admin',
    name: 'Admin',
    component: Navbar,
    children:[
      {
        path: '/admin',
        name: 'AdminIndex',
        component: Home
      }
    ]
  },
  {
    path: '/error/notFound',
    name: 'Error',
    component: Page404
  }, 
  {
    path: '/error/unauthorized',
    name: 'Unauthorized',
    component: Page403
  }, 
  {
    path: '/error/serverError',
    name: 'ServerError',
    component: Page500
  },
  {
    path: '*',
    component:Page404
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
})

export default router
