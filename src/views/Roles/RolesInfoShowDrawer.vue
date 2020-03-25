<template>

  <el-drawer title="角色信息查看" 
  size="30%" 
  :visible.sync="dialogVisible" 
  :modal-append-to-body="false"
  style="height:100%;"
  >
    <roles-info-form ref="showform" v-bind:editable="false" :data="info" :loading="showLoading">
      
    </roles-info-form>
  </el-drawer>
  
</template>

<script>

  
  import RolesInfoForm from './RolesInfoForm'

  export default {
    name: 'RolesInfoShowDrawer',
    components: {RolesInfoForm},
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

