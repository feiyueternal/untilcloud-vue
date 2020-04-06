<template>
  <el-dialog
    title="修改字典明细"
    :visible.sync="editDetailDialogVisible"
    width="50%"
    :append-to-body="true"
    @close="editDetailDialogClosed"
  >
    <el-form :model="editDetailForm" :rules="rules" ref="editDetailForm" label-width="80px">
      <el-form-item label="id" prop="id">
        <el-input v-model="editDetailForm.id" placeholder="请输入id"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model="editDetailForm.sort" placeholder="请输入排序"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="name">
        <el-input v-model="editDetailForm.name" placeholder="请输入描述"></el-input>
      </el-form-item>
      <el-form-item label="值" prop="value">
        <el-input v-model="editDetailForm.value" placeholder="请输入值"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="editDetailDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="editDicDetail">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "EditDetail",
  data() {
    return {
      editDetailDialogVisible: false,
      editDetailForm: {
        id: "",
        sort: "",
        name: "",
        value: "",
        typeId: ""
      },
    //   dicDetailInfo: {
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
          this.editDetailForm.id = this.$store.state.dicDetail.id;
          this.editDetailForm.sort = this.$store.state.dicDetail.sort;
          this.editDetailForm.name = this.$store.state.dicDetail.name;
          this.editDetailForm.value = this.$store.state.dicDetail.value;
          this.editDetailForm.typeId = this.$store.state.dicDetail.typeId;
      },
    editDicDetail() {
      this.$refs.editDetailForm.validate(valid => {
        if (valid) {
          var url = "/index/sys/dic/info/edit";
          var data = {
            id: this.editDetailForm.id,
            sort: this.editDetailForm.code,
            name: this.editDetailForm.name,
            value: this.editDetailForm.value,
            dictionaryType: {
                id: this.editDetailForm.typeId
            }
          };
            console.log(data)
          this.$http
            .put(url, data)
            .then(res => {
              console.log(res);
              if (res.data.code == 200) {
                this.$message.success("修改字典明细成功");
                this.$emit("needfresh", true);
                this.editDetailDialogVisible = false;
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
    editDetailDialogClosed() {
      this.$refs.editDetailForm.resetFields();
    },
    open() {
      this.editDetailDialogVisible = true;
      // console.log(this.dicId)
      this.getDicTypeInfo();
    }
  }
};
</script>
<style scoped>
</style>
