<template>
  <el-form
    size="small"
    :model="data"
    ref="permsForm"
    :rules="rules"
    label-position="right"
    label-width="150px"
    v-loading="loading"
    :disabled="!editable"
    class="scroll_form"
  >
    <el-form-item label="id">
      <el-row>
        <el-col :span="15">
          <el-input readonly autocomplete="off" v-model="data.id"></el-input>
        </el-col>
      </el-row>
    </el-form-item>

    <el-form-item prop="name" label="权限代码">
      <el-row>
        <el-col :span="15">
          <el-input type="textarea" v-model="data.name"></el-input>
        </el-col>
      </el-row>
    </el-form-item>

    <el-form-item prop="desc_" label="权限描述">
      <el-row>
        <el-col :span="15">
          <el-input v-model="data.desc_" placeholder="请输入权限描述"></el-input>
        </el-col>
      </el-row>
    </el-form-item>

    <el-form-item prop="url" label="权限路径">
      <el-row>
        <el-col :span="15">
          <el-input type="textarea" v-model="data.url"></el-input>
        </el-col>
      </el-row>
    </el-form-item>

    <el-form-item prop="parentId" label="父节点id">
      <el-row>
        <el-col :span="15">
          <el-input v-model="data.parentId"></el-input>
        </el-col>
      </el-row>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "PermsInfoForm",
  props: {
    data: {
      type: Object,
      default: function() {
        return {};
      }
    },
    loading: {
      type: Boolean,
      default: false
    },
    editable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      rules: {
        name: [{ required: true, message: "请输入权限代码", trigger: "blur" }],
        desc_: [
          { required: true, message: "请输入权限描述", trigger: "blur" }
        ],
        url: [{ required: true, message: "请输入权限路径", trigger: "blur" }],
        parentId: [
          { required: true, message: "请输入父节点id", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    resetFields() {
      this.$refs.permsForm.resetFields();
    },
    validate() {
      return new Promise((resolve, reject) => {
        this.$refs.permsForm.validate(valid => {
          if (valid) {
            resolve();
          }
        });
      });
    },
    submit() {
      this.$refs.permsForm.validate(valid => {
        if (valid) {
          var url = "/index/admin/perm/edit";
          var edit_data = {
            id: this.data.id,
            name: this.data.name,
            desc_: this.data.desc_,
            url:this.data.url,
            parentId:this.data.parentId   
          };
          console.log(edit_data);
            this.$http.put(url,edit_data).then(res => {
              if(res.data.code==200){
                this.$message.success("编辑权限成功")
                this.$emit("success-edit",true)
              }else{
                this.$message.error("编辑权限失败")
              }
            }).catch(err => {
              console.log(err)
          })
        } else {
          this.$message.error("请按要求填写信息");
        }
      });
    }
  }
};
</script>
<style scoped>
.el-input__inner {
  /* width: 100px; */
  text-align: left;
}
.scroll-form {
  overflow: scroll;
}
.scroll_y {
  overflow-y: scroll;
  overflow-x: auto;
  max-height: 150px;
  height:auto;
}
</style>
