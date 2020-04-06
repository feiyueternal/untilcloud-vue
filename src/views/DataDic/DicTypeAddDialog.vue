<template>
  <el-dialog
    title="添加字典类型"
    :visible.sync="addDialogVisible"
    width="50%"
    :append-to-body="true"
    @close="addDialogClosed"
  >
    <el-form :model="addDialogForm" :rules="rules" ref="addDialogForm" label-width="80px">
      <el-form-item label="类型编码" prop="code">
        <el-input v-model="addDialogForm.code" placeholder="请输入类型编码"></el-input>
      </el-form-item>
      <el-form-item label="中文说明" prop="name">
        <el-input v-model="addDialogForm.name" placeholder="请输入类型中文说明"></el-input>
      </el-form-item>
      <el-row>
        <el-col>
          <span>状态:</span>
        </el-col>
        <el-col>
          <el-radio v-model="addDialogForm.status" label="true">正常</el-radio>
          <el-radio v-model="addDialogForm.status" label="false">禁用</el-radio>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="addDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addDicType">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "DicTypeAddDialog",
  data() {
    return {
      addDialogVisible: false,
      addDialogForm: {
        code: "",
        name: "",
        status: "true"
      },
      rules: {
        name: [
          { required: true, message: "请输入类型中文说明", trigger: "blur" }
        ],
        code: [{ required: true, message: "请输入类型编码", trigger: "blur" }]
      }
    };
  },
  methods: {
    addDicType() {
      this.$refs.addDialogForm.validate(valid => {
        if (valid) {
          var url = "/index/sys/dic/type/add";
          var data = {
            code: this.addDialogForm.code,
            name: this.addDialogForm.name,
            status: this.addDialogForm.status
          };
          //   console.log(data)
          this.$http
            .post(url, data)
            .then(res => {
              if (res.data.code == 200) {
                this.$message.success("添加菜单成功");
                this.$emit("needfresh", true);
                this.addDialogVisible = false;
              } else {
                this.$message.error(res.data.message);
              }
            })
            .catch(err => {
              console.log(err);
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
