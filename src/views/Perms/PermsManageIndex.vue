<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'AdminIndex' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统配置</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="10">
          <el-input placeholder="请输入搜索内容" v-model="keywords" clearable @clear="GetPermsAll">
            <el-button slot="append" icon="el-icon-search" @click="SearchPerms(keywords)"></el-button>
          </el-input>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="addPerms">新增权限</el-button>
        </el-col>
        <el-col :span="3">
          <el-button type="danger" @click="DeletechosenPerms">批量删除</el-button>
        </el-col>
        <el-col :span="3">
          <el-button type="success" icon="el-icon-refresh" @click="GetPermsAll"></el-button>
        </el-col>
      </el-row>
      <div class="perms-table">
        <perms-manage-table
          @DeleteChosenPerms="GetSelections"
          @permsInfo-Edit="editOpen"
          ref="permsmanageTable"
        ></perms-manage-table>
      </div>
      <perms-info-edit-drawer @needfresh="Fresh" ref="permsinfoEditDrawer"></perms-info-edit-drawer>
    </el-card>
    <perms-add-dialog ref="permsaddDialog" @needfresh="Fresh"></perms-add-dialog>
  </div>
</template>

<script>
import PermsManageTable from "./PermsManageTable";
import PermsAddDialog from "./PermsAddDialog";
import PermsInfoEditDrawer from './PermsInfoEditDrawer'


export default {
  name: "Perms",
  components: { PermsManageTable, PermsAddDialog,PermsInfoEditDrawer },
  data() {
    return {
      keywords: "",
      selections: []
    };
  },
  methods: {
    addPerms() {
      this.$refs.permsaddDialog.open();
    },
    editOpen(row) {
      this.$refs.permsinfoEditDrawer.open(row);
    },
    GetPermsAll() {
      this.$refs.permsmanageTable.load();
    },
    SearchPerms(keywords) {
      var url = "/index/admin/perm/search";
      if (keywords == "") {
        this.GetPermsAll();
      } else {
        this.$http
          .get(url, {
            params: { keywords }
          })
          .then(res => {
            if (res.data.code == 200) {
              if (res.data.data == undefined || res.data.data.length <= 0) {
                return this.$message.error("该权限不存在");
              } else {
                this.$message.success("模糊查找成功");
                this.$refs.permsmanageTable.load(res.data.data);
              }
            } else {
              this.$message.error(res.data.message);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    GetSelections(val) {
      this.selections = val;
      // console.log(this.selections)
    },
    DeletechosenPerms(val) {
      this.$confirm("是否确认删除选中的权限?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var id_nums = [];
          var url = "/index/admin/perm/delete";
          for (var i = 0; i < this.selections.length; i++) {
            id_nums.push(this.selections[i].id);
          }
          var data = {
            permIds: id_nums
          };
          this.$http
            .post(url, data)
            .then(res => {
              if (res.data.code == 200) {
                this.$message.success("成功删除选中的权限");
                this.GetPermsAll();
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
    Fresh() {
      this.$refs.permsmanageTable.load();
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
.perms-table {
  margin-top: 15px;
}
.el-pagination {
  margin-top: 15px;
}
</style>
