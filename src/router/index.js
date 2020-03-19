import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login'
import Changecode from '../views/Changecode'
import Register from '../views/Register'
import ForgetPassword from '../views/ForgetPassword'
import UserAdmin from '../views/UserAdmin'
import Users from '../views/Users'
import Roles from '../views/Roles/RolesManageIndex'

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
  // {
  //   path: '/Changecode',
  //   name: 'Changecode',
  //   component: Changecode
  // },
  {
    path: '/ForgetPassword',
    name: 'ForgetPassword',
    component: ForgetPassword
  },
  
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/UserAdmin',
    name: 'UserAdmin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "UserAdmin" */ '../views/UserAdmin.vue'),
    redirect: '/Home',
    children: [{
      path: '/Home',
      name: 'Home',
      component: Home
    },{
      path: '/Users',
      name: 'Users',
      component: Users
    },{
      path: '/Roles',
      name: 'Roles',
      component: Roles
    }
  ]
  }
  
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
