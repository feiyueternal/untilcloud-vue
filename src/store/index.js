import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rolesData: [],
    adminMenus: [],
    CLouduser:{
      username: window.localStorage.getItem('user') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).username
    }
  },
  mutations: {
    changeRolesData(state, obj) {
      for (var i = 0; i < obj.length; i++) {
        state.rolesData.push(obj[i])
      }
      // state.rolesData = obj
    },
    initAdminMenu(state,menus){
      state.adminMenus=menus
      console.log("adminMenus")
      console.log(state.adminMenus)
    },
    login (state, user) {
      state.CLouduser = user
      console.log("user")
      console.log(state.CLouduser)
      window.localStorage.setItem('CLouduser', JSON.stringify(user))
    },
    logout (state) {
      state.user = []
      window.localStorage.removeItem('CLouduser')
      state.adminMenus = []
    }
  },
  actions: {
    getRolesData(context) {
      // this.$http
      axios.get('/index/admin/user/role')
        .then(res => {
          if (res.data.code == 200) {
            // state.rolesData = res.data.data;
            context.commit('changeRolesData', res.data.data)
            console.log(res.data.data);
          } else {
            console.log(res);
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        })
    },
  },
  modules: {
  }
})
