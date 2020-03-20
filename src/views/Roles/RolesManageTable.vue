<template>
  <div>
    <el-table ref="table" v-loading="loading"  border stripe style="width: 100%"
    :data="rolesdata.slice((pagenum-1)*pagesize,pagenum*pagesize)"
    >
      <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column align="center" fixed type="index" width="50" prop="id" label="Id"></el-table-column>
      <el-table-column align="center" fixed prop="name" label="角色名"></el-table-column>
      <el-table-column align="center" prop="enabled" label="状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.enabled"></el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="nameZh" fixed label="角色类型"></el-table-column>
      
      <!--     
    <el-table-column align="center"
                     prop="perm"
                     width="200"
                     >
      </el-table-column>-->
      <!-- <el-table-column align="center"
                     prop="menus"
                    >
      </el-table-column>-->
      <el-table-column label="操作" fixed="right" align="center" width="300">
        <template slot-scope="scope">
          <el-tooltip effect="dark" content="查看权限与菜单" placement="top" :enterable="false">
              <el-button type="info" icon="el-icon-info" size="mini" @click="Openshow(scope.row)"></el-button>
          </el-tooltip>

          <el-tooltip effect="dark" content="分配用户" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
          </el-tooltip>

          <el-tooltip effect="dark" content="编辑" placement="top" :enterable="false">
            <el-button size="mini" type="primary" icon="el-icon-edit"></el-button>
          </el-tooltip>
          
          <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
            <el-button size="mini" type="danger" icon="el-icon-delete"></el-button>
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
      total: 0
    };
  },
  methods: {
    load() {
      this.loading = true;
      var url = "/index/admin/role/all";
      setTimeout(() => {
      this.$http
        .get(url)
        .then(res => {
          if(res.data.code==200){
            this.rolesdata = res.data.data;
            this.total=res.data.data.length
            console.log(res.data.data);
          }else{
            console.log(res);
            this.$alert(res.data.message);
          }
          
        })
        .catch(err => {
          console.log(err);
        });
        this.loading = false;
         
        }, 1200);
       
    },

    Openshow (row) {
      this.$emit('rolesInfo-Show', row);
    },

    //每页查看页数变化
    handleSizeChange(val) {
      // console.log("size "+val)
      this.pagesize=val;
      this.load()
    },
    // 当前页码变化
    handleCurrentChange(val) {
      // console.log("num "+val)
      this.pagenum=val
      this.load()
    }
  },
  created() {
    this.load();
  }
};
</script>
<style scoped>
</style>
