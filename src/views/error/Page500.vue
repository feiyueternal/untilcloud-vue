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
  name: "Page500",
  data() {
    return {
      dialogVisible: false,
      img1: require("../../assets/image/u500.png"),
      img2: require("../../assets/image/t500.png"),
      message: "抱歉，服务器出错了!"
    };
  },
  methods: {
    back() {
      this.$router.push({ name: "AdminIndex" });
    }
  }
};
</script>

<style scoped>
.page404-container {
  text-align: center;
  margin-top: 30px;
  /*color: #d3dce6;*/
  /* margin-top: 3rem; */
  position: relative;
}
.img1 {
  margin-top: 30px;
  width: 50%;
  height: 50%;
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
