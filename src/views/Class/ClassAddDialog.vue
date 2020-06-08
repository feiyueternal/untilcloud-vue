<template>
  <el-dialog
    title="添加课程"
    :visible.sync="addDialogVisible"
    width="50%"
    :append-to-body="true"
    @close="addDialogClosed"
  >
    <el-form :model="addDialogForm" :rules="rules" ref="addDialogForm" label-width="80px">
      <el-form-item prop="cover" label="课程封面">
        <el-upload
          class="avatar-uploader"
          ref="upload"
          :show-file-list="false"
          action="/index/upload"
          :before-upload="beforeUpload"
          :on-change="handleChange"
          :auto-upload="false"
          :accept="'image/*'"
        >
          <img v-if="addDialogForm.cover" :src="addDialogForm.cover" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item prop="name" label="课程名称">
        <el-input v-model="addDialogForm.name" placeholder="请输入课程名称"></el-input>
      </el-form-item>

      <el-form-item prop="grade" label="年级">
        <el-input v-model="addDialogForm.grade" placeholder="请输入年级"></el-input>
      </el-form-item>

      <el-form-item prop="semester" label="所属学期">
        <el-select v-model="addDialogForm.semester" placeholder="请选择" @change="selectC">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item prop="school" label="学校">
        <el-input v-model="addDialogForm.school" placeholder="请输入学校"></el-input>
      </el-form-item>

      <el-form-item prop="college" label="学院">
        <el-input v-model="addDialogForm.college" placeholder="请输入学院"></el-input>
      </el-form-item>

      <el-form-item prop="major" label="专业">
        <el-input v-model="addDialogForm.major" placeholder="请输入专业"></el-input>
      </el-form-item>

      <el-form-item prop="teacher" label="任课教师">
        <el-input v-model="addDialogForm.teacher" placeholder="请输入任课教师"></el-input>
      </el-form-item>

      <el-form-item prop="learnRequire" label="学习要求">
        <el-input v-model="addDialogForm.learnRequire" placeholder="请输入学习要求"></el-input>
      </el-form-item>

      <el-form-item prop="teacherProgress" label="教学进度">
        <el-input v-model="addDialogForm.teacherProgress" placeholder="请输入教学进度"></el-input>
      </el-form-item>

      <el-form-item prop="examArrange" label="考试安排">
        <el-input v-model="addDialogForm.examArrange" placeholder="请输入考试安排"></el-input>
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
  name: "ClassAddDialog",
  data() {
    return {
      addDialogVisible: false,
      addDialogForm: {
        cover: "",
        name: "",
        grade: "",
        semester: "",
        school: "",
        college: "",
        major: "",
        teacher: "",
        learnRequire: "",
        teacherProgress: "",
        examArrange: ""
      },
      rules: {
        name: [{ required: true, message: "请输入课程名称", trigger: "blur" }],
        cover: [{ required: true, message: "请上传图片", trigger: "blur" }],
        grade: [{ required: true, message: "请输入年级", trigger: "blur" }],
        semester: [
          { required: true, message: "请输入所属学期", trigger: "blur" }
        ],
        school: [{ required: true, message: "请输入学校", trigger: "blur" }],
        college: [{ required: true, message: "请输入学院", trigger: "blur" }],
        teacher: [
          { required: true, message: "请输入任课教师", trigger: "blur" }
        ]
      },
      options: [],
      formdata: new window.FormData(),
            flag:false,
            imageUrl:null
    };
  },
  methods: {
    handleChange(file, fileList) {
      this.formdata.append("cover", file.raw);
      this.flag=true
      this.addDialogForm.cover=URL.createObjectURL(file.raw)
    },
    beforeUpload(file) {
      return false;
    },
    selectC(value) {
       var obj = {};
      obj = this.options.find(item => {
        return item.value == value;
      });
      // console.log(obj);
      this.addDialogForm.semester = obj.name;
    },
    getItem() {
      var url = "/index/userInfo/get/666";
      this.$http
        .get(url)
        .then(res => {
          console.log(res.data.data);
          if (res.data.code == 200) {
            this.options = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    addMenu() {
      this.$refs.addDialogForm.validate(valid => {
        if (valid) {
          var url = "/index/class/course/add";
          if (this.addDialogForm.learnRequire == "") {
            this.addDialogForm.learnRequire = "暂无内容";
          }
          if (this.addDialogForm.teacherProgress == "") {
            this.addDialogForm.teacherProgress = "暂无内容";
          }
          if (this.addDialogForm.examArrange == "") {
            this.addDialogForm.examArrange = "暂无内容";
          }

          if(this.flag==false){
            this.formdata.append("cover", this.addDialogForm.cover);
          }
          this.formdata.append("name", this.addDialogForm.name);
          this.formdata.append("grade", this.addDialogForm.grade);
          this.formdata.append("semester", this.addDialogForm.semester);
          this.formdata.append("school", this.addDialogForm.school);
          this.formdata.append("college", this.addDialogForm.college);
          this.formdata.append("major", this.addDialogForm.major);
          this.formdata.append("teacher", this.addDialogForm.teacher);
          this.formdata.append("learnRequire", this.addDialogForm.learnRequire);
          this.formdata.append(
            "teacherProgress",
            this.addDialogForm.teacherProgress
          );
          this.formdata.append("examArrange", this.addDialogForm.examArrange);
          console.log(this.formdata);
          this.$http
            .post(url, this.formdata)
            .then(res => {
              if (res.data.code == 200) {
                this.imageUrl=res.data.data
                // this.$msgbox({
                //   type:"info"
                // })
                this.$alert("<strong><img src="+this.imageUrl+" width=200px eight=200px><strong>","课程二维码",{
                  dangerouslyUseHTMLString: true
                })
                this.$message.success("添加课程成功");
                this.$emit("needfresh", true);
                this.addDialogVisible = false;
              } else {
                this.$message.error("添加课程失败");
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
  },
  mounted() {
    this.getItem();
    this.flag=false
  }
};
</script>
<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
.avatar {
  width: 150px;
  height: 150px;
  display: block;
}
.el-select{
  width: 100%;
  text-align: left;
}
</style>
