<template>
  <el-dialog
    title="修改字典类型"
    :visible.sync="editTypeDialogVisible"
    width="50%"
    :append-to-body="true"
    @close="editTypeDialogClosed"
  >
    <el-form :model="editTypeForm" :rules="rules" ref="editTypeForm" label-width="80px">
      <el-form-item label="id" prop="id">
        <el-input v-model="editTypeForm.id" placeholder="请输入id"></el-input>
      </el-form-item>
      <el-form-item label="编码" prop="code">
        <el-input v-model="editTypeForm.code" placeholder="请输入编码"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="name">
        <el-input v-model="editTypeForm.name" placeholder="请输入描述"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="editTypeDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="editDicType">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "EditType",
  data() {
    return {
      editTypeDialogVisible: false,
      editTypeForm: {
        id: "",
        code: "",
        name: ""
      },
    //   dicTypeInfo: {
    //     id: '',
    //     code: '',
    //     name: ''
    //   },//获取字典类型信息
      
      rules: {
        id: [
          { required: true, message: "请输入id", trigger: "blur" }
        ],
        code: [{ required: true, message: "请输入编码", trigger: "blur" }],
        name: [{ required: true, message: "请输入描述", trigger: "blur" }]
      }
    };
  },
  created() {
    // this.getDicId();
  },
  methods: {
      getDicTypeInfo() {
          this.editTypeForm.id = this.$store.state.dicTypeInfo.id;
          this.editTypeForm.code = this.$store.state.dicTypeInfo.code;
          this.editTypeForm.name = this.$store.state.dicTypeInfo.name;
      },
    editDicType() {
      this.$refs.editTypeForm.validate(valid => {
        if (valid) {
          var url = "/index/sys/dic/type/edit";
          var data = {
            id: this.editTypeForm.id,
            code: this.editTypeForm.code,
            name: this.editTypeForm.name
          };
            // console.log(data)
          this.$http
            .put(url, data)
            .then(res => {
              // console.log(res);
              if (res.data.code == 200) {
                this.$message.success("修改字典类型成功");
                this.$emit("needfresh", true);
                this.editTypeDialogVisible = false;
              } else {
                this.$message.error(res.data.message);
              }
            })
            .catch(err => {
              // console.log(err);
            });
        } else {
          this.$message.error("不可为空");
        }
      });
    },
    editTypeDialogClosed() {
      this.$refs.editTypeForm.resetFields();
    },
    open() {
      this.editTypeDialogVisible = true;
      // console.log(this.dicId)
      this.getDicTypeInfo();
    }
  }
};
</script>
<style scoped>
</style>
