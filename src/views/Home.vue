<template>
  <div class="home">
    <span class="text-t">Welcome</span>
    <img :src="img" alt="" class="imgf">
  </div>
</template>

<script>
import logo from '@/assets/image/IMG_6103.jpg'

export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      img:logo
    }
    
  }
}
</script>

<style scoped>
.text-t{
  text-align: center;
  color: black;
  font-size: 64px;
  line-height: 64px;
}
.imgf{
  width: 90%;
  height: 90%;
  background-size: cover;
}
</style>
