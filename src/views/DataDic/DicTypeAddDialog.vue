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
    <el-form :model="addDetailForm" ref="addDetailForm" label-width="80px">
      <el-row>
        <el-button type="warning" size="mini" @click="addNewDetail()">增加明细</el-button>
        <el-button type="danger" size="mini" @click="delNewDetail()">删除明细</el-button>
      </el-row>
      <div>
        <el-row v-for="(item, id) in addDetailForm.detailArray" :key="id">
          {{'明细' + (id+1) + ':'}}
          <el-form-item label="名称">
            <el-input v-model="item.name" placeholder="请输入名称"></el-input>
          </el-form-item>
          <el-form-item label="排序">
            <el-input v-model="item.sort" placeholder="请输入排序"></el-input>
          </el-form-item>
          <el-form-item label="值">
            <el-input v-model="item.value" placeholder="请输入值"></el-input>
          </el-form-item>
          <el-row>
            <el-col>
              <span>状态:</span>
            </el-col>
            <el-col>
              <el-radio v-model="item.status" label="true">正常</el-radio>
              <el-radio v-model="item.status" label="false">禁用</el-radio>
            </el-col>
          </el-row>
        </el-row>
      </div>
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
      addDetailForm: { detailArray: [] },
      rules: {
        name: [
          { required: true, message: "请输入类型中文说明", trigger: "blur" }
        ],
        code: [{ required: true, message: "请输入类型编码", trigger: "blur" }]
      }
      // DetailRules: {
      //   name: [{ required: true, message: "请输入名称", trigger: "blur" }],
      //   sort: [{ required: true, message: "请输入排序", trigger: "blur" }],
      //   value: [{ required: true, message: "请输入值", trigger: "blur" }]
      // }
    };
  },
  methods: {
    addDicType() {
      this.$refs.addDialogForm.validate(valid => {
        if (valid) {
          var detailList = [];
          if (this.addDetailForm.detailArray.length == 0) {
            var detailList = [];
          } else {
            for (var i = 0; i < this.addDetailForm.detailArray.length; i++) {
              detailList.push(this.addDetailForm.detailArray[i]);
            }
          }

          var url = "/index/sys/dic/type/adds";
          var data = {
            dictionaryType: {
              code: this.addDialogForm.code,
              name: this.addDialogForm.name,
              status: this.addDialogForm.status
            },
            dictionaryInfos: detailList
          };
          //   console.log(data)
          this.$http
            .post(url, data)
            .then(res => {
              if (res.data.code == 200) {
                this.$message.success("添加字典类型成功");
                this.$emit("needfresh", true);
                this.addDialogVisible = false;
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
    addDialogClosed() {
      this.$refs.addDialogForm.resetFields();
      this.addDetailForm.detailArray = [];
    },
    open() {
      this.addDialogVisible = true;
    },
    addNewDetail() {
      var infos = {
        sort: "",
        name: "",
        value: "",
        status: "true"
      };
      this.addDetailForm.detailArray.push(infos);
      // console.log(this.addDetailForm);
    },
    delNewDetail() {
      if (this.addDetailForm.detailArray.length == 0) {
      } else {
        this.addDetailForm.detailArray.pop();
      }
    }
  }
};
</script>
<style scoped>
.el-button {
  margin-top: 15px;
}
.el-row {
  margin-top: 15px;
}
</style>
