<template>
	<el-container style="height:100%">

      <el-aside style="height: 100%;width: 250px">
        <menu-tree></menu-tree>
      </el-aside>

    <el-container>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>

  </el-container>
</template>

<script>
import MenuTree from "./MenuTree"
export default {
  name: "Navbar",
  components:{MenuTree},
  data() {
    return {
      
    }
  },
  computed: {
     adminMenus() {
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
}
.el-container {
  height: 100%;
}
.el-main{
  /* display:block; */
  position: 
}
</style>