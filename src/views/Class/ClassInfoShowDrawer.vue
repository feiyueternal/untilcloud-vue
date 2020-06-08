<template>
  <el-drawer title="课程信息查看" 
  size="40%" 
  :visible.sync="dialogVisible" 
  :modal-append-to-body="false"
  style="height:100%"
  >
  <el-scrollbar style="height: 550px" ref="scroll">
    <class-info-form ref="showform" v-bind:editable="false" :data="info" :loading="showLoading">
      
    </class-info-form>  
    </el-scrollbar>
  </el-drawer>
</template>

<script>

  
  import ClassInfoForm from './ClassInfoForm'

  export default {
    name: 'ClassInfoShowDrawer',
    components: {ClassInfoForm},
    data () {
      return {
        info: {},
        dialogVisible: false,
        showLoading: false
      }
    },
    methods: {
      init (row) {
        this.loadingStart();
        this.info=row;
        this.loadingEnd();
      },
      open (row) {
        this.init(row);
        this.dialogVisible = true;
      },
      loadingStart () {
        this.showLoading = true;
      },
      loadingEnd () {
        this.showLoading = false;
      }
    },
    
  }
</script>

<style scoped>
</style>

