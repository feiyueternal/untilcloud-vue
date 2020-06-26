<template>
  <el-drawer
    title="课程信息修改"
    size="40%"
    :visible.sync="dialogVisible"
    :modal-append-to-body="false"
    style="height:100%;"
  >
    <el-scrollbar style="height: 620px" ref="scroll">
      <class-info-form
        ref="editform"
        v-bind:editable="true"
        :data="info"
        :loading="showLoading"
        @success-edit="successEdit"
      ></class-info-form>
    </el-scrollbar>
    <div class="demo-drawer__footer">
      <el-button @click="dialogVisible=false">取 消</el-button>
      <el-button type="primary" @click.native.prevent="Submit" :loading="showLoading">提 交</el-button>
    </div>
  </el-drawer>
</template>

<script>
import ClassInfoForm from "./ClassInfoForm";

export default {
  name: "ClassInfoEditDrawer",
  components: { ClassInfoForm },
  data() {
    return {
      info: {},
      dialogVisible: false,
      showLoading: false
    };
  },
  methods: {
    init(row) {
      this.loadingStart();
      this.info = Object.assign({}, row);
      setTimeout(() =>{
          this.$refs.editform.init()
        },20)
      console.log(this.info);
      this.loadingEnd();
    },
    open(row) {
      this.init(row);
      this.dialogVisible = true;
    },
    loadingStart() {
      this.showLoading = true;
    },
    loadingEnd() {
      this.showLoading = false;
    },
    successEdit(flag) {
      if (flag) {
        this.loadingEnd();
        this.dialogVisible = false;
      }
      this.$emit("needfresh", true);
    },
    Submit() {
      console.log(this.$refs.editform);
      this.$refs.editform.submit();
    }
  }
};
</script>

<style scoped>
.el-drawer.rtl {
  overflow: scroll;
  width: 100%;
}
.el-drawer.rtl::-webkit-scrollbar {
  width: 0px;
}
</style>

