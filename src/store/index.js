import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rolesData: [],
    adminMenus: [],
    CLouduser:{
      username: window.localStorage.getItem('user') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).username,},
    dicTypeId: '',
    dicTypeInfo: {
      id: '',
      code: '',
      name: ''
    },
    dicDetail: {
      id: '',
      sort: '',
      name: '',
      value: '',
      typeId: ''
    },
    isTeacher:''
  },
  mutations: {
    changeRolesData(state, obj) {
      state.rolesData = [];
      for (var i = 0; i < obj.length; i++) {
        state.rolesData.push(obj[i])
      }
      // state.rolesData = obj
    },
    initAdminMenu(state,menus){
      state.adminMenus=menus
      // console.log("adminMenus")
      window.localStorage.setItem('Cloud_menus',JSON.stringify(menus))
      // state.adminMenus=window.localStorage.getItem('Cloud_menus')
      // console.log(state.adminMenus)
    },
    login (state, user) {
      state.CLouduser = user
      // console.log("user")
      // console.log(typeof(state.CLouduser))
      for(var i = 0; i < user.roles.length; i++) {
        if(user.roles[i].id == 3) {
          state.isTeacher=true
          window.localStorage.setItem('CLouduser_teacher', "yes")
          break;
        } else {
          continue;
        }
      }
      if(state.isTeacher!=true){
        state.isTeacher=false
        window.localStorage.setItem('CLouduser_teacher', "no")
      }
      window.localStorage.setItem('CLouduser', JSON.stringify(user))
      window.localStorage.setItem('CLouduser_name', JSON.stringify(user.username))
    },
    logout (state) {
      state.user = []
      window.localStorage.clear()
      state.adminMenus = []
    },
    getDicTypeId(state, id) {
      state.dicTypeId = id;
      // console.log(id)
    },
    getDicTypeInfo(state, info) {
      state.dicTypeInfo.id = info.id;
      state.dicTypeInfo.code = info.code;
      state.dicTypeInfo.name = info.name;
    },
    getDicDetail(state, info) {
      state.dicDetail.id = info.id;
      state.dicDetail.sort = info.sort;
      state.dicDetail.name = info.name;
      state.dicDetail.value = info.value;
      state.dicDetail.typeId = info.dictionaryType.id;
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
            // console.log(res.data.data);
          } else {
            // console.log(res);
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          // console.log(err);
        })
    },
  },
  modules: {
  }
})
