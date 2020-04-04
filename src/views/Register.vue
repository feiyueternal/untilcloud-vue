<template>
  <div :style="bgImg" class="bgImg">
    <div class="register">
      <el-page-header title="返回登录页面" @back="Back"></el-page-header>
      <el-row class="b-el-row">
        <el-col :span="12" :offset="6">
          <el-container>
            <el-header>{{ msg }}</el-header>
            <el-main>
              <el-card class="box-card">
                <div id="reg">
                  <el-form
                    ref="RegisterForm"
                    :rules="rules"
                    :model="RegisterForm"
                    label-width="110px"
                    label-position="right"
                  >
                    <el-form-item label="用户名:" prop="username">
                      <el-col :span="20">
                        <el-input
                          v-model="RegisterForm.username"
                          placeholder="由5-10个字符组成(包括字母、数字及下划线)"
                          clearable
                        ></el-input>
                      </el-col>
                    </el-form-item>
                    <el-form-item label="密码:" prop="password">
                      <el-col :span="20">
                        <el-input
                          v-model="RegisterForm.password"
                          placeholder="由6-20个字符组成(包括字母、数字及下划线)"
                          show-password
                        ></el-input>
                      </el-col>
                    </el-form-item>
                    <el-form-item label="确认密码:" prop="confirmps">
                      <el-col :span="20">
                        <el-input
                          v-model="RegisterForm.confirmps"
                          placeholder="再次输入密码"
                          show-password
                        ></el-input>
                      </el-col>
                    </el-form-item>
                    <el-form-item label="真实姓名:">
                      <el-col :span="20">
                        <el-input v-model="RegisterForm.name" placeholder="真实姓名" clearable></el-input>
                      </el-col>
                    </el-form-item>
                    <el-form-item label="手机号码:" prop="phone">
                      <el-col :span="20">
                        <el-input v-model="RegisterForm.phone" placeholder="手机号码" clearable></el-input>
                      </el-col>
                    </el-form-item>

                    <el-form-item label="验证码" prop="verificationCode">
                      <el-col :span="20">
                        <el-input
                          v-model="RegisterForm.verificationCode"
                          placeholder="请输入验证码"
                          clearable
                        >
                          <el-button
                            size="small"
                            slot="append"
                            @click.native.prevent="GetVCode"
                            :disabled="disabled"
                          >{{btntxt}}</el-button>
                        </el-input>
                      </el-col>
                    </el-form-item>

                    <el-form-item label="邮箱地址:" prop="email">
                      <el-col :span="20">
                        <el-input v-model="RegisterForm.email" placeholder="邮箱地址" clearable></el-input>
                      </el-col>
                    </el-form-item>
                    <el-button type="success" @click.native.prevent="RegConfirm">确认注册</el-button>
                  </el-form>
                </div>
              </el-card>
            </el-main>
          </el-container>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {
  validatePhone,
  validateEmail,
  validatePassword,
  validateUsername
} from "../utils/validRules";
import qs from "qs";

export default {
  name: "Register",
  data() {
    var validateConfirmps = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.RegisterForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      msg: "注册",
      bgImg: {
        backgroundImage:
          "url(" + require("../assets/image/background2.jpg") + ") "
      },
      RegisterForm: {
        username: "",
        password: "",
        name: "",
        phone: "",
        email: "",
        confirmps: ""
      },
      time: 0, //验证码倒计时
      disabled: false, //验证码按钮可用
      btntxt: "获取验证码", //验证码按钮文字,
      verificationCode:"",
      rules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: validatePhone, trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { validator: validatePassword, trigger: "blur" }
        ],
        username: [
          { required: true, message: "请输入账户名", trigger: "blur" },
          { validator: validateUsername, trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: validateEmail, trigger: "blur" }
        ],
        confirmps: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { validator: validateConfirmps, trigger: "blur" }
        ],
        verificationCode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          {
            type: "string",
            min: 4,
            message: "验证码必须是4位",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    Back() {
      this.$router.push({ name: "Login" });
    },
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
    GetVCode() {
      //验证码验证功能未完善
      if (this.RegisterForm.phone) {
        var data = {
          phone: this.RegisterForm.phone,
          count: 4
        };
        var url = "/index/common/getVerificationCode";
        this.$http
          .get(url, { params: data })
          .then(res => {
            if (res.data.code == 200) {
              this.$message.success("发送成功")
              this.time = 60;
              this.disabled = true;
              this.timer();
            }
          })
          .catch(err => {
            console.log(err);
            this.$message.error("发送失败")
          });
      }
    },
    RegConfirm() {
      this.$refs["RegisterForm"].validate(valid => {
        if (valid) {
          var data = {
            username: this.RegisterForm.username,
            password: this.RegisterForm.password,
            name: this.RegisterForm.name,
            phone: this.RegisterForm.phone,
            email: this.RegisterForm.email
          };
          var url =
            "/index/common/register?VerificationCode=" + this.verificationCode;
          console.log(data);
          this.$http
            .post(url, data)
            .then(res => {
              console.log(res);
              if (res.data.code == 200) {
                this.$message.success(res.data.message);
                this.$router.push({ name: "Login" }); 
              } else {
                console.log(res);
                this.$message.error(res.data.message);
              }
            })
            .catch(err => {
              console.log(err);
              this.$message.error("注册失败")
            });
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bgImg {
  /* background: url("/assetsDir/image/background2.jpg"); */
  background-size: cover;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.b-el-row {
  margin-top: 40px;
}
.el-header {
  font-size: 45px;
  color: rgba(250, 229, 111, 1);
  font-family: "微软雅黑";
  text-align: center;
}
.el-card {
  background: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
}

#reg >>> .el-form-item__label {
  font-size: 18px;
  color: black;
}
</style>
