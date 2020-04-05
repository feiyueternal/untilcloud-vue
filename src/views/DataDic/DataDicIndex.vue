<template>
  <div>
    <!-- 面包屑导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'AdminIndex' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统配置</el-breadcrumb-item>
      <el-breadcrumb-item>数据字典</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框及旁边添加按钮 -->
    <el-card>
      <el-row :gutter="10">
        <el-col :span="7">
          <el-input placeholder="请输入内容" v-model="keywords">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="addDicType">添加字典类型</el-button>
        </el-col>
      </el-row>
      <!-- 表格显示 -->
      <div>
        <data-dic-manage-table
        ref="dataDicManageTable">

        </data-dic-manage-table>
      </div>
    </el-card>
    <dic-type-add-dialog ref="dicTypeAddDialog" @needfresh ="Fresh"></dic-type-add-dialog>
  </div>
</template>

<script>
import DataDicManageTable from "./DataDicManageTable"
import DicTypeAddDialog from "./DicTypeAddDialog"

export default {
  name: "DataDic",
  components: { DataDicManageTable,DicTypeAddDialog },
  data() {
    return {
      keywords: ""
    };
  },
  created() {
    // this.$refs.dataDicManageTable.getDicType();
  },
  methods: {
    addDicType() {
      this.$refs.dicTypeAddDialog.open()
    },
    Fresh() {
      this.$refs.dataDicManageTable.getDicType();
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
</style>