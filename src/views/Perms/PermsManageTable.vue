<template>
  <div>
    <el-table
      ref="table"
      v-loading="loading"
      border
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange"
      :data="permsdata.slice((pagenum-1)*pagesize,pagenum*pagesize)"
    >
      <el-table-column align="center" type="selection" width="55" ></el-table-column>
      <el-table-column align="center" fixed width="70" 
      prop="id" label="权限id" v-model="permsdata.id"></el-table-column>
      <el-table-column align="center" fixed prop="name" width="200" label="权限代码"></el-table-column>
 
      <el-table-column align="center" prop="desc_" fixed label="权限描述"></el-table-column>
       <el-table-column align="center" prop="url" fixed label="权限路径"></el-table-column>
       
        <!-- <el-table-column align="center" prop="parentId" fixed label="权限他爸"></el-table-column> -->
      <el-table-column label="操作" fixed="right" align="center" width="200">
        <template slot-scope="scope">
          <!-- <el-tooltip effect="dark" content="查看子权限" placement="top" :enterable="false">
            <el-button type="info" icon="el-icon-info" size="mini" 
            @click.native.prevent="Openshow(scope.row)"></el-button> -->
          <!-- </el-tooltip> -->

          <el-tooltip effect="dark" content="编辑权限" placement="top" :enterable="false">
            <el-button size="mini" type="primary" icon="el-icon-edit"
            @click.native.prevent="Openedit(scope.row)"></el-button>
          </el-tooltip>

          <el-tooltip effect="dark" content="删除权限" placement="top" :enterable="false">
            <el-button size="mini" type="danger" icon="el-icon-delete" 
            @click="DeletePerm(scope.row)"></el-button>
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
  name: "PermsManageTable",
  data() {
    return {
      permsdata: [],
      loading: true,
      pagenum: 1,
      pagesize: 5,
      total: 0,
    };
  },
  methods: {
    load(tmpdata) {
      this.loading = true;
      var url = "/index/admin/perm/all";
      setTimeout(() => {
        if (tmpdata != undefined && tmpdata.length > 0) {
          this.permsdata = tmpdata;
        } else {
          this.$http
            .get(url)
            .then(res => {
              if (res.data.code == 200) {
                this.permsdata = res.data.data;
                this.total = res.data.data.length;
                // console.log(res.data.data);
              } else {
                // console.log(res);
                this.$message.error(res.data.message);
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
        this.loading = false;
      }, 1000);
    },
    Openedit(row){
      this.$emit("permsInfo-Edit",row)
    },

    //每页查看页数变化
    handleSizeChange(val) {
      this.pagesize = val;
      this.load();
    },
    // 当前页码变化
    handleCurrentChange(val) {
      this.pagenum = val;
      this.load();
    },
    
    DeletePerm(row){
      this.$confirm('是否确认删除此权限?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var url="/index/admin/perm/delete"
          var data={
            rid:row.id
          }
          this.$http.get(url,{params: data}).then(res => {
            if(res.data.code==200){
              this.$message.success("成功删除此权限")
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
      this.$emit("DeleteChosenPerms",this.$refs.table.selection)
    }
  },
  mounted() {
    this.load();
  }
};
</script>
<style scoped>
</style>
