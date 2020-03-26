<template>
    <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统配置</el-breadcrumb-item>
      <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="10">
          <el-input placeholder="请输入内容" v-model="keywords" clearable @clear="GetRolesAll">
            <el-button slot="append" icon="el-icon-search" @click="SearchRoles(keywords)"></el-button>
          </el-input>
        </el-col>
        <el-col :span="3">
        <el-button type="primary" @click="addRoles">新增菜单</el-button>
        </el-col>
        <el-col :span="3">
        <el-button type="danger" @click="DeletechosenMenus">批量删除</el-button>
        </el-col>
        <el-col :span="3">
        <el-button type="success" icon="el-icon-refresh" @click="GetMenusAll"></el-button>
        </el-col>
      </el-row>
    <div class="menus-table">
    <menus-manage-table
      @DeleteChosenMenus="GetSelections"
      @menusInfo-Edit="editOpen"
      ref="menusmanageTable">
    </menus-manage-table>
    </div>
    <!-- <roles-info-show-drawer ref="rolesinfoShowDrawer"></roles-info-show-drawer>
    <roles-info-edit-drawer @needfresh="Fresh" ref="rolesinfoEditDrawer"></roles-info-edit-drawer> -->
    </el-card>
    <!-- <roles-add-dialog
      ref="rolesaddDialog"
      @needfresh="Fresh"
    ></roles-add-dialog>
    <roles-allot-dialog
      ref="rolesallotDialog"
    ></roles-allot-dialog> -->
  </div>
</template>

<script>
import MenusManageTable from './MenusManageTable'
// import RolesInfoShowDrawer from './RolesInfoShowDrawer'
// import RolesAddDialog from './RolesAddDialog'
// import RolesInfoEditDrawer from './RolesInfoEditDrawer'
// import RolesAllotDialog from './RolesAllotDailog'

export default {
    name:"Menus",
    components:{MenusManageTable},
    data(){
      return{
        keywords:"",
        selections:[]
      }
    },
    methods: {
      addRoles(){
        this.$refs.rolesaddDialog.open()
      },
      showOpen (row) {
        this.$refs.rolesinfoShowDrawer.open(row);
      },
      editOpen(row){
        this.$refs.rolesinfoEditDrawer.open(row)
      },
      GetMenusAll(){
        this.$refs.rolesmanageTable.load()
      },
      SearchRoles(keywords){
        var url="/index/admin/menu/search";
        if(keywords==""){
          this.GetMenusAll()
        }else{
          this.$http.get(url,{
            params:{keywords}
          }).then(res => {
            if(res.data.code==200){
              if(res.data.data==undefined||res.data.data.length<=0){
                return this.$message.error("该菜单不存在");
              }else{
                this.$message.success("模糊查找成功")
                this.$refs.menusmanageTable.load(res.data.data)
              }
            }else{
              this.$message.error(res.data.message)
            }
          }).catch(err => {
            console.log(err)
          })
        }
      },
      GetSelections(val){
        this.selections=val
        // console.log(this.selections)
      },
      DeletechosenMenus(val){

        this.$confirm('是否确认删除选中的菜单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var id_nums=[]
          var url="/index/admin/menu/delete"
          for (var i = 0; i < this.selections.length; i++) {
            id_nums.push(this.selections[i].id);
          }
          var data={
            menuIds:id_nums
          }
          this.$http.post(url,data).then(res => {
            if(res.data.code==200){
              this.$message.success("成功删除选中的菜单")
              this.GetMenusAll()
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
      Fresh(){
        this.$refs.menusmanageTable.load()
      }
    }
}
</script>

<style scoped>
.el-breadcrumb {
  margin-bottom: 15px;
  /* font-size: 12px; */
}
.el-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
}
.menus-table {
  margin-top: 15px;
}
.el-pagination {
  margin-top: 15px;
}
</style>
