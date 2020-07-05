<template>
  <el-dialog
    title="添加机构"
    :visible.sync="addDialogVisible"
    width="50%"
    :append-to-body="true"
    @close="addDialogClosed"
  >
    <el-form :model="addDialogForm" :rules="rules" ref="addDialogForm" label-width="120px">

      <el-form-item label="机构名称" prop="name">
        <el-input v-model="addDialogForm.name" placeholder="请输入机构名称"></el-input>
      </el-form-item>
      <el-form-item label="上级机构id" prop="parentId">
        <el-input v-model="addDialogForm.parentId" placeholder="请输入上级机构id"></el-input>
      </el-form-item>
     <el-form-item prop="sort" label="顺序">
        <el-input v-model="addDialogForm.sort" placeholder="请输入所在的顺序"></el-input>
    </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="addDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addMenu">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "SysAddDialog",
  data() {
    return {
      addDialogVisible: false,
      addDialogForm: {
        name: "",
        sort:"",
        parentId:""
      },
      rules: {
        name: [{ required: true, message: "请输入机构名称", trigger: "blur" }],
        sort: [{ required: true, message: "请输入所在的顺序", trigger: "blur" }],
        parentId: [{ required: true, message: "请输入上级机构id", trigger: "blur" }],
      }
    };
  },
  methods: {
    addMenu() {
      this.$refs.addDialogForm.validate(valid => {
        if (valid) {
          var url = "/index/sys/school/add";
          var data = {
            name: this.addDialogForm.name,
            parentId:this.addDialogForm.parentId,
            sort:this.addDialogForm.sort   
          };
          console.log(data)
          this.$http
            .post(url, data)
            .then(res => {
              if (res.data.code == 200) {
                this.$message.success("添加机构成功");
                this.$emit("needfresh", true);
                this.addDialogVisible = false;
              } else {
                this.$message.error("添加机构失败");
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
    addDialogClosed() {
      this.$refs.addDialogForm.resetFields();
    },
    open() {
      this.addDialogVisible = true;
    }
  }
};
</script>
<style scoped>
</style>
