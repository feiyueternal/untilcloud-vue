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
  >
    <el-form-item
      label="Id"
    >
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
      label="角色类型"
    >
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
        ref="permstree"
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
        ref="permstree"
        :data="data.perms"
        node-key="id"
        show-checkbox
        :props="permsprops"
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
        ref="menustree"
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
        :data="data.menus"
        node-key="id"
        show-checkbox
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
      }
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
  },
};
</script>
<style scoped>
.el-input__inner {
  width:50px;
  text-align: left;
}

</style>
