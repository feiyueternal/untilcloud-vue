<template>
  <el-form
    size="small"
    :model="data"
    ref="rolesForm"
    :rules="rules"
    label-position="right"
    label-width="120px"
    class="edit-dialog-form"
    v-loading="loading"
  >
    <el-form-item
      v-if="editable"
      :editable="editable"
      v-model="data.type"
      :span="18"
      prop="type"
      label="黑名单类型"
    >
      <dict-select size="small" v-model="data.type" dict-name="VehicleBlacklistType"></dict-select>
    </el-form-item>
    <el-form-item
      v-if="!editable"
      :editable="editable"
      v-model="data.typeText"
      :span="18"
      prop="typeText"
      label="黑名单类型"
    ></el-form-item>
    <el-form-item
      v-if="data.type==='Person'&&editable"
      :editable="editable"
      :span="24"
      prop="userId"
      v-model="data.userId"
      label="人员名字"
    >
    </el-form-item>
    <el-form-item
      v-if="data.type==='Person'&&!editable"
      :editable="editable"
      :span="24"
      prop="userName"
      v-model="data.userName"
      label="人员名字"
    ></el-form-item>
    <el-form-item
      :editable="editable"
      v-model="data.expireTime"
      :span="24"
      prop="expireTime"
      label="截止日期"
    >
      <el-date-picker v-model="data.expireTime" type="date" placeholder="选择日期"></el-date-picker>
      <span slot="show">{{data.expireTime | dateFormatter}}</span>
    </el-form-item>
    <el-form-item v-model="data.reason" :span="18" prop="reason" label="拉黑原因">
      <dict-select
        :editable="editable"
        size="small"
        v-model="data.reason"
        dict-name="VehicleBlacklistReason"
      ></dict-select>
    </el-form-item>
    <el-form-item :editable="editable" v-model="data.remark" :span="24" prop="remark" label="备注">
      <el-input
        type="textarea"
        placeholder="请输入内容"
        v-model="data.remark"
        :rows="6"
        maxlength="255"
        show-word-limit
      ></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "RoleInfoForm",
  props: {
    data: {
      type: Object,
      default: function() {
        return {};
      }
    },
    editable: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      rules: {
        type: [
          { required: true, message: "黑名单类型不能为空", trigger: "blur" }
        ],
        reason: [
          { required: true, message: "拉黑原因不能为空", trigger: "blur" }
        ],
        plateNo: [
          { required: true, message: "车牌号不能为空", trigger: "blur" }
        ],
        userId: [
          { required: true, message: "人员名字不能为空", trigger: "blur" }
        ],
        typeText: [
          { required: true, message: "人员名字不能为空", trigger: "blur" }
        ],
        userName: [
          { required: true, message: "人员名字不能为空", trigger: "blur" }
        ],
        reasonText: [
          { required: true, message: "拉黑原因不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    resetFields() {
      this.$refs.blacklistForm.resetFields();
    },
    validate() {
      return new Promise((resolve, reject) => {
        this.$refs.blacklistForm.validate(valid => {
          if (valid) {
            resolve();
          }
        });
      });
    }
  }
};
</script>
<style scoped>
</style>
