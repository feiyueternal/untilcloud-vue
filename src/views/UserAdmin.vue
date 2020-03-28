<template>
  <div class="full-screen" style="full-screen">
    <el-container>
      <el-aside width="200px">
        <div class="title">
          <header>到云</header>
        </div>
        <el-menu background-color="#001529" text-color="#fff" active-text-color="#409eff" 
        router default-active="activePath">
            <el-menu-item index="/Home" @click="saveNavState('/Home')">
              <i class="iconfont icon-shouye"></i>
              <span slot="title">首页</span>
            </el-menu-item>
          <el-submenu index="2"> 
              <template slot="title">
              <i class="iconfont icon-bianji"></i>
              <span>用户配置</span>
            </template>   
            <el-menu-item index="/Users" @click="saveNavState('/Users')">用户管理</el-menu-item>
            <el-menu-item index="/Roles" @click="saveNavState('/Roles')">角色管理</el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="iconfont icon-xitong"></i>
              <span>系统配置</span>
            </template>
            <el-menu-item index="/Menus" @click="saveNavState('/Menus')">菜单管理</el-menu-item>
            <el-menu-item index="/Perms" @click="saveNavState('/Perms')">权限管理</el-menu-item>
            <el-menu-item index="/DataDict" @click="saveNavState('/DataDict')">数据字典</el-menu-item>
          </el-submenu>

           <el-submenu index="4">
            <template slot="title">
              <i class="iconfont icon-jinggao"></i>
              <span>异常页</span>
            </template>
            <el-menu-item index="/Page404" @click="saveNavState('/Page404')">找不到页面</el-menu-item>
            <el-menu-item index="/Page403" @click="saveNavState('/Page403')">无权访问</el-menu-item>
            <el-menu-item index="/Page500" @click="saveNavState('/Page500')">服务器出错</el-menu-item>
          </el-submenu>

          <el-menu-item index="/About" @click="saveNavState('/About')">
            <i class="iconfont icon-guanyu"></i>
            <span slot="title">关于</span>
          </el-menu-item>
        </el-menu>

      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "UserAdmin",
  data(){
    return {
        activePath: '/Home'
    }
  },
  created() {
      this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
  saveNavState(activePath) {
    window.sessionStorage.setItem('activePath', activePath)
    this.activePath = activePath
  }
}
}

</script>

<style scoped>
.full-screen {
  background-size: cover;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.el-aside {
  background-color: #001529;
}
.el-main {
  background-color: #f0f2f5;
}
.el-container {
  height: 100%;
}
header {
  color: white;
  margin-top: 5px;
  font-size: 35px;
}
.el-menu {
  margin-top: 30px;
}
.title {
  margin-top: 10px;
}
</style>

