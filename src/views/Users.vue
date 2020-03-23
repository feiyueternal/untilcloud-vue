<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户配置</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="10">
        <el-col :span="7">
          <el-input placeholder="请输入内容" v-model="keywords" clearable @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="searchUser(keywords)"></el-button>
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <el-table
        :data="userList.slice((userListInfo.pagenum-1)*userListInfo.pagesize,userListInfo.pagenum*userListInfo.pagesize)"
        style="width: 100%"
        border
        stripe
      >
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="name" label="用户名" width="180"></el-table-column>
        <el-table-column prop="enabled" label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.enabled" @change="userStateChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="roles[0].nameZh" label="角色类型"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="userListInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="userListInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="userListInfo.total"
      ></el-pagination>
    </el-card>
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" :append-to-body="true" @close="addDialogClosed">
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser(addForm)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    var checkEmail = (rule, value, cb) => {
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if (regEmail.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法的邮箱'))
    }
    var checkMobile = (rule, value, cb) => {
      const regMobile = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if (regMobile.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法的手机号'))
    }
    return {
      userListInfo: {
        pagenum: 1,
        pagesize: 5,
        total: 0
      },
      keywords: "",
      userList: [],
      // rolesList: []
      addDialogVisible: false,
      addForm: {
        username: '',
        password: '',
        name: '',
        mobile: '',
        email: ''
        
      },
      addFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "用户名的长度在3~10个字符之间",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "密码的长度在3~10个字符之间",
            trigger: "blur"
          }
        ],
        name: [{ required: true, message: "请输入真实姓名", trigger: "blur"}],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" },
                { validator: checkEmail, trigger: "blur"}],
        mobile: [{ required: true, message: "请输入手机", trigger: "blur" },
                 {validator: checkMobile, trigger: "blur"}]
      }
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    getUserList() {
      this.userList = []
      this.$http
        .get("/index/admin/user/all")
        .then(res => {
          // console.log(res.data)
          for (var i = 0; i < res.data.length; i++) {
            
            this.userList.push(res.data[i]);
            // this.rolesList[i] = res.data[i].roles
          }
          this.userListInfo.total = res.data.length;
          console.log(this.userList);
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSizeChange(newSize) {
      this.userListInfo.pagesize = newSize;
      // this.getUserList();
      console.log(this.userListInfo.pagesize);
    },
    handleCurrentChange(newPage) {
      console.log(newPage);
      this.userListInfo.pagenum = newPage;
    },
    userStateChange(userinfo) {
      console.log(userinfo);
      // var data = {
      //   id: userinfo.id,
      //   enabled: userinfo.enabled
      // }
      this.$http
        .put("/index/admin/user/status", {
          id: userinfo.id,
          enabled: userinfo.enabled,
          username: userinfo.username
        })
        .then(res => {
          console.log(res);
          if (res.data.code !== 200) {
            userinfo.enabled = !userinfo.enabled;
            return this.$message.error(res.data.data);
          }
          this.$message.success("更新用户状态成功!");
        })
        .catch(err => {
          console.log(err);
        });
    },
    searchUser(keywords) {
      // console.log(keywords)
      this.$http
        .get("/index/admin/user/search", { params: { keywords } })
        .then(res => {
          console.log(res.data.data);
          if (keywords == "") {
            this.getUserList();
          } else {
            if (res.data.data.length == 0) {
              return this.$message.error("该用户不存在");
            }
            this.userList = [];
            console.log(this.userList);
            this.userList.push(res.data.data[0]);
            console.log(this.userList);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    addUser(addForm) {
        
      this.$refs.addFormRef.validate(valid => {
        console.log(valid)
        if (!valid) return
        this.$http.post("/index/admin/user/add", {
          username: addForm.username,
          password: addForm.password,
          name: addForm.name,
          phone: addForm.mobile,
          email: addForm.email
        })
        .then(res => {
          console.log(res)
          // console.log(this.addForm)
          if (res.data.code == 200) {
            this.$message.success('添加用户成功')
            this.addDialogVisible = false
            this.getUserList()
          }
          else {
            this.$message.error(res.data.message)
            this.addDialogVisible = false
          }
          
        })
        .catch(err => {
          console.log(err)
        })
      })
    }
  }
};
</script>

<style scoped>
.el-breadcrumb {
  margin-bottom: 15px;
  /* font-size: 12px; */
}
.el-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
}
.el-table {
  margin-top: 15px;
}
.el-pagination {
  margin-top: 15px;
}
</style>