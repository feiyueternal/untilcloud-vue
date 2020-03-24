<template>
  <el-dialog
    title="添加角色"
    :visible.sync="addDialogVisible"
    width="50%"
    :append-to-body="true"
    @close="addDialogClosed"
  >
    <el-form :model="addDialogForm" :rules="rules" ref="addDialogForm" label-width="80px">
      <el-form-item label="角色名" prop="name">
        <el-input v-model="addDialogForm.name" placeholder="请输入角色名"></el-input>
      </el-form-item>
      <el-form-item label="角色类型" prop="nameZh">
        <el-input 
         v-model="addDialogForm.nameZh" placeholder="请输入角色类型"></el-input>
      </el-form-item>
      <el-form-item label="角色状态" prop="enabled">
        <el-switch 
            active-value=true  
            v-model="addDialogForm.enabled" 
            @change="RolesChangeState($event)"
            active-text="启用"
            inactive-text="禁用"
            inactive-value=false
        ></el-switch>   
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="addDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addRole">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "RolesAddDialog",
  data() {
    return {
      addDialogVisible: false,
      addDialogForm: {
        name: "",
        nameZh: "",
        enabled: false
      },
      //对角色名和角色类型暂无限制
      rules:{
          name: [{ required: true, message: "请输入角色名", trigger: "blur" }],
          nameZh: [{ required: true, message: "请输入角色类型", trigger: "blur" }],
      }
    };
  },
  methods: {
    addRole() {
        this.$refs.addDialogForm.validate(valid => { 
            if(valid){
                console.log(this.addDialogForm)
                var url="/index/admin/role/add"
                var data={
                    name:this.addDialogForm.name,
                    nameZh:this.addDialogForm.nameZh,
                    enabled:this.addDialogForm.enabled
                }
                this.$http.post(url,data).then(res => {
                    // console.log(res)
                    if(res.data.code==200){
                        this.$message.success(res.data.data)
                        this.$emit("needfresh",true)
                        this.addDialogVisible = false
                    }else{
                        this.$message.error(res.data.data)
                    }
                }).catch(err => {
                    console.log(err)
                })
                
            }else{
                this.$message.error("不可为空")
            }
        })
    },
    addDialogClosed() {
      this.$refs.addDialogForm.resetFields();
    },
    open () {
        this.addDialogVisible = true;
    },
    RolesChangeState(value){
        // console.log(this.addDialogForm)
        console.log(value)
    }
  }
};
</script>
<style scoped>
</style>
