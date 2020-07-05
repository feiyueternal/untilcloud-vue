<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'AdminIndex' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>内容管理</el-breadcrumb-item>
      <el-breadcrumb-item>课程管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="10">
          <el-input placeholder="请输入搜索内容" v-model="keywords" clearable @clear="GetClassAll" v-show="!isTeacher">
            <el-button slot="append" icon="el-icon-search" @click="SearchClass(keywords)"></el-button>
          </el-input>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="addClass">新增课程</el-button>
        </el-col>
        <el-col :span="3">
          <el-button type="danger" @click="DeletechosenClass">批量删除</el-button>
        </el-col>
        <el-col :span="3">
          <el-button type="success" icon="el-icon-refresh" @click="GetClassAll"></el-button>
        </el-col>
      </el-row>
      <div class="class-table">
        <class-manage-table
          @DeleteChosenClass="GetSelections"
          @classInfo-Edit="editOpen"
          @classInfo-Show="showOpen"
          ref="classmanageTable"
        ></class-manage-table>
      </div>
      <class-info-show-drawer ref="classinfoShowDrawer"></class-info-show-drawer>
      <class-info-edit-drawer @needfresh="Fresh" ref="classinfoEditDrawer"></class-info-edit-drawer>
    </el-card>
    <class-add-dialog ref="classaddDialog" @needfresh="Fresh"></class-add-dialog>
  </div>
</template>

<script>
import ClassManageTable from "./ClassManageTable";
import ClassAddDialog from "./ClassAddDialog";
import ClassInfoEditDrawer from './ClassInfoEditDrawer'
import ClassInfoShowDrawer from './ClassInfoShowDrawer'

export default {
  name: "Class",
  components: { ClassManageTable, ClassAddDialog,ClassInfoEditDrawer,ClassInfoShowDrawer },
  data() {
    return {
      keywords: "",
      selections: [],
      isTeacher:false
    };
  },
  methods: {
    addClass() {
      this.$refs.classaddDialog.open();
    },
    editOpen(row) {
      this.$refs.classinfoEditDrawer.open(row);
    },
    showOpen(row){
      this.$refs.classinfoShowDrawer.open(row);
    },
    GetClassAll() {
      this.$refs.classmanageTable.load();
    },
    SearchClass(keywords) {
      var url = "/index/class/course/search";
      if (keywords == "") {
        this.GetClassAll();
      } else {
        this.$http
          .get(url, {
            params: { keywords }
          })
          .then(res => {
            if (res.data.code == 200) {
              // console.log("keyword")
              // console.log(res.data)
              if (res.data.data == undefined || res.data.data.length <= 0) {
                return this.$message.error("该课程不存在");
              } else {
                this.$message.success("模糊查找成功");
                this.$refs.classmanageTable.load(res.data.data);
              }
            } else {
              this.$message.error(res.data.message);
            }
          })
          .catch(err => {
            // console.log(err);
          });
      }
    },
    GetSelections(val) {
      this.selections = val;
      // console.log(this.selections)
    },
    DeletechosenClass(val) {
      this.$confirm("是否确认删除选中的课程?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var id_nums = [];
          var url = "/index/class/course/delete";
          for (var i = 0; i < this.selections.length; i++) {
            id_nums.push(this.selections[i].id);
          }
          var data = {
            courseIds: id_nums
          };
          this.$http
            .post(url, data)
            .then(res => {
              if (res.data.code == 200) {
                this.$message.success("成功删除选中的课程");
                this.GetClassAll();
              } else {
                this.$message.error(res.data.message);
              }
            })
            .catch(err => {
              // console.log(err);
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
      this.$refs.classmanageTable.load();
    }
  },
  mounted(){
    var Teacher=window.localStorage.getItem("CLouduser_teacher")
      if(Teacher=="yes"){
        this.isTeacher=true
      }else{
        this.isTeacher=false
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
.class-table {
  margin-top: 15px;
}
.el-pagination {
  margin-top: 15px;
}
</style>
