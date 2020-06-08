<template>
  <el-form
    size="small"
    :model="data"
    ref="classForm"
    :rules="rules"
    label-position="right"
    label-width="150px"
    v-loading="loading"
    :disabled="!editable"
  >
    <el-form-item prop="cover" label="课程封面">
      <el-row>
        <el-col :span="15">
          <el-upload
            :disabled="!editable"
            class="avatar-uploader"
            ref="upload"
            :show-file-list="false"
            action="/index/upload"
            :before-upload="beforeUpload"
            :on-change="handleChange"
            :auto-upload="false"
            :accept="'image/*'"
          >
            <img v-if="data.cover" :src="data.cover" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-col>
      </el-row>
    </el-form-item>

    <el-form-item prop="name" label="课程名称">
      <el-row>
        <el-col :span="15">
          <el-input v-model="data.name" placeholder="请输入课程名称"></el-input>
        </el-col>
      </el-row>
    </el-form-item>

    <el-form-item prop="grade" label="年级">
      <el-row>
        <el-col :span="15">
          <el-input v-model="data.grade" placeholder="请输入年级"></el-input>
        </el-col>
      </el-row>
    </el-form-item>

    <el-form-item prop="semester" label="所属学期">
      <el-row>
        <el-col :span="15">
          <el-select v-model="data.semester" placeholder="请选择" @change="selectC">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
    </el-form-item>

    <el-form-item prop="school" label="学校">
      <el-row>
        <el-col :span="15">
          <el-input v-model="data.school" placeholder="请输入学校"></el-input>
        </el-col>
      </el-row>
    </el-form-item>

    <el-form-item prop="college" label="学院">
      <el-row>
        <el-col :span="15">
          <el-input v-model="data.college" placeholder="请输入学院"></el-input>
        </el-col>
      </el-row>
    </el-form-item>

    <el-form-item prop="major" label="专业">
      <el-row>
        <el-col :span="15">
          <el-input v-model="data.major" placeholder="请输入专业"></el-input>
        </el-col>
      </el-row>
    </el-form-item>

    <el-form-item prop="teacher" label="任课教师">
      <el-row>
        <el-col :span="15">
          <el-input v-model="data.teacher" placeholder="请输入任课教师"></el-input>
        </el-col>
      </el-row>
    </el-form-item>

    <el-form-item prop="learnRequire" label="学习要求">
      <el-row>
        <el-col :span="15">
          <el-input v-model="data.learnRequire" placeholder="请输入学习要求"></el-input>
        </el-col>
      </el-row>
    </el-form-item>

    <el-form-item prop="teacherProgress" label="教学进度">
      <el-row>
        <el-col :span="15">
          <el-input v-model="data.teacherProgress" placeholder="请输入教学进度"></el-input>
        </el-col>
      </el-row>
    </el-form-item>

    <el-form-item prop="examArrange" label="考试安排">
      <el-row>
        <el-col :span="15">
          <el-input v-model="data.examArrange" placeholder="请输入考试安排"></el-input>
        </el-col>
      </el-row>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "ClassInfoForm",
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
      formdata: new window.FormData(),
      options: [],
      flag:false
    };
  },
  methods: {
    resetFields() {
      this.$refs.classForm.resetFields();
    },
    validate() {
      return new Promise((resolve, reject) => {
        this.$refs.classForm.validate(valid => {
          if (valid) {
            resolve();
          }
        });
      });
    },
    beforeUpload(file) {
      return true;
    },
    selectC(value) {
      var obj = {};
      obj = this.options.find(item => {
        return item.value == value;
      });
      this.data.semester = obj.name;
      console.log(this.data.semester);
    },
    getItem() {
      var url = "/index/userInfo/get/666";
      this.$http
        .get(url)
        .then(res => {
          // console.log(res);
          if (res.data.code == 200) {
            this.options = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleChange(file, fileList) {
      this.formdata.append("cover", file.raw);
      this.flag=true
      this.data.cover = URL.createObjectURL(file.raw);
    },
    submit() {
      this.$refs.classForm.validate(valid => {
        if (valid) {
          var url = "/index/class/course/modify";
          if(this.flag==false){
            this.formdata.append("cover", this.data.cover);
          }
          this.formdata.append("id", this.data.id);
          this.formdata.append("name", this.data.name);
          this.formdata.append("grade", this.data.grade);
          this.formdata.append("semester", this.data.semester);
          this.formdata.append("school", this.data.school);
          this.formdata.append("college", this.data.college);
          this.formdata.append("major", this.data.major);
          this.formdata.append("teacher", this.data.teacher);
          this.formdata.append("learnRequire", this.data.learnRequire);
          this.formdata.append("teacherProgress", this.data.teacherProgress);
          this.formdata.append("examArrange", this.data.examArrange);
          console.log(this.formdata.get("semester"));
          this.$http
            .post(url, this.formdata)
            .then(res => {
              if (res.data.code == 200) {
                this.$message.success("编辑课程成功");
                this.$emit("success-edit", true);
              } else {
                this.$message.error("编辑课程失败");
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.$message.error("请按要求填写信息");
        }
      });
    }
  },
  mounted() {
    this.getItem();
    this.flag=false
  }
};
</script>
<style scoped>
.el-input__inner {
  width: 50%;
  text-align: left;
}
.el-select{
  width: 100%;
  text-align: left;
}

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
/* .emm { */
/* margin-right: 15px; */
/* } */
</style>
