<template>
  <div class="home">
    <span class="text-t">{{name}},欢迎您使用本系统</span>
    <div></div>
    <span class="text-x">点击左边模块使用本系统</span>
    <div></div>
    <img :src="img" alt="" class="imgf">
  </div>
</template>

<script>
import logo from '@/assets/image/arrows.jpg'

export default {
  name: 'Home',
  data() {
    return {
      img:logo,
      name:""
    }
    
  },
  methods:{
    init(){
      this.name=this.$store.state.CLouduser.username
      console.log(this.$store.state.CLouduser.username)
    }
  },
  mounted(){
    this.init()
  },
  created(){
    this.init()
  }
}
</script>

<style scoped>
.text-t{
  text-align: center;
  color: black;
  font-size: 32px;
  line-height: 64px;
}
.text-x{
  text-align: center;
  color: pink;
  font-size: 24px;
  line-height: 64px;
}
.imgf{
  width: 400px;
  height: 400px;
  background-size: cover;
}
</style>
