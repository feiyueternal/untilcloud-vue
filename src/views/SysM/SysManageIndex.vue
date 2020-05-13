<template>
<div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'AdminIndex' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统配置</el-breadcrumb-item>
      <el-breadcrumb-item>学校机构</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="10">
          <el-input placeholder="请输入搜索内容" v-model="keywords" clearable @clear="GetSysAll">
            <el-button slot="append" icon="el-icon-search" @click="SearchSys(keywords)"></el-button>
          </el-input>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="addSys">新增机构</el-button>
        </el-col>
        <el-col :span="3">
          <el-button type="success" icon="el-icon-refresh" @click="GetSysAll"></el-button>
        </el-col>
      </el-row>
      <div class="sys-table">
        <sys-manage-table
          @sysInfo-Edit="editOpen"
          ref="sysmanageTable"
        ></sys-manage-table>
      </div>
      <sys-info-edit-drawer @needfresh="Fresh" ref="sysinfoEditDrawer"></sys-info-edit-drawer>
    </el-card>
    <sys-add-dialog ref="sysaddDialog" @needfresh="Fresh"></sys-add-dialog>
  </div>
</template>

<script>
import SysManageTable from "./SysManageTable";
import SysAddDialog from "./SysAddDialog";
import SysInfoEditDrawer from './SysInfoEditDrawer'


export default {
  name: "Sys",
  components: { SysManageTable,SysInfoEditDrawer,SysAddDialog},
  data() {
    return {
      keywords: "",
      selections: []
    };
  },
  methods: {
    addSys() {
      this.$refs.sysaddDialog.open();
    },
    editOpen(row) {
      this.$refs.sysinfoEditDrawer.open(row);
    },
    GetSysAll() {
      this.$refs.sysmanageTable.load();
    },
    SearchSys(keywords) {
      var url = "/index/sys/school/search";
      if (keywords == "") {
        this.GetSysAll();
      } else {
        this.$http
          .get(url, {
            params: { keywords }
          })
          .then(res => {
            if (res.data.code == 200) {
              console.log("keyword")
              console.log(res.data)
              if (res.data.data == undefined || res.data.data.length <= 0) {
                return this.$message.error("该机构不存在");
              } else {
                this.$message.success("模糊查找成功");
                this.$refs.sysmanageTable.load(res.data.data);
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
    //暂无批量删除
    // DeletechosenSys(val) {
    //   this.$confirm("是否确认删除选中的机构?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   })
    //     .then(() => {
    //       var id_nums = [];
    //       var url = "/index/sys/school/delete";
    //     //   for (var i = 0; i < this.selections.length; i++) {
    //     //     id_nums.push(this.selections[i].id);
    //     //   }
        
    //       var data = {
    //         siid: this.selections.id
    //       };
    //       console.log(data)
    //       this.$http
    //         .get(url,  { params: data })
    //         .then(res => {
    //           if (res.data.code == 200) {
    //             this.$message.success("成功删除选中的机构");
    //             this.GetSysAll();
    //           } else {
    //             this.$message.error(res.data.message);
    //           }
    //         })
    //         .catch(err => {
    //           console.log(err);
    //         });
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         message: "已取消删除"
    //       });
    //     });
    // },
    Fresh() {
      this.$refs.sysmanageTable.load();
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
.sys-table {
  margin-top: 15px;
}
.el-pagination {
  margin-top: 15px;
}
</style>
