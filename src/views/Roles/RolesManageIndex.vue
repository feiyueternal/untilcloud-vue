<template>
    <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户配置</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容" v-model="keywords" clearable @clear="GetRolesAll">
            <el-button slot="append" icon="el-icon-search" @click="SearchRoles(keywords)"></el-button>
          </el-input>
        </el-col>
        <el-col :span="2">
        <el-button type="primary">新增角色</el-button>
        </el-col>
        <el-col :span="2">
        <el-button type="danger" @click="DeletechosenRoles">批量删除</el-button>
        </el-col>
      </el-row>
    <div class="roles-table">
    <roles-manage-table
      @rolesInfo-Show="showOpen"
      @DeleteChosenRoles="GetSelections"
      ref="rolesmanageTable">
    </roles-manage-table>
    </div>
    <roles-info-show-drawer ref="rolesinfoShowDrawer"></roles-info-show-drawer>
    </el-card>
  </div>
</template>

<script>
import RolesManageTable from './RolesManageTable'
import RolesInfoShowDrawer from './RolesInfoShowDrawer'

export default {
    name:"Roles",
    components:{RolesManageTable,RolesInfoShowDrawer},
    data(){
      return{
        keywords:"",
        selections:[]
      }
    },
    methods: {
      showOpen (row) {
        this.$refs.rolesinfoShowDrawer.open(row);
      },
      GetRolesAll(){
        this.$refs.rolesmanageTable.load()
      },
      SearchRoles(keywords){
        var url="/index/admin/role/search";
        if(keywords==""){
          this.GetRolesAll()
        }else{
          this.$http.get(url,{
            params:{keywords}
          }).then(res => {
            if(res.data.code==200){
              if(res.data.data==undefined||res.data.data.length<=0){
                return this.$message.error("该用户不存在");
              }else{
                this.$message.success("模糊查找成功")
                this.$refs.rolesmanageTable.load(res.data.data)
              }
            }else{
              this.$message.error(res.data.message)
            }
          }).catch(err => {
            console.log(err)
          })
        }
      },
      GetSelections(val){
        this.selections=val
        // console.log(this.selections)
      },
      //未测试
      DeletechosenRoles(val){
        var id_nums=[]
        var url="/index/admin/role/delete"
        for (var i = 0; i < this.selections.length; i++) {
          id_nums.push(this.selections[i].id);
        }
        var data={
          roleIds:id_nums
        }
        console.log(data)
        this.$http.post(url,data).then(res => {
          if(res.data.code==200){
            this.$message.success(res.data.message)
            this.GetRolesAll()
          }else{
            this.$message.error(res.data.message)
          }
        }).catch(err => {
            console.log(err)
          })
      }
    }
}
</script>

<style scoped>
.el-breadcrumb {
  margin-bottom: 15px;
  /* font-size: 12px; */
}
.el-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
}
.roles-table {
  margin-top: 15px;
}
.el-pagination {
  margin-top: 15px;
}
</style>
