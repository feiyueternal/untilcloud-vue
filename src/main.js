import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import './assets/fonts/iconfont.css'
import iconPicker from 'e-icon-picker';
import 'e-icon-picker/dist/index.css';//基础样式
import 'e-icon-picker/dist/main.css'; //fontAwesome 图标库样式
import maplist from '@/router/router_list.js';
import Router from 'vue-router';
import { Message } from 'element-ui';

Vue.use(iconPicker);

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(ElementUI)


const originalPush = Router.prototype.push
//解决某种报错
Router.prototype.push = function push(location) {

  return originalPush.call(this, location).catch(err => err)
}


router.beforeEach((to, from, next) => {
  // if(store.state.CLouduser.username==null){
  //   next({
  //     path:'/'
  //   })
  // }else{
  //   initAdminMenu(router,store)
  // }

  // if(to.meta.requireAuth){
  //   if(store.state.CLouduser.username!=null && (to.path.startsWith('/admin')||to.path.startsWith('/about'))){
  //     initAdminMenu(router,store)
  //     console.log(store.state.CLouduser.username)
  //     next()
  //   }else{
  //     next({
  //       path: '/'
  //     })
  //   }
  // }else{
  //   next()
  // }


  // console.log(to)
  var clu = localStorage.getItem('CLouduser')
  if (clu && to.path.startsWith('/admin')) {
    initAdminMenu(router, store)
  }
  // console.log(clu)
  if (clu) {
    initAdminMenu(router, store)
    if (to.meta.requireAuth == true) {
      next()
    } else {
      // Message.error("没有权限，无法访问此页面")
      Message.warning("回到首页啦")
      next({path:'/admin'})
    }
  } else {
    // store.commit('logout')
    
    window.localStorage.removeItem('CLouduser')
    if (to.path === '/') {
      next()
    } else {
      Message.error("请先登录")
      next({ path: '/' });
    }
  }


})


const initAdminMenu = (router, store) => {
  var url = "/index/menu"
  axios.get(url).then(res => {
    // console.log(res)
    if (res.data.code == 200) {
      var fmtRoutes = res.data.data
      filterAsyncRouter(fmtRoutes)
      fmtRoutes.forEach(ro => {
        router.options.routes.push(ro)
      })
      // router.options.routes.push({
      //   path:"*",
      //   redirect:"/error/notFound"
      // })
      router.addRoutes(router.options.routes)
      store.commit('initAdminMenu', fmtRoutes)
    } else {
      Message.error("获取菜单失败")
      console.log(res.data)
    }

  }).catch(err => {
    Message.error(err)
    console.log(err)
  })
}

const filterAsyncRouter = function (asyncRouters = []) {
  asyncRouters.forEach((route) => {
    route.component = maplist[route.name]
    route.meta = {
      requireAuth: true
    }
    if (route.children) {
      filterAsyncRouter(route.children)
    }
  })
}


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
