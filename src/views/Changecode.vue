<template>
  <div class="bgImg" :style="bgImg">
    <div class="forget">
      <el-page-header title="返回首页" @back="Back"></el-page-header>
      <el-row class="b-el-row">
        <el-col :span="12" :offset="6">
          <el-container>
            <el-header>{{ msg }}</el-header>
            <el-main>
                <el-card class="box-card">
                    <div id="reg">
                    <el-form
                        ref="ForgetForm"
                        :rules="rules"
                        :model="ForgetForm"
                        label-width="110px"
                        label-position="right"
                        >
                        <el-form-item label="手机号码:" prop="phone">
                        <el-col :span="20">
                            <el-input v-model="ForgetForm.phone" placeholder="请输入您的手机号码" clearable></el-input>
                        </el-col>
                        </el-form-item>

                        <el-form-item label="新密码:" prop="password">
                        <el-col :span="20">
                            <el-input
                            v-model="ForgetForm.password"
                            placeholder="请由6-20个字符组成(包括字母、数字及下划线)"
                            show-password
                            ></el-input>
                        </el-col>
                        </el-form-item>

                        <el-form-item label="确认密码:" prop="confirmps">
                        <el-col :span="20">
                            <el-input v-model="ForgetForm.confirmps" placeholder="再次输入新密码" 
                            show-password></el-input>
                        </el-col>
                        </el-form-item>

                        <el-form-item label="验证码:" prop="verificationCode">
                        <el-col :span="20">
                            <el-input v-model="ForgetForm.verificationCode" placeholder="请输入验证码" clearable>
                            <el-button
                            slot="append"
                            @click.native.prevent="GetVCode"
                            :disabled="disabled"
                            >{{btntxt}}</el-button>
                            </el-input>
                        </el-col>
                        </el-form-item>

                        <el-button type="primary" @click.native.prevent="FgtConfirm">确认找回</el-button>

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
import { validatePhone, validatePassword } from "../utils/validRules";

export default {
  name: "Changecode",
  data() {
      var validateConfirmps = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ForgetForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      bgImg: {
        backgroundImage:
          "url(" + require("../assets/image/background1.jpg") + ") "
      },
      msg: "找回密码",
      ForgetForm: {
        phone: "",
        password: "",
        verificationCode: "",
        confirmps: ""
      },
      time: 0, //验证码倒计时
      disabled: false, //验证码按钮可用
      btntxt: "获取验证码", //验证码按钮文字
      rules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: validatePhone, trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { validator: validatePassword, trigger: "blur" }
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
      this.$router.push({ path: "/" });
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
      if(this.ForgetForm.phone){ {
          var data = {
            phone: this.ForgetForm.phone,
            count: 4
          };
          var url = "/index/common/getVerificationCode";
          this.$http
            .get(url, { params: data })
            .then(res => {
              if (res.data.code == 200) {
                this.$message.success("发送成功")
                console.log("验证码")
                console.log(res.data)
                this.time = 60;
                this.disabled = true;
                this.timer();
              }
            })
            .catch(err => {
              console.log(err);
              this.$message.error("发送失败");
            });
        }
      }
    },
    FgtConfirm(){
        var data={
            phone:this.ForgetForm.phone,
            password:this.ForgetForm.password,
            verificationCode:this.ForgetForm.verificationCode
        };
        var url="/index/common/forgetPassword";
        this.$refs['ForgetForm'].validate(valid => {
        if (valid) {
          this.$http
            .get(url, { params: data })
            .then(res => {
              if (res.data.code == 200) {
                this.$message.success("修改密码成功")
                this.$router.push({ name: "Login" });
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
        
    }
  }
};
</script>

<style scoped>
.b-el-row {
  margin-top: 90px;
}
.bgImg {
  background-size: cover;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.el-card {
  background: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
}
.el-header {
  font-size: 45px;
  color: rgba(20, 68, 106, 1);
  font-family: "微软雅黑";
  text-align: center;
}
#reg >>> .el-form-item__label {
  font-size: 18px;
  color: black;
}
</style>
