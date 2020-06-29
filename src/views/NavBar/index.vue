<template>
	<el-container style="height:100%">
    
    <el-aside style="width: 250px">
      <menu-tree></menu-tree>
    </el-aside>

    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>

  </el-container>
</template>

<script>
import MenuTree from "./MenuTree"
import Header from './Header'
export default {
  name: "Navbar",
  components:{MenuTree,Header},
  data() {
    return {
      
    }
  },
  computed: {
     adminMenus() {
      //  console.log(this.$store.state.adminMenus)
      // console.log(window.localStorage.getItem('Cloud_menus'))
      //  return window.localStorage.getItem('Cloud_menus')
      // return JSON.parse(window.localStorage.getItem('Cloud_menus'))
      return this.$store.state.adminMenus;
    }
  },
  methods: {

  }
}
</script>

<style scoped>
.el-aside {
  /* display: block; */
  /* position: absolute; */
  left: 0;
  top: 0;
  bottom: 0;
  overflow-y: scroll;
  /* height: 100%; */
}
.el-container {
  height: 100%;
}
.el-header {
  background-color: #545c64;
}

</style>