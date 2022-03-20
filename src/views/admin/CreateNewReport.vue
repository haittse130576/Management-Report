<template>
  <div>
    <el-dialog
      :title="title"
      v-model="dialogVisible"
      :before-close="handleClose"
      width="30%"
      @close="handleClose"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="90px"
        class="demo-ruleForm"
      >
        <el-form-item label="Title" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="Start Time" prop="startTime">
          <el-date-picker
            v-model="ruleForm.startTime"
            type="datetime"
            placeholder="Select date and time"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="Set Time" prop="endTime">
          <el-date-picker
            v-model="ruleForm.endTime"
            type="datetime"
            placeholder="Select date and time"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="Status" prop="status">
          <el-select v-model="ruleForm.status" placeholder="Status">
            <el-option label="Active" value="Active"></el-option>
            <el-option label="Inactive" value="Inactive"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >Create</el-button
          >
          <el-button @click="resetForm('ruleForm')">Reset</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { useStore } from 'vuex'
export default {
  name: 'CreateReportDialog',
  props: {
    dialogVisible: {
      type: Boolean,
    },
  },
  data() {
    return {
      title: 'Create Report Dialog',
      store: useStore(),
      ruleForm: {
        title: '',
        startTime: '',
        endTime: '',
        status: '',
      },
      rules: {
        title: [
          {
            required: true,
            message: 'Please input Activity name',
            trigger: 'blur',
          },
          {
            min: 3,
            max: 20,
            message: 'Length should be 3 to 20',
            trigger: 'blur',
          },
        ],
        startTime: [
          {
           
            type: 'date',
            required: true,
            message: 'Please pick a date',
            trigger: 'change',
          },
        ],
        endTime: [
          {
           
            type: 'date',
            required: true,
            message: 'Please pick a time',
            trigger: 'change',
          },
        ],
        status: [
          {
            required: true,
            message: 'Please pick a status',
            trigger: 'change',
          },
        ],
      },
    }
  },
  computed: {},
 
  methods: {
    handleClose() {
      this.$emit('close')
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          var response = await this.store.dispatch('report/insert', this.ruleForm)
          if (response.status === 'success') {
            this.$message('Successfully!!!')
            this.handleClose()
            await this.store.dispatch('getReportsAction')
            this.resetForm('ruleForm')
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
  watch: {
    visbleSync(val) {
      this.$emit('update:dialogVisible', val)
    },
  },
}
</script>
<style lang="scss">
</style>