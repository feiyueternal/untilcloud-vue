<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Element UI</h2>
    <el-button @click="jump">test</el-button>
    
  </div>
</template>

<script>
export default {
  name: 'Changecode',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    jump(){
      this.$router.push({path:'/'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
