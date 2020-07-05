<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'AdminIndex' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>参数配置</el-breadcrumb-item>
      <el-breadcrumb-item>系统参数</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="10">
          <el-input placeholder="请输入内容" v-model="keywords" clearable @clear="getSysParaList" v-show="!isTeacher">
            <el-button slot="append" icon="el-icon-search" @click="searchSysPara(keywords)"></el-button>
          </el-input>
        </el-col>
        <el-col :span="3">
          <el-button type="success" icon="el-icon-refresh" @click="Fresh"></el-button>
        </el-col>
      </el-row>
      <el-table
        :data="sysParaList.slice((sysParaListInfo.pagenum-1)*sysParaListInfo.pagesize,sysParaListInfo.pagenum*sysParaListInfo.pagesize)"
        style="width: 100%"
        border
        stripe
        ref="table"
        v-loading.fullscreen.lock="loading"
        element-loading-text="加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <!-- <el-table-column type="index" label="序号" width="55" align="center"></el-table-column> -->
        <el-table-column prop="userId" label="用户ID" width="100" align="center"></el-table-column>

        <el-table-column prop="userUsername" label="用户名" width="100" align="center"></el-table-column>
        <el-table-column prop="userName" label="真实姓名" width="120" align="center"></el-table-column>
        <el-table-column prop="rolesZh" label="角色类型" align="center"></el-table-column>
        <el-table-column prop="value2" label="签到允许距离(m)" align="center"></el-table-column>
        <el-table-column prop="value1" label="每次签到经验" align="center"></el-table-column>
        <el-table-column prop="value3" label="一节课时间(min)" align="center"></el-table-column>
        <el-table-column prop="updateTime" label="更新时间" align="center"></el-table-column>
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="sysParaListInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="sysParaListInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="sysParaListInfo.total"
      ></el-pagination>
    </el-card>
    <el-dialog
      title="修改系统参数"
      :visible.sync="editDialogVisible"
      width="50%"
      :append-to-body="true"
      @close="editDialogClosed"
    >
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="130px">
        <el-form-item label="id">
          <el-input v-model.number="editForm.id" type="number" disabled></el-input>
        </el-form-item>
        <el-form-item label="签到允许距离(m)" prop="value2">
          <el-input v-model.number="editForm.value2" type="number"></el-input>
        </el-form-item>
        <el-form-item label="每次签到经验" prop="value1">
          <el-input v-model.number="editForm.value1" type="number"></el-input>
        </el-form-item>
        <el-form-item label="一节课时间(min)" prop="value3">
          <el-input v-model.number="editForm.value3" type="number"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo(editForm)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      editDialogVisible: false,
      // roles: [],
      // rolesData: [],
      sysParaList: [],
      sysParaListInfo: {
        pagenum: 1,
        pagesize: 5,
        total: 0
      },
      keywords: "",
      editForm: {
        id: 0,
        value1: 0,
        value2: 0,
        value3: 0
      },
      editFormRules: {
        value2: [
          {
            required: true,
            message: "签到允许距离(m)不能为空",
            trigger: "blur"
          },
          {
            type: "number",
            message: "签到允许距离(m)必须为数字值",
            trigger: "blur"
          }
        ],
        value1: [
          { required: true, message: "每次签到经验不能为空", trigger: "blur" },
          {
            type: "number",
            message: "每次签到经验必须为数字值",
            trigger: "blur"
          }
        ],
        value3: [
          {
            required: true,
            message: "一节课时间(min)不能为空",
            trigger: "blur"
          },
          {
            type: "number",
            message: "一节课时间(min)必须为数字值",
            trigger: "blur"
          }
        ],
        isTeacher:false
      }
    };
  },
  created() {
    this.getSysParaList();
  },
  methods: {
    getSysParaList() {
      this.loading = true;
      this.sysParaList = [];
     var Teacher=window.localStorage.getItem("CLouduser_teacher")
      if(Teacher=="yes"){
        var url="/index/sys/param/get"
        this.isTeacher=true
      }else{
        var url = "/index/sys/param/all";
        this.isTeacher=false
      }
      this.$http
        .get(url)
        .then(res => {
          // console.log(res.data);
          if (res.data.code == 200) {
            for (var i = 0; i < res.data.data.length; i++) {
              this.sysParaList.push(res.data.data[i]);
              this.sysParaList[i]["rolesZh"] = "";
              if (this.sysParaList[i].user.roles.length == 0) {
                this.sysParaList[i]["rolesZh"] == "";
              } else {
                for (
                  var j = 0;
                  j < this.sysParaList[i].user.roles.length;
                  j++
                ) {
                  this.sysParaList[i].rolesZh +=
                    this.sysParaList[i].user.roles[j].nameZh + " ";
                }
              }
            }
            this.sysParaListInfo.total = res.data.data.length;
            this.loading = false;
            // console.log(this.sysParaList);
          } else {
            this.loading = false;
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          // console.log(err);
        });
    },
    Fresh() {
      this.getSysParaList();
    },
    searchSysPara(keywords) {
       this.$http
        .get("/index/sys/param/search", { params: { keywords } })
        .then(res => {
          // console.log(res.data.data);
          if (keywords == "") {
            this.getSysParaList();
          } else {
            if (res.data.data.length == 0) {
              return this.$message.error(res.data.message);
            }
            this.sysParaList = [];
            // console.log(this.userList);
            for (var i = 0; i < res.data.data.length; i++) {
              this.sysParaList.push(res.data.data[i]);
            }
            this.sysParaListInfo.total = res.data.data.length;
            // console.log(this.userList);
          }
        })
        .catch(err => {
          // console.log(err);
        });
    },
    handleSizeChange(newSize) {
      this.sysParaListInfo.pagesize = newSize;
      // this.getUserList();
      // console.log(this.sysParaListInfo.pagesize);
    },
    handleCurrentChange(newPage) {
      // console.log(newPage);
      this.sysParaListInfo.pagenum = newPage;
    },
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },
    showEditDialog(info) {
      this.editForm.id = Number(info.id);
      this.editForm.value2 = Number(info.value2);
      this.editForm.value1 = Number(info.value1);
      this.editForm.value3 = Number(info.value3);
      this.editDialogVisible = true;
    },
    editUserInfo(editForm) {
      this.$refs.editFormRef.validate(valid => {
        // console.log(valid);
        if (!valid) return;
        this.$http
          .put("/index/sys/param/edit", {
            id: editForm.id,
            value1: editForm.value1,
            value2: editForm.value2,
            value3: editForm.value3
          })
          .then(res => {
            // console.log(res);
            if (res.data.code == 200) {
              this.$message.success("修改系统参数信息成功");
              this.editDialogVisible = false;
              this.getSysParaList();
            } else {
              this.$message.error(res.data.message);
              this.editDialogVisible = false;
            }
          })
          .catch(err => {
            // console.log(err);
          });
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