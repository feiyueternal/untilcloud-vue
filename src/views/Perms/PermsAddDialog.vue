<template>
  <el-dialog
    title="添加权限"
    :visible.sync="addDialogVisible"
    width="50%"
    :append-to-body="true"
    @close="addDialogClosed"
  >
    <el-form :model="addDialogForm" :rules="rules" ref="addDialogForm" label-width="80px">
      <el-form-item label="权限代码" prop="name">
        <el-input v-model="addDialogForm.name" placeholder="请输入权限代码"></el-input>
      </el-form-item>
      <el-form-item label="权限描述" prop="desc_">
        <el-input v-model="addDialogForm.desc_" placeholder="请输入权限描述"></el-input>
      </el-form-item>
      <el-form-item label="权限路径" prop="url">
        <el-input v-model="addDialogForm.url" placeholder="请输入权限路径"></el-input>
      </el-form-item>
      <el-form-item label="父节点id" prop="parentId">
        <el-input v-model="addDialogForm.parentId" placeholder="请输入父节点id"></el-input>
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
  name: "PermsAddDialog",
  data() {
    return {
      addDialogVisible: false,
      addDialogForm: {
        name: "",
        desc_: "",
        url:"",
        parentId:""
      },
      rules: {
        name: [{ required: true, message: "请输入权限代码", trigger: "blur" }],
        desc_: [{ required: true, message: "请输入权限描述", trigger: "blur" }],
        url: [{ required: true, message: "请输入权限路径", trigger: "blur" }],
        parentId: [{ required: true, message: "请输入父节点id", trigger: "blur" }],
      }
    };
  },
  methods: {
    addMenu() {
      this.$refs.addDialogForm.validate(valid => {
        if (valid) {
          var url = "/index/admin/perm/add";
          var data = {
            name: this.addDialogForm.name,
            desc_:this.addDialogForm.desc_,
            url:this.addDialogForm.url, 
            parentId:this.addDialogForm.parentId   
          };
          // console.log(data)
          this.$http
            .post(url, data)
            .then(res => {
              if (res.data.code == 200) {
                this.$message.success("添加权限成功");
                this.$emit("needfresh", true);
                this.addDialogVisible = false;
              } else {
                this.$message.error("添加权限失败");
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
