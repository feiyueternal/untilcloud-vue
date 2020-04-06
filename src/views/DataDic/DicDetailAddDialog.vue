<template>
  <el-dialog
    title="添加字典明细"
    :visible.sync="addDialogVisible"
    width="50%"
    :append-to-body="true"
    @close="addDialogClosed"
  >
    <el-form :model="addDialogForm" :rules="rules" ref="addDialogForm" label-width="80px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="addDialogForm.name" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model="addDialogForm.sort" placeholder="请输入排序"></el-input>
      </el-form-item>
      <el-form-item label="值" prop="value">
        <el-input v-model="addDialogForm.value" placeholder="请输入值"></el-input>
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
      <el-button type="primary" @click="addDicTypeDetail">确 定</el-button>
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
        name: "",
        sort: "",
        value: "",
        status: "true"
      },
      dicId: "", //获取当前字典类型的Id
      rules: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" }
        ],
        sort: [{ required: true, message: "请输入排序", trigger: "blur" }],
        value: [{ required: true, message: "请输入值", trigger: "blur" }]
      }
    };
  },
  created() {
    // this.getDicId();
  },
  methods: {
      getDicId() {
          this.dicId = this.$store.state.dicTypeId;
          console.log(this.dicId)
      },
    addDicTypeDetail() {
      this.$refs.addDialogForm.validate(valid => {
        if (valid) {
          var url = "/index/sys/dic/info/add";
          var data = {
            sort: this.addDialogForm.sort,
            name: this.addDialogForm.name,
            value: this.addDialogForm.value,
            status: this.addDialogForm.status,
            dictionaryType: {id: this.dicId}
          };
            console.log(data)
          this.$http
            .post(url, data)
            .then(res => {
              console.log(res);
              if (res.data.code == 200) {
                this.$message.success("添加字典明细成功");
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
      // console.log(this.dicId)
      this.getDicId();
    }
  }
};
</script>
<style scoped>
</style>
