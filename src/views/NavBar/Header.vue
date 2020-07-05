<template>
  <div class="header">
    <a href="/admin">
      <img :src="img" alt="" width="55px" style="float: left;">
    </a>
    <span class="text-t">untilCloud-07</span>
    <el-tooltip effect="dark" content="登出" placement="top" :enterable="false">
        <el-button 
          circle
      
          icon="el-icon-switch-button"
          v-on:click="logout" 
          style="float: right">
        </el-button>
    </el-tooltip>
  </div>
</template>

<script>
import log from '@/assets/image/earth.png'
  export default {
    name: 'Header',
    data(){
      return {
        img:log,
      }
    },
    methods: {
      logout () {
       
        var url="/index/common/logout"
        this.$http.get(url).then(res => {
          if (res.data.code === 200) {
            this.$store.commit('logout')
            // console.log(res.data)
            this.$message.success("再会")
            this.$router.replace({path:"/"})
          }else{
            this.$message.error("登出发生错误")
            // console.log(res.data)
          }
        }).catch(err => {
            // console.log(err)
        })

      }
    }
  }
</script>

<style scoped>
.el-button{
  margin-top: 12.5px;
  margin-bottom: 12.5px;
  background-color:	#93BEA6;
  border-color: black;
  color: black;
}
.header{
  display: block;
}
.text-t{
  text-align: center;
  color: white;
  font-size: 32px;
  line-height: 64px;
}

</style>
