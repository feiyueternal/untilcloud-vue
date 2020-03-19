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
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="2">
            <el-button type="primary">搜索</el-button>
        </el-col>
        <el-col :span="2">
        <el-button type="success">新增</el-button>
        </el-col>
        <el-col :span="2">
        <el-button type="danger">一键删除</el-button>
        </el-col>
      </el-row>
    <div class="roles-table">
    <roles-manage-table
      ref="rolesmanageTable">
    </roles-manage-table>
    </div>
    
    </el-card>
  </div>
</template>

<script>
import RolesManageTable from './RolesManageTable'

export default {
    name:"Roles",
    components:{RolesManageTable},
    data(){
      return{
     
      }
    },
    methods: {

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
