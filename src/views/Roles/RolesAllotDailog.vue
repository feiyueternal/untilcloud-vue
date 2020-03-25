<template>
  <el-dialog
    title="用户分配"
    :visible.sync="AllotDialogVisible"
    width="85%"
    :append-to-body="true"
    @close="AllotDialogVisible=false"
    v-loading="loading"
  >
    <div v-if="users">
      <el-table :data="users" ref="table" border stripe style="width: 100%" 
      @selection-change="Count">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column align="center" fixed type="index" width="50" prop="id" label="用户id"></el-table-column>
        <el-table-column align="center" fixed prop="username" label="用户名"></el-table-column>
        <el-table-column align="center" prop="name" fixed label="真实姓名"></el-table-column>
        <el-table-column align="center" prop="enabled" label="状态">
          <template slot-scope="scope">
            <el-switch disabled v-model="scope.row.enabled"></el-switch>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="phone" label="手机号"></el-table-column>
        <el-table-column align="center" prop="email" label="邮箱"></el-table-column>
      </el-table>
    </div>
    <el-col>
        <el-row>共有{{totalnum}}名用户，已选中{{selectednum}}人</el-row>
    </el-col>
    <span slot="footer" class="dialog-footer">
      <el-button @click="AllotDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click.native.prevent="updateUsers">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "RolesAllotDialog",
  data() {
    return {
      AllotDialogVisible: false,
      rid: "",
      userIds: [],
      users: [],
      loading: false,
      selectedUsers: [],
      selectednum:0,
      totalnum:0
    };
  },
  methods: {
    open(row) {
      this.rid = row.id;
      this.AllotDialogVisible = true;
      this.loading = true;
      this.getSelect();
      this.$nextTick(() => {
        this.$refs.table.clearSelection();
        for (var i = 0; i < this.selectedUsers.length; i++) {
          this.$refs.table.toggleRowSelection(this.selectedUsers[i], true);
        }
      });
      setTimeout(() => {
        this.loading = false;
      }, 600);
    },
    Count(){
        this.selectednum=this.$refs.table.selection.length
    },
    getSelect() {
      return new Promise((resolve, reject) => {
        // console.log("2");
        this.selectedUsers = [];
        // console.log(this.selectedUsers);
        for (let i = 0; i < this.users.length; i++) {
          for (let j = 0; j < this.users[i].roles.length; j++) {
            if (this.users[i].roles[j].id == this.rid) {
              this.selectedUsers.push(this.users[i]);
              break;
            }
          }
        }
        // console.log(this.selectedUsers)
      });
    },
    load() {
      //   console.log("1");
      return new Promise((resolve, reject) => {
        this.loading = true;
        var url = "/index/admin/user/all";
        setTimeout(() => {
          this.$http
            .get(url)
            .then(res => {
              if (res.status == 200) {
                this.users = res.data;
                this.totalnum=this.users.length
              } else {
                this.$message.error("获取用户名单失败");
              }
            })
            .catch(err => {
              console.log(err);
            });
          this.loading = false;
        }, 1200);
        // console.log("14")
      });
    },
    updateUsers() {
      //   console.log(this.$refs.table.selection);
      var nowchoose = [];
      nowchoose = this.$refs.table.selection;
      //   console.log(nowchoose)
      this.userIds=[]
      for (let i = 0; i < nowchoose.length; i++) {
        this.userIds.push(nowchoose[i].id);
      }
      //   console.log(this.userIds)
      var url = "/index/admin/role/user?rid=";
      var data={
          userIds:this.userIds
      }
      console.log(data)
      this.$http.put(url+this.rid,data).then(res => {
        //   console.log(res)
          if(res.data.code==200){
              this.$message.success("分配角色成功")
              this.load()
              this.AllotDialogVisible = false;
          }else{
              this.$message.error("分配用户出错")
          }
      }).catch(err => {
          console.log(err)
      })
    }
  },
  created() {
    this.load();
  }
};
</script>
<style scoped>
</style>
