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
import maplist from '@/router/router_list.js' 
// import {filterAsyncRouter} from './utils/menusDeal'
import Router from 'vue-router'

Vue.use(iconPicker);

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(ElementUI)


const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
return originalPush.call(this, location).catch(err => err)
}

router.beforeEach((to,from,next) => {
  initAdminMenu(router,store)
  next({to,replace:true})
  next()
})


const initAdminMenu=(router,store) => {
  // if(store.state.adminMenus.length>0){
  //   return
  // }
  var url="/index/menu"
  axios.get(url).then(res => {
    if(res&&res.status==200){
      var fmtRoutes = res.data
      filterAsyncRouter(fmtRoutes)
      console.log(fmtRoutes)
      
      fmtRoutes.forEach(ro =>{
        router.options.routes.push(ro)
      })
      // router.addRoutes(fmtRoutes)
      router.addRoutes(router.options.routes)
      console.log(router)
      store.commit('initAdminMenu', fmtRoutes)
    }else{
      this.$message.error("获取菜单失败")
    }
  }).catch(err => {
    console.log(err)
  })
}

const filterAsyncRouter=function(asyncRouters){
  asyncRouters.forEach((route) => {
    route.component=maplist[route.name]
    if(route.children){
        filterAsyncRouter(route.children)
    }
  })
}


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
