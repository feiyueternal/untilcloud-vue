<template>
  <div class="bgImg" :style="bgImg">
    <div class="Login">
      <el-row class="b-el-row">
        <el-col :span="12" :offset="6">
          <el-container>
            <el-header>{{ msg }}</el-header>
            <el-main>
              <el-tabs
                v-model="activetab"
                type="border-card"
                @tab-click="handleClick"
                :stretch="true"
              >
                <el-tab-pane label="账号登录" name="first">
                  <el-form ref="NormalloginForm" :model="NormalloginForm" :rules="rules">
                    <el-form-item prop="username">
                      <el-input
                        prefix-icon="iconfont icon-user"
                        clearable
                        ref="username"
                        v-model="NormalloginForm.username"
                        placeholder="账号"
                        name="username"
                        type="text"
                        tabindex="1"
                        autocomplete="on"
                      />
                    </el-form-item>

                    <el-form-item prop="password">
                      <el-input
                        prefix-icon="iconfont icon-password"
                        show-password
                        ref="password"
                        v-model="NormalloginForm.password"
                        placeholder="密码"
                        name="password"
                        tabindex="2"
                        autocomplete="on"
                        @blur="capsTooltip = false"
                        @keyup.enter.native="LoginClick"
                      />
                    </el-form-item>
                  </el-form>
                </el-tab-pane>
                <el-tab-pane label="手机验证码登录" name="second">
                  <el-form ref="PhoneloginForm" :model="PhoneloginForm" :rules="rules">
                    <el-form-item prop="phone">
                      <el-input
                        prefix-icon="iconfont icon-caigoutonggerenbangaobaozhenzhucedenglu20"
                        clearable
                        ref="phone"
                        v-model="PhoneloginForm.phone"
                        placeholder="手机"
                        name="phone"
                        type="text"
                        tabindex="1"
                        autocomplete="on"
                      />
                    </el-form-item>

                    <el-form-item prop="verificationCode">
                      <el-input
                        prefix-icon="iconfont icon-mail"
                        ref="verificationCode"
                        v-model="PhoneloginForm.verificationCode"
                        placeholder="验证码"
                        name="verificationCode"
                        tabindex="2"
                        autocomplete="on"
                        @blur="capsTooltip = false"
                      >
                        <el-button
                          slot="append"
                          @click.native.prevent="GetVCode"
                          :disabled="disabled"
                        >{{btntxt}}</el-button>
                      </el-input>
                    </el-form-item>
                  </el-form>
                </el-tab-pane>
                <el-row type="flex" justify="space-between" class="c-el-row">
                  <el-col :span="6">
                    <el-button class="norbtn" round @click.native.prevent="ForgetPw">忘记密码</el-button>
                  </el-col>
                  <el-col :span="6">
                    <el-button
                      class="norbtn"
                      round
                      type="info"
                      @click.native.prevent="RegisterAc"
                    >注册</el-button>
                  </el-col>
                </el-row>
                <el-button
                  class="loginbtn"
                  type="primary"
                  @click.native.prevent="LoginClick"
                  v-loading.fullscreen.lock="fullscreenLoading"
                >登录</el-button>
              </el-tabs>
            </el-main>
          </el-container>
        </el-col>
      </el-row>
    </div>
    <footer class="a-footer">copyright @ 2020 福州大学 到云 工程实践07组</footer>
  </div>
</template>

<script>
import { validatePhone } from "../utils/validRules";

export default {
  name: "Login",
  data() {
    return {
      activetab: "first", //tab首选项
      bgImg:{
        backgroundImage: "url(" + require("../assets/image/background1.jpg") + ") "
      },
      NormalloginForm: {
        username: "",
        password: ""
      },
      PhoneloginForm: {
        phone: "",
        verificationCode: ""
      },
      msg: "登录",
      fullscreenLoading: false, //加载画面
      nowactive: "",
      time: 0, //验证码倒计时
      disabled: false, //验证码按钮可用
      btntxt: "获取验证码", //验证码按钮文字
      rules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: validatePhone, trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        username: [
          { required: true, message: "请输入账户名", trigger: "blur" }
        ],
        verificationCode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          {type: 'string', min: 4, message: '验证码必须是4位', trigger: 'blur'}
        ]
      }
    };
  },
  mounted() {
    this.nowactive = this.activetab;
  },
  methods: {
    timer() {
      if (this.time > 0) {
        this.time--;
        this.btntxt = this.time + "s后重新获取";
        setTimeout(this.timer, 1000);
      } else {
        this.time = 0;
        this.btntxt = "获取验证码";
        this.disabled = false;
      }
    },

    handleClick(tab, event) {
      // console.log(tab.name);
      this.nowactive = tab.name;
    },
    GetVCode() {
      this.$refs["PhoneloginForm"].validate(valid => {
        if (valid) {
          var data = {
            phone: this.PhoneloginForm.phone,
            count: 4
          };
          var url = "/index/getVerificationCode";
          this.$http
            .get(url, { params: data })
            .then(res => {
              if (res.data.code == 200) {
                this.$message({
                  message: "发送成功",
                  type: "info"
                });
                this.time = 60;
                this.disabled = true;
                this.timer();
              }
            })
            .catch(err => {
              console.log(err);
              this.$message({
                message: err,
                type: "error"
              });
            });
        }
      });
    },
    LoginClick() {
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 1500);
      console.log(this.nowactive);
      if (this.nowactive == "first") {
        var data = {
          account: this.NormalloginForm.username,
          password: this.NormalloginForm.password
        };
        var url = "/index/common/login";
        var whichone = "NormalloginForm";
      } else {
        var data = {
          phone: this.PhoneloginForm.phone,
          verificationCode: this.PhoneloginForm.verificationCode
        };
        var url = "/index/common/phoneLogin";
        var whichone = "PhoneloginForm";
      }
      console.log(data);
      this.$refs[whichone].validate(valid => {
        if (valid) {
          this.$http
            .get(url, { params: data })
            .then(res => {
              if (res.data.code == 200) {
                this.$router.push({ name: "AdminIndex" }); //占位
              }else{
                console.log(res);
                this.$message.error(res.data.message);
              }
            })
            .catch(err => {
              console.log(err);
            });
        }else{
          this.$message.error("不可为空!");
        }
      });
    },
    ForgetPw() {
      this.$router.push({ name: "ForgetPassword" });
    },
    RegisterAc() {
      this.$router.push({ name: "Register" });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.b-el-row {
  margin-top: 100px;
}
.c-el-row {
  margin-top: 20px;
  margin-bottom: 20px;
}
.el-header {
  font-size: 45px;
  color: rgba(20, 68, 106, 1);
  font-family: "微软雅黑";
  text-align: center;
}
.loginbtn {
  width: 50%;
}
.bgImg {
  /* background: url("/assetsDir/image/background1.jpg"); */
  background-size: cover;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.el-tabs {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
}
.el-input {
  border-radius: 10px;
}
.el-tab-pane {
  font-family: Arial, Helvetica, sans-serif;
  border-radius: 10px;
}
.a-footer {
  margin-top: 10px;
}
.norbtn {
  width: 100%;
}
</style>
