<template>
  <div class="page404-container">
    <img :src="img2" alt class="img2" />

    <div class="title">{{message}}</div>

    <el-button round type="primary" style="width: 100px" @click="back">返回首页</el-button>
    <div>
      <img :src="img1" alt class="img1" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Page404",
  data() {
    return {
      dialogVisible: false,
      img1: require("../../assets/image/u404.png"),
      img2: require("../../assets/image/t404.png"),
      message: "抱歉，您访问的页面不存在!"
    };
  },
  methods: {
    back() {
      this.$router.push({ path: "/Home" });
    }
  }
};
</script>

<style scoped>
.page404-container {
  text-align: center;
  /*color: #d3dce6;*/
  /* margin-top: 3rem; */
  position: relative;
}
.img1 {
  margin-top: 30px;
  width: 35%;
  height: 35%;
}
.img2 {
  width: 20%;
  height: 20%;
  position: relative;
}
.title {
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 32px;
}
</style>
