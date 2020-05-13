<template>
  <el-form
    size="small"
    :model="data"
    ref="sysForm"
    :rules="rules"
    label-position="right"
    label-width="150px"
    v-loading="loading"
    :disabled="!editable"
    class="scroll_form"
  >
    <el-form-item label="Id">
      <el-row>
        <el-col :span="15">
          <el-input readonly autocomplete="off" v-model="data.id"></el-input>
        </el-col>
      </el-row>
    </el-form-item>


    <el-form-item prop="name" label="机构名称">
      <el-row>
        <el-col :span="15">
          <el-input v-model="data.name" placeholder="请输入机构名称"></el-input>
        </el-col>
      </el-row>
    </el-form-item>


    <el-form-item prop="parentId" label="上级机构id">
      <el-row>
        <el-col :span="15">
          <el-input v-model="data.parentId" placeholder="请输入上级机构id"></el-input>
        </el-col>
      </el-row>
    </el-form-item>

    <el-form-item prop="sort" label="顺序">
      <el-row>
        <el-col :span="15">
          <el-input v-model="data.sort" placeholder="请输入所在的顺序"></el-input>
        </el-col>
      </el-row>
    </el-form-item>

  </el-form>
</template>

<script>
export default {
  name: "SysInfoForm",
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
        name: [{ required: true, message: "请输入机构名称", trigger: "blur" }],
        sort: [
          { required: true, message: "请输入所在的顺序", trigger: "blur" }
        ],
        parentId: [
          { required: true, message: "请输入上级机构id", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    resetFields() {
      this.$refs.sysForm.resetFields();
    },
    validate() {
      return new Promise((resolve, reject) => {
        this.$refs.sysForm.validate(valid => {
          if (valid) {
            resolve();
          }
        });
      });
    },
    submit() {
      this.$refs.sysForm.validate(valid => {
        if (valid) {
          var url = "/index/sys/school/edit";
          var edit_data = {
            id: this.data.id,
            name: this.data.name,
            parentId:this.data.parentId,
            sort:this.data.sort
          };
          console.log(edit_data);
            this.$http.put(url,edit_data).then(res => {
              if(res.data.code==200){
                this.$message.success("编辑机构成功")
                this.$emit("success-edit",true)
              }else{
                this.$message.error("编辑机构失败")
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
  width: 50%; 
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
