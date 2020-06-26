<template>
  <div>
    <el-table
      ref="table"
      v-loading.fullscreen.lock="loading"
      element-loading-text="加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      border
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange"
      :data="classdata.slice((pagenum-1)*pagesize,pagenum*pagesize)"
    >
      <el-table-column align="center" type="selection" width="55" ></el-table-column>
      <el-table-column align="center" fixed width="95" 
      prop="id" label="课程编号" v-model="classdata.id"></el-table-column>
      <el-table-column align="center" width="120" fixed prop="name" label="课程名称"></el-table-column>
      <el-table-column align="center" prop="grade" label="年级">
      </el-table-column>
      <el-table-column align="center" width="110" prop="semester" fixed label="所属学期"></el-table-column>
      <el-table-column align="center" prop="teacher" fixed label="任课教师"></el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="260">
        <template slot-scope="scope">
          <el-tooltip effect="dark" content="详细信息" placement="top" :enterable="false">
            <el-button type="info" icon="el-icon-info" size="mini" 
            @click.native.prevent="Openshow(scope.row)"></el-button>
          </el-tooltip>

          <el-tooltip effect="dark" content="编辑课程" placement="top" :enterable="false">
            <el-button size="mini" type="primary" icon="el-icon-edit"
            @click.native.prevent="Openedit(scope.row)"></el-button>
          </el-tooltip>

          <el-tooltip effect="dark" content="删除课程" placement="top" :enterable="false">
            <el-button size="mini" type="danger" icon="el-icon-delete" 
            @click="DeleteClass(scope.row)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="pagenum"
      :page-sizes="[1, 2, 5, 10]"
      :page-size.sync="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "ClassManageTable",
  data() {
    return {
      classdata: [],
      loading: true,
      pagenum: 1,
      pagesize: 5,
      total: 0,
    };
  },
  methods: {
    load(tmpdata) {
      this.loading = true;
      var url = "/index/class/course/all";
      setTimeout(() => {
        if (tmpdata != undefined && tmpdata.length > 0) {
          this.classdata = tmpdata;
          this.loading = false;
          // console.log(this.classdata)
        } else {
          this.$http
            .get(url)
            .then(res => {
              if (res.data.code == 200) {
                this.classdata = res.data.data;
                // console.log(this.classdata)
                this.total = res.data.data.length;
                this.loading = false;
              } else {
                this.loading = false;
                this.$message.error(res.data.message);
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      }, 700);
    },

    Openshow(row) {
      this.$emit("classInfo-Show", row);
    },
    Openedit(row){
      this.$emit("classInfo-Edit",row)
    },

    //每页查看页数变化
    handleSizeChange(val) {
      this.pagesize = val;
      // this.load();
    },
    // 当前页码变化
    handleCurrentChange(val) {
      this.pagenum = val;
      // this.load();
    },
    DeleteClass(row){
      this.$confirm('是否确认删除该课程?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var url="/index/class/course/delete"
          var data={
            cid:row.id
          }
          this.$http.get(url,{params: data}).then(res => {
            if(res.data.code==200){
              this.$message.success("成功删除该课程")
              this.load()
            }else{
              this.$message.error(res.data.message)
            }
          }).catch(err => {
            console.log(err)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    handleSelectionChange(){
      this.$emit("DeleteChosenClass",this.$refs.table.selection)
    }
  },
  mounted() {
    this.load();
    // console.log(classdata)
  }
};
</script>
<style scoped>
</style>
