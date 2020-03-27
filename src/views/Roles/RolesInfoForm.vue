<template>
  <el-form
    size="small"
    :model="data"
    ref="rolesForm"
    :rules="rules"
    label-position="right"
    label-width="120px"
    v-loading="loading"
    :disabled="!editable"
    class="scroll_form"
  >
    <el-form-item
      label="Id">
      <el-row>
        <el-col :span="12"> 
          <el-input
          size="small"
          readonly
          autocomplete="off"
          v-model="data.id"
        ></el-input>
        </el-col>
      </el-row>
    </el-form-item>

    <el-form-item
      prop="name"
      label="角色名"
      >
      <el-row>
        <el-col :span="12"> 
      <el-input
          v-model="data.name"
        ></el-input>
        </el-col>
      </el-row>
    
    </el-form-item>

    <el-form-item
      prop="nameZh"
      label="角色描述">
      <el-row>
        <el-col :span="12"> 
      <el-input
          v-model="data.nameZh"
        ></el-input>
        </el-col>
      </el-row>
    
    </el-form-item>
    
<!-- 显示状态 -->
    <el-form-item    
      prop="perms"
      label="角色权限"
      v-if="!editable"
      >
      <el-tree
      class="scroll_y"
        :data="data.perms"
        node-key="id"
        :props="permsprops"
        >
      </el-tree> 
    </el-form-item>

<!-- 编辑状态 -->
    <el-form-item
      prop="perms"
      label="角色权限"
      v-if="editable"
    >
      <el-tree
        class="scroll_y"
        ref="permstree"
        :data="perms"
        node-key="id"
        show-checkbox
        :default-expand-all="false"
        :props="permsprops"
        :default-checked-keys="selectedPermIds"
        >
      </el-tree> 
    </el-form-item>

<!-- 显示状态 -->
    <el-form-item
   
      prop="menus"
      label="菜单显示"
      v-if="!editable"
      >
      <el-tree
          class="scroll_y"
          :data="data.menus"
          node-key="id"
          :props="menusprops"
      >
      </el-tree> 
    </el-form-item> 

<!-- 编辑状态 -->
    <el-form-item

      prop="menus"
      label="菜单显示"
      v-if="editable"
      >
      <el-tree
          ref="menustree"
          class="scroll_y"
          :data="menus"
          node-key="id"
          show-checkbox
          :default-expand-all="false"
          :default-checked-keys="selectedMenuIds"
          :props="menusprops"
          >
      </el-tree> 
    </el-form-item> 
    
  </el-form>
</template>

<script>
export default {
  name: "RolesInfoForm",
  props: {
    data: {
        type: Object,
        default: function () {
          return {}
        }
      },
    loading: {
      type: Boolean,
      default: false
    },
    editable:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      rules: {
        name: [
          { required: true, message: "角色名不能为空", trigger: "blur" }
        ],
        nameZh: [
          { required: true, message: "角色类型不能为空", trigger: "blur" }
        ]
      },
      permsprops: {
          label: 'desc_',
          isLeaf: 'leaf'
      },
      menusprops:{
        label:'nameZh',
        isLeaf:'leaf',
        icon:'iconCls'
      },
      perms:[],
      menus:[],
      selectedPermIds:[],
      selectedMenuIds:[]
    };
  },
  methods: {
    resetFields() {
      this.$refs.rolesForm.resetFields();
    },
    validate() {
      return new Promise((resolve, reject) => {
        this.$refs.rolesForm.validate(valid => {
          if (valid) {
            resolve();
          }
        });
      });
    },
    selectedPerms(){
      let permsId=[]
      for(var i =0;i<this.data.perms.length;i++){
        permsId.push(this.data.perms[i].id)
        for (var j = 0; j < this.data.perms[i].children.length; j++) {
          permsId.push(this.data.perms[i].children[j].id)
        }
      }
      this.selectedPermIds=permsId
      if (this.$refs.permstree) {
        this.$refs.permstree.setCheckedKeys(permsId)
      }
    },
    GetAllperms(){
      var url="/index/admin/role/perm"
      this.$http.get(url).then(res => {
        if(res.data.code==200){
          this.perms=res.data.data
          this.selectedPerms()
        }else{
          this.$message.error("获取权限失败")
        }
      }).catch(err => {
        console.log(err)
      })
    },
    selectedMenus(){
      let menusId=[]
      for(var i =0;i<this.data.menus.length;i++){
        menusId.push(this.data.menus[i].id)
        for (var j = 0; j < this.data.menus[i].children.length; j++) {
          menusId.push(this.data.menus[i].children[j].id)
        }
      }
      this.selectedMenuIds=menusId
      if (this.$refs.menustree) {
        this.$refs.menustree.setCheckedKeys(menusId)
      }
    },
    GetAllmenus(){
      var url="/index/admin/role/menu"
      this.$http.get(url).then(res => {
        if(res.data.code==200){
          this.menus=res.data.data
          this.selectedMenus()
        }else{
          this.$message.error("获取菜单失败")
        }
      }).catch(err => {
        console.log(err)
      })
    },
    submit(){
      this.$refs.rolesForm.validate(valid => {
        if(valid){
          var url="/index/admin/role/edit"
          var edit_data={
            id:this.data.id,
            name:this.data.name,
            nameZh:this.data.nameZh,
            menus:this.$refs.menustree.getCheckedNodes(),
            perms:this.$refs.permstree.getCheckedNodes()
          }
          this.$http.put(url,edit_data).then(res => {
            if(res.data.code==200){
              this.$message.success("编辑角色成功")
              this.$emit("success-edit",true)
            }else{
              this.$message.error("编辑角色失败")
            }
          }).catch(err => {
            console.log(err)
        })
        }else{
          this.$message.error("请按要求填写信息")
        }
      })
    }
  },
  mounted(){
    this.GetAllmenus()
    this.GetAllperms()
  }
};
</script>
<style scoped>
.el-input__inner {
  width:50px;
  text-align: left;
} 
.scroll-form{
  overflow: scroll;
}
.scroll_y {
  overflow-y: scroll;
  overflow-x: auto;
  max-height: 150px;
  /* height:auto; */
}
.el-tree>.el-tree-node{
  /* height: 200px;  */
  min-width: 100%;
  display:inline-block;
}
</style>
