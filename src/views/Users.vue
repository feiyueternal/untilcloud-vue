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
        <el-col :span="3">
          <el-button type="danger" @click="DeletechosenRoles">批量删除</el-button>
        </el-col>
        <el-col :span="3">
        <el-button type="success" icon="el-icon-refresh" @click="GetUsersAll"></el-button>
        </el-col>
      </el-row>
      <el-table
        :data="userList.slice((userListInfo.pagenum-1)*userListInfo.pagesize,userListInfo.pagenum*userListInfo.pagesize)"
        style="width: 100%"
        border
        stripe
        @selection-change="handleSelectionChange"
        ref="table"
      >
        <el-table-column type="selection" width="30"></el-table-column>
        <el-table-column type="index" label="序号" width="55"></el-table-column>
        <el-table-column prop="username" label="用户名" width="100"></el-table-column>

        <el-table-column prop="name" label="真实姓名" width="100"></el-table-column>
        <el-table-column prop="enabled" label="状态" width="100">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.enabled" @change="userStateChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column prop="roles[0].nameZh" label="角色类型"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeUserById(scope.row.id)"
            ></el-button>
            <el-tooltip effect="dark" content="重置密码" placement="top" :enterable="false">
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
                @click="showResetDialog(scope.row)"
              ></el-button>
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
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="50%"
      :append-to-body="true"
      @close="addDialogClosed"
    >
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

    <el-dialog
      title="修改用户"
      :visible.sync="editDialogVisible"
      width="50%"
      :append-to-body="true"
      @close="editDialogClosed"
    >
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
        <el-form-item label="用户ID">
          <el-input v-model="editForm.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="editForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <!-- <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
        >全选</el-checkbox>
        <div style="margin: 15px 0;"></div>-->
        <el-checkbox-group v-model="checkedRoles" @change="handleCheckedRolesChange">
          <el-checkbox v-for="role in roles" :label="role" :key="role">{{role}}</el-checkbox>
        </el-checkbox-group>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo(editForm)">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修改密码" :visible.sync="resetDialogVisible" width="50%" :append-to-body="true" @close="resetDialogClosed">
       <el-form :model="resetPwd" :rules="resetFormRules" ref="resetFormRef" label-width="70px">
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="resetPwd.newPassword"></el-input>
        </el-form-item>
        </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="resetUserPwd(resetPwd)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    var checkEmail = (rule, value, cb) => {
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      if (regEmail.test(value)) {
        return cb();
      }
      cb(new Error("请输入合法的邮箱"));
    };
    var checkMobile = (rule, value, cb) => {
      const regMobile = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      if (regMobile.test(value)) {
        return cb();
      }
      cb(new Error("请输入合法的手机号"));
    };
    return {
      // checkAll: false,
      resetPwd: {
      newPassword: '',
      username: ''
      },
      resetDialogVisible: false,
      checkedRoles: [],
      roles: [],
      // rolesId: [],
      // isIndeterminate: true,
      userListInfo: {
        pagenum: 1,
        pagesize: 5,
        total: 0
      },
      keywords: "",
      password: "",
      userList: [],
      rolesData: [],//this.$store.state.rolesData,
      // rolesList: []
      addDialogVisible: false,
      addForm: {
        username: "",
        password: "",
        name: "",
        mobile: "",
        email: ""
      },
      editForm: {
        id: "",
        username: "",
        name: "",
        phone: "",
        email: "",
        roles: []
      },
      editDialogVisible: false,
      selections: [],
      resetFormRules: {
        newPassword: [   { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "密码的长度在3~10个字符之间",
            trigger: "blur"
          }
        ]
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
        name: [{ required: true, message: "请输入真实姓名", trigger: "blur" }],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "请输入手机", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" }
        ]
      },
      editFormRules: {
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入手机", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getUserList();
    this.getRolesData();
    // this.$store.dispatch("getRolesData");
    // this.getRoles();
    // console.log(this.$store.state.rolesData)
  },
  mounted() {
    // this.getRoles();
    //  console.log(this.$store.state.rolesData)
    //  console.log(this.rolesData)
  },
  computed: {
    // rolesData() {
    //   return this.$store.state.rolesData
    // }
  },
  methods: {
    // handleCheckAllChange(val) {
    //   this.checkedRoles = val ? roles : [];
    //   this.isIndeterminate = false;
    // },
    GetUsersAll() {
      this.getUserList();
    },
    getRolesData() {
      this.$http.get('/index/admin/user/role')
          .then(res => {
            if(res.data.code == 200) {
              this.rolesData = [];
              for(var i = 0; i < res.data.data.length; i++){
                this.rolesData.push(res.data.data[i])
              }
            }else {
              this.$message.error(res.data.message);
            }
          })
          .catch(err => {
            console.log(err);
          })
    },
    handleCheckedRolesChange(value) {
      console.log(value.length);
      this.editForm.roles = [];
      for(var i = 0; i < value.length; i++) {
        for(var j = 0; j < this.rolesData.length; j++) {
          if(value[i] !== this.rolesData[j].nameZh) {
            continue;
          }else {
            this.editForm.roles.push({'id':this.rolesData[j].id})
            break;
          }
        }
      }
      console.log(this.editForm.roles)
      // let checkedCount = value.length;
      // this.checkAll = checkedCount === this.roles.length;
      // this.isIndeterminate = checkedCount > 0 && checkedCount < this.roles.length
    },
    getRoles() {
      this.roles = [];
      for (var i = 0; i < this.rolesData.length; i++) {
        this.roles.push(this.rolesData[i].nameZh)
        // this.roles[i] = this.rolesData[i].nameZh;
      }
      // console.log(this.roles)
    },
    getUserList() {
      // console.log(this.rolesData);
      // this.$store.dispatch('getRolesData')
      this.userList = [];
      this.$http
        .get("/index/admin/role/user")
        .then(res => {
          console.log(res.data)
          for (var i = 0; i < res.data.data.length; i++) {
            this.userList.push(res.data.data[i]);
            // this.rolesList[i] = res.data[i].roles
          }
          this.userListInfo.total = res.data.data.length;
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
      this.$refs.addFormRef.resetFields();
    },
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },
    resetDialogClosed() {
      this.$refs.resetFormRef.resetFields();
    },
    addUser(addForm) {
      this.$refs.addFormRef.validate(valid => {
        console.log(valid);
        if (!valid) return;
        this.$http
          .post("/index/admin/user/add", {
            username: addForm.username,
            password: addForm.password,
            name: addForm.name,
            phone: addForm.mobile,
            email: addForm.email
          })
          .then(res => {
            console.log(res);
            // console.log(this.addForm)
            if (res.data.code == 200) {
              this.$message.success("添加用户成功");
              this.addDialogVisible = false;
              this.getUserList();
            } else {
              this.$message.error(res.data.message);
              this.addDialogVisible = false;
            }
          })
          .catch(err => {
            console.log(err);
          });
      });
    }, 
    showResetDialog(info) {
      this.resetDialogVisible = true;
      this.resetPwd.username = info.username
      console.log(this.resetPwd);
    },
    showEditDialog(info) {
      // console.log(info);
      // console.log(this.rolesData);
      this.getRoles(), (this.editForm.id = info.id);
      this.editForm.username = info.username;
      this.editForm.name = info.name;
      this.editForm.phone = info.phone;
      this.editForm.email = info.email;
      this.editForm.roles = info.roles;

      if (this.editForm.roles.length == 0) {
        this.checkedRoles = [];
      } else {
        this.checkedRoles = [];
        for (var i = 0; i < this.editForm.roles.length; i++) {
          this.checkedRoles[i] = this.editForm.roles[i].nameZh;
        }
      }
      console.log(this.editForm), (this.editDialogVisible = true);
    },
    editUserInfo(editForm) {
      this.$refs.editFormRef.validate(valid => {
        console.log(valid);
        if (!valid) return;
        this.$http
          .put("/index/admin/user/edit", {
            id: editForm.id,
            username: editForm.username,
            name: editForm.name,
            phone: editForm.phone,
            email: editForm.email,
            roles: editForm.roles
          })
          .then(res => {
            console.log(res);
            if (res.data.code == 200) {
              this.$message.success("修改用户信息成功");
              this.editDialogVisible = false;
              this.getUserList();
            } else {
              this.$message.error(res.data.message);
              this.editDialogVisible = false;
            }
          })
          .catch(err => {
            console.log(err);
          });
      });
    },
    resetUserPwd(resetPwd) {
      this.$refs.resetFormRef.validate(valid => {
        console.log(valid);
        if (!valid) return;
        this.$http
          .put("/index/admin/user/password", {
            username: resetPwd.username,
            password: resetPwd.newPassword
          })
          .then(res => {
            console.log(res);
            if (res.data.code == 200) {
               this.$message.success("修改用户密码成功");
                this.resetDialogVisible = false;
              this.getUserList();
            }else {
              this.$message.error(res.data.message);
              this.resetDialogVisible = false;
            }
          })
           .catch(err => {
            console.log(err);
          });
      })
    },
    removeUserById(id) {
      console.log(id);
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .get("/index/admin/user/delete", { params: { uid: id } })
            .then(res => {
              if (res.data.code == 200) {
                this.$message.success("成功删除该用户");
                this.getUserList();
              } else {
                this.$message.error(res.data.message);
                this.getUserList;
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleSelectionChange() {
      // this.$emit("DeleteChosenRoles",this.$refs.table.selection)
      // console.log(this.$refs.table.selection)
      for (var i = 0; i < this.$refs.table.selection.length; i++) {
        this.selections[i] = this.$refs.table.selection[i].id;
      }
      console.log(this.selections);
    },
    DeletechosenRoles() {
      this.$confirm("是否确认删除选中的角色?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var id_nums = [];
          for (var i = 0; i < this.selections.length; i++) {
            id_nums.push(this.selections[i]);
          }
          console.log(id_nums);
          var data = {
            userIds: id_nums
          };
          this.$http
            .post("/index/admin/user/delete", data)
            .then(res => {
              if (res.data.code == 200) {
                this.$message.success("成功删除选中的用户");
                this.getUserList();
              } else {
                this.$message.error(res.data.message);
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // showResetDialog() {
    //   // console.log(pwd)
    // }
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