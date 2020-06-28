<template>
  <div class="about">
    <h2>关于我们</h2>
    <el-divider></el-divider>
    <div class="text-ii">
      <div></div>
      <span>到云是一款免费课堂互动教学工具。它基于移动互联环境，实现了老师与学生之间的即时互动，学生通过使用该软件在移动终端完成加入班课、课程签到等相关操作，老师通过该软件创建班课、发布签到活动来实现对课堂的点名，并对学生的出勤率进行分析，更好地掌握学生的学习状态。到云能为老师提供高质量的教学研究数据，实现个性化智能助学和智能助教功能。</span>
      <div></div>
      <span>本系统版权所有归福州大学数计学院 2019 级研究生工程实践07组所有。本软件不得用于商业用途，仅做学习交流。</span>
    </div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>工程实践07组</span>
      </div>
      <div>组长：张钟旺 190327125</div>
      <div>组员：曾梦美 190327005</div>
      <div class="emm">
      <div>陈隽雅 190327014</div>
      <div>陈龙江 190327015</div>
      <div>兰  霖 190327042</div>
      </div>
    </el-card>
    <footer class="a-footer">copyright @ 2020 福州大学 到云 工程实践07组</footer>
  </div>
</template>

<script>
export default {
  name: "About"
};
</script>
<style scoped>
.text-ii {
  font-size: 19px;
  /* text-align: justify; */
  text-align: left;
  text-indent:2em;
}
.clearfix{
  font-size: 24px;
}
			
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.el-card__header {
  background-color: darkcyan;
}
.emm{
  text-indent:3em;
}

.box-card {
  width: 450px;
  /* background-color:darkcyan; */
  text-align: center;
  vertical-align: middle;
  margin: 30px auto;
}
.a-footer {
  margin-top: 30px;
  margin-bottom: 20px;
}
</style>