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
          <el-button type="primary">添加用户</el-button>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      userListInfo: {
        pagenum: 1,
        pagesize: 5,
        total: 0
      },
      keywords: "",
      userList: []
      // rolesList: []
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    getUserList() {
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