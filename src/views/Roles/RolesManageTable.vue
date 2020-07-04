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
      :data="rolesdata.slice((pagenum-1)*pagesize,pagenum*pagesize)"
    >
      <el-table-column align="center" type="selection" width="55" ></el-table-column>
      <el-table-column align="center" fixed width="70" 
      prop="id" label="角色id" v-model="rolesdata.id"></el-table-column>
      <!-- <el-table-column align="center" fixed width="70" type="index" label="序号"></el-table-column> -->
      <el-table-column align="center" fixed prop="name" label="角色名"></el-table-column>
      <el-table-column align="center" prop="enabled" label="状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.enabled" @change="RolesChangeState(scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="nameZh" fixed label="角色描述"></el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="300">
        <template slot-scope="scope">
          <el-tooltip effect="dark" content="查看权限与菜单" placement="top" :enterable="false">
            <el-button type="info" icon="el-icon-info" size="mini" 
            @click.native.prevent="Openshow(scope.row)"></el-button>
          </el-tooltip>

          <el-tooltip effect="dark" content="分配用户" placement="top" :enterable="false">
            <el-button type="warning" icon="el-icon-setting" size="mini"
            @click.native.prevent="Openallot(scope.row)"></el-button>
          </el-tooltip>

          <el-tooltip effect="dark" content="编辑角色" placement="top" :enterable="false">
            <el-button size="mini" type="primary" icon="el-icon-edit"
            @click.native.prevent="Openedit(scope.row)"></el-button>
          </el-tooltip>

          <el-tooltip effect="dark" content="删除角色" placement="top" :enterable="false">
            <el-button size="mini" type="danger" icon="el-icon-delete" 
            @click="DeleteRole(scope.row)"></el-button>
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
  name: "RolesManageTable",
  data() {
    return {
      rolesdata: [],
      loading: true,
      pagenum: 1,
      pagesize: 5,
      total: 0,
    };
  },
  methods: {
    load(tmpdata) {
      this.loading = true;
      var url = "/index/admin/role/all";
      setTimeout(() => {
        if (tmpdata != undefined && tmpdata.length > 0) {
          this.rolesdata = tmpdata;
          this.loading = false;
          console.log(this.rolesdata)
        } else {
          this.$http
            .get(url)
            .then(res => {
              if (res.data.code == 200) {
                console.log(res.data.data)
                this.rolesdata = res.data.data;
                this.total = res.data.data.length;
                this.loading = false;
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

    Openshow(row) {
      this.$emit("rolesInfo-Show", row);
    },
    Openedit(row){
      this.$emit("rolesInfo-Edit",row)
    },
    Openallot(row){
      this.$emit("roles-Allot",row)
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
    RolesChangeState(row) {
      var url = "/index/admin/role/status";
      var data = {
        id: row.id,
        enabled: row.enabled
      };
      this.$http
        .put(url, data)
        .then(res => {
          if (res.data.code == 200) {
            // this.$message.success(res.data.message);
            this.$message.success("更新角色状态成功");
            this.load()
          } else {
            row.enabled=!row.enabled
            // this.$message.error(res.data.message);
            this.$message.error("更新角色状态失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    DeleteRole(row){
      this.$confirm('是否确认删除该用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var url="/index/admin/role/delete"
          var data={
            rid:row.id
          }
          this.$http.get(url,{params: data}).then(res => {
            if(res.data.code==200){
              this.$message.success("成功删除该用户")
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
      this.$emit("DeleteChosenRoles",this.$refs.table.selection)
    }
  },
  mounted() {
    this.load();
    // console.log(rolesdata)
  }
};
</script>
<style scoped>
</style>
