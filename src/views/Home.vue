<template>
  <div class="home">
    <img :src="img" alt="">
   
    <!-- <HelloWorld msg="Welcome to Your the home"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data() {
    return {
      img:require("../assets/image/IMG_6399.jpg")
    }
    
  }
}
</script>

<style scoped>
</style>
