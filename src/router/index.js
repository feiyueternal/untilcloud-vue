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
import Page404 from '../views/ExceptionPage/Page404'
import Page403 from '../views/ExceptionPage/Page403'
import Page500 from '../views/ExceptionPage/Page500'

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
    },{
      path:'/Page404',
      name:'Page404',
      component:Page404
    },{
      path:'/Page403',
      name:'Page403',
      component:Page403
    },{
      path:'/Page500',
      name:'Page500',
      component:Page500
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
