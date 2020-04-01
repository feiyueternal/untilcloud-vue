<template>
<el-row style="height:100%">
  <el-col style="height:100%">
    <el-menu
    :unique-opened="unique"
    class="el-menu-admin"
    router
    mode="vertical"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse="isCollapse"
    style="height:100%">
      <!--index 没有用但是必需字段-->
      <template v-for="(item) in adminMenus">
      
      <el-menu-item v-if="item.children.length===0" style="text-align: left" :index="item.id.toString()"
      @click="handleRoute(item)">
        <span slot="title" style="font-size: 17px;">
          <i :class="item.iconCls"></i>
          {{item.nameZh}}
        </span>
      </el-menu-item>

      <el-submenu  v-else :key="item.id" :index="item.id.toString()" style="text-align: left">
        <span slot="title" style="font-size: 17px;">
          <i :class="item.iconCls"></i>
          {{item.nameZh}}
        </span>
        <el-menu-item v-for="child in item.children" :key="child.path" :index="child.path" 
        @click="handleRoute(child)">
          <i :class="child.icon"></i>
          {{ child.nameZh }}
        </el-menu-item>
      </el-submenu>
      </template>
    </el-menu>
    </el-col>
    </el-row>
</template>

<script>
export default {
  name: "MenuTree",
  data(){
    return{
      isCollapse: false,
      unique:true
    }
  },
  computed: {
    
    adminMenus() {
      return this.$store.state.adminMenus;
    },
    currentPath(){
      return this.$router.path;
    }
  },
  methods:{
    handleRoute(menu){
      // this.$router.push({name:menu.name})
      console.log(menu)
      this.$router.push({path:menu.path})
    }
  }
};
</script>