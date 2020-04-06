<template>
  <div>
    <el-table
      :data="dicType.slice((dicListInfo.pagenum-1)*dicListInfo.pagesize,dicListInfo.pagenum*dicListInfo.pagesize)"
      style="width: 100%"
      border
      stripe
      ref="Table"
      v-loading.fullscreen.lock="loading"
      element-loading-text="加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <!-- 嵌套表格 -->
      <el-table-column type="expand" prop="detail" align="center">
        <template slot-scope="scope">
          <!-- <div>{{scope.row.detail[0]}}</div> -->
          <el-table :data="scope.row.detail[0]" style="width: 100%" border stripe ref="subTable">
            <!-- <el-table-column type="index" align="center"></el-table-column> -->
            <!-- <el-table-column prop="id" label="id" align="center"></el-table-column> -->
            <el-table-column prop="sort" label="排序" align="center"></el-table-column>
            <el-table-column prop="name" label="描述" align="center"></el-table-column>
            <el-table-column prop="value" label="值" align="center"></el-table-column>
            <el-table-column prop="status" label="状态" align="center">
              <template slot-scope="scope">
                <el-switch v-model="scope.row.status" @change="detailStateChange(scope.row)"></el-switch>
              </template>
            </el-table-column>
            <el-table-column prop="updateTime" label="更新时间" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  @click="editDicDetail(scope.row)"
                ></el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click="removeDicDetail(scope.row)"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <!-- 主表格 -->
      <el-table-column type="index" align="center"></el-table-column>
      <!-- <el-table-column prop="id" label="id" align="center"></el-table-column> -->
      <el-table-column prop="code" label="编码" align="center"></el-table-column>
      <el-table-column prop="status" label="状态" align="center">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status" @change="dicStateChange(scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="描述" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="editDicTypeInfo(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="removeDicTypeById(scope.row.id)"
          ></el-button>
          <el-tooltip effect="dark" content="增加明细" placement="top" :enterable="false">
            <el-button
              type="warning"
              icon="el-icon-plus"
              size="mini"
              @click="addDicInfo(scope.row.id)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="dicListInfo.pagenum"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="dicListInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="dicListInfo.total"
    ></el-pagination>
    <dic-detail-add-dialog ref="dicDetailAddDialog" @needfresh="Fresh"></dic-detail-add-dialog>
    <edit-type ref="dicTypeEditDialog" @needfresh="Fresh"></edit-type>
    <edit-detail ref="dicDetailEditDialog" @needfresh="Fresh"></edit-detail>
  </div>
</template>

<script>
import DicDetailAddDialog from "./DicDetailAddDialog";
import EditType from "./EditType";
import EditDetail from "./EditDetail";
export default {
  name: "DataDicManageTable",
  components: { DicDetailAddDialog, EditType, EditDetail },
  data() {
    return {
      loading: true,
      dicType: [],
      dicListInfo: {
        pagenum: 1,
        pagesize: 5,
        tatal: 0
      }
    };
  },
  created() {
    this.getDicType();
  },
  mounted() {
    // this.getDicType();
  },
  methods: {
    //   获取字典类型
    getDicType() {
      this.loading = true;
      setTimeout(() => {
        this.$http
        .get("/index/sys/dic/type/all")
        .then(res => {
          this.dicType = [];
          //   console.log(res.data.data);
          for (var i = 0; i < res.data.data.length; i++) {
            this.dicType.push(res.data.data[i]);
            this.dicType[i]["detail"] = [];
            this.getDicInfoAll(i);
          }
          this.dicListInfo.total = res.data.data.length;
          console.log(this.dicType);
          this.loading = false;
          //   console.log(this.dicTypeInfo);
        })
        .catch(err => {
          console.log(err);
        });
      }, 300)
      
    },
    // 获取字典明细
    getDicInfoAll(index) {
      var id = this.dicType[index].id;
      // console.log(id);

      this.$http
        .get("/index/sys/dic/info/all", { params: { dicTypeId: id } })
        .then(res => {
          // console.log(res.data.data);
          // console.log(this.dicType[index].detail)
          // this.dicType[index].detail = [];
          this.dicType[index].detail.push(res.data.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 修改字典类型状态
    dicStateChange(dicInfo) {
      console.log(dicInfo);
      // dicInfo.status = !dicInfo.status;
      this.$http
        .put("/index/sys/dic/type/status", {
          id: dicInfo.id,
          status: dicInfo.status
        })
        .then(res => {
          console.log(res);
          if (res.data.code !== 200) {
            dicInfo.status = !dicInfo.status;
            return this.$message.error(res.data.message);
          }
          this.$message.success("更新字典类型状态成功");
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 修改字典明细状态
    detailStateChange(detailInfo) {
      console.log(detailInfo);
      this.$http
        .put("/index/sys/dic/info/status", {
          id: detailInfo.id,
          status: detailInfo.status
        })
        .then(res => {
          console.log(res);
          if (res.data.code !== 200) {
            detailInfo.status = !detailInfo.status;
            return this.$message.error(res.data.data);
          }
          this.$message.success("更新该字典明细状态成功");
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 分页效果
    handleSizeChange(newSize) {
      this.dicListInfo.pagesize = newSize;
    },
    handleCurrentChange(newPage) {
      this.dicListInfo.pagenum = newPage;
    },
    // 打开增加类型明细的对话框
    addDicInfo(id) {
      this.$store.commit("getDicTypeId", id);
      this.$refs.dicDetailAddDialog.open();
      console.log(id);
    },
    //打开修改类型对话框
    editDicTypeInfo(info) {
      this.$store.commit("getDicTypeInfo", info);
      this.$refs.dicTypeEditDialog.open();
      console.log(info);
    },
    // 打开修改明细对话框
    editDicDetail(info) {
      this.$store.commit("getDicDetail", info);
      this.$refs.dicDetailEditDialog.open();
      console.log(info);
    },
    //删除字典类型
    removeDicTypeById(id) {
      console.log(id);
      this.$confirm("此操作将永久删除该类型, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .get("/index/sys/dic/type/delete", { params: { dicTypeId: id } })
            .then(res => {
              if (res.data.code == 200) {
                this.$message.success("成功删除该类型");
                this.getDicType();
              } else {
                this.$message.error(res.data.message);
                this.getDicType;
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
    //删除字典明细
    removeDicDetail(info) {
      console.log(info);
      this.$confirm("此操作将永久删除该明细, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .get("/index/sys/dic/info/delete", {
              params: { dicInfoId: info.id }
            })
            .then(res => {
              if (res.data.code == 200) {
                this.$message.success("成功删除该明细");
                this.getDicType();
              } else {
                this.$message.error(res.data.message);
                this.getDicType;
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
    // 更新列表
    Fresh() {
      this.getDicType();
    }
  }
};
</script>

<style scoped>
.el-table {
  margin-top: 15px;
}
</style>