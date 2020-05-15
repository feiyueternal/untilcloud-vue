<template>
  <div>
    <el-table
      ref="table"
      v-loading.fullscreen.lock="loading"
      element-loading-text="加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      border
      :row-key="GetRowId"
      stripe
      :indent="indent"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      @select-all="ChangeAll"
      :default-sort = "{prop: 'sort', order: 'ascending'}"
      :data="sysdata.slice((pagenum-1)*pagesize,pagenum*pagesize)"
    >
      <el-table-column align="center" type="selection" width="55" ></el-table-column>
      <el-table-column align="center" fixed width="130" 
      prop="id" label="机构id" v-model="sysdata.id"></el-table-column>
      <el-table-column align="center" prop="name" width="270" fixed label="机构名称"></el-table-column>
      <el-table-column align="center"  prop="sort" fixed width="85" label="顺序"></el-table-column>
      <el-table-column align="center" prop="updateTime" label="更新时间"></el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="200">
        <template slot-scope="scope">
          <el-tooltip effect="dark" content="编辑机构" placement="top" :enterable="false">
            <el-button size="mini" type="primary" icon="el-icon-edit"
            @click.native.prevent="Openedit(scope.row)"></el-button>
          </el-tooltip>

          <el-tooltip effect="dark" content="删除机构" placement="top" :enterable="false">
            <el-button size="mini" type="danger" icon="el-icon-delete" 
            @click="DeleteSys(scope.row)"></el-button>
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
  name: "SysManageTable",
  data() {
    return {
      sysdata: [],
      loading: true,
      pagenum: 1,
      pagesize: 5,
      total: 0,
      indent:16,
      multipleSelection:[],
    };
  },
  methods: {
    load(tmpdata) {
      this.loading = true;
      var url = "/index/sys/school/all";
      setTimeout(() => {
        if (tmpdata != undefined && tmpdata.length > 0) {
          this.sysdata = tmpdata;
          this.loading = false;
        } else {
          this.$http
            .get(url)
            .then(res => {
              if (res.data.code == 200) {
                this.sysdata = res.data.data;
                this.total = res.data.data.length;
                this.loading = false;
                console.log("sys")
                console.log(res.data.data);
              } else {
                console.log(res);
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
    Openedit(row){
      this.$emit("sysInfo-Edit",row)
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
    GetRowId(row){
      return row.id
    },
    
    DeleteSys(row){
      this.$confirm('是否确认删除此机构?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var url="/index/sys/school/delete"
          var data={
            siid:row.id
          }
          // console.log("删除机构")
          // console.log(data)
          this.$http.get(url,{params: data}).then(res => {
            // console.log(res)
            if(res.data.code==200){
              this.$message.success("成功删除此机构")
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
    handleSelectionChange(val){
    //   this.multipleSelection=val
      console.log(this.$refs.table.selection)
    //   this.$emit("DeleteChosenMenus",this.$refs.table.selection)
    },
    // Change(val){
    //   var emmm=this.$refs.table.selection
    //   var tmp=[]
    //   var flag=false
    //   tmp=this.$refs.table.selection
    //   console.log(tmp)
    //   this.$nextTick(() =>{
    //     tmp.forEach(tt => {
    //     if(tt.children.length!=0){
    //       tt.children.forEach(child => {
    //         for(var i=0;i<emmm.length;i++){
    //           if(emmm[i].id==child.id){
    //             console.log(emmm[i])
    //             console.log(child)
    //             flag=true
    //             break
    //           }
    //         }
    //         if(!flag){
    //           this.$refs.table.toggleRowSelection(child)
    //         }
            
    //       })
    //     }
    //   }) 
    // })
    // },
    ChangeAll(val){
    this.$refs.table.clearSelection()
    },
  },
  mounted() {
    this.load();
  }
};
</script>
<style scoped>
</style>
