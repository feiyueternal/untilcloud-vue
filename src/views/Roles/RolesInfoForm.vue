<template>
  <el-form
    size="small"
    :model="data"
    ref="rolesForm"
    :rules="rules"
    label-position="right"
    label-width="120px"
    class="edit-dialog-form"
    v-loading="loading"
  >
    <el-form-item
      v-model="data.id"
      :span="6"
      prop="id"
      label="Id"
    >
    <el-input
        :disabled="true"
        type="text"
        v-model="data.id"
      ></el-input>
    </el-form-item>

    <el-form-item
      v-model="data.name"
      :span="9"
      prop="name"
      label="角色名"
    >
    <el-input
        :disabled="!editable"
        type="text"
        v-model="data.name"
      ></el-input>
    </el-form-item>

    <el-form-item
      v-model="data.nameZh"
      :span="9"
      prop="nameZh"
      label="角色类型"
    >
    <el-input
        :disabled="!editable"
        type="text"
        v-model="data.nameZh"
      ></el-input>
    </el-form-item>

    <el-form-item
      v-model="data.perms"
      :span="18"
      prop="perms"
      label="角色权限"
    >
      <el-tree
        ref="permstree"
        :data="data.perms"
        node-key="id"
        show-checkbox
        :disabled="!editable"
        :props="permsprops"
        >
      </el-tree> 
    </el-form-item>

    <el-form-item
      v-model="data.menus"
      :span="18"
      prop="menus"
      label="菜单显示"
    >
    <el-tree
        ref="menustree"
        :data="data.menus"
        node-key="id"
        :disabled="!editable"
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
  },
  data() {
    return {
      editable:false,
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
</style>
