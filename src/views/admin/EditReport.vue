<template>
  <div>
    <el-dialog
      :title="title"
      v-model="dialogVisible"
      :before-close="handleClose"
      width="50%"
      @close="handleClose"
    >
      <el-form
        :model="reportForm"
        ref="reportForm"
        label-width="100px"
        :inline="false"
        size="normal"
      >
        <el-form-item label="Title" prop="title">
          <el-input v-model="reportForm.title"></el-input>
        </el-form-item>
        <el-form-item label="Set Time" prop="endTime">
          <el-date-picker
            v-model="reportForm.endTime"
            type="datetime"
            placeholder="Select date and time">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="Status" prop="status">
          <el-select v-model="reportForm.status" placeholder="Status">
            <el-option label="Active" value="Active"></el-option>
            <el-option label="Inactive" value="Inactive"></el-option>
          </el-select>
        </el-form-item>
            <el-button type="success" @click="onUpdate('reportForm')">Update</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
import { useStore } from 'vuex'
export default {
  name: 'EditReport',
  props: {
    dialogVisible: {
      type: Boolean,
    },
  },
  data() {
    return {
      title: 'Update Report',
      store: useStore(),
    }
  },


  computed: {
    ...mapState('report', {
      report: (state) => state.report,
    }),
    reportForm:{
      get(){
        return this.report
      },
      set(value){
        this.store.commit('report/setReport', value)
      }
    }
  },
  methods: {
    ...mapMutations(['setReports']),

    handleClose() {
      this.$emit('close')
    },
    onUpdate(formName) {
      this.$refs[formName].validate(async (valid) => {
        console.log("123---------",this.reportForm)
        if (valid) {
          var response = await this.store.dispatch('report/update', this.reportForm)
          if (response.status === 'success') {
            this.$message('Successfully!!!')
            this.handleClose()
            await this.store.dispatch('report/getReportsAction')
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  },
  mounted() {
  },
  watch: {
    visbleSync(val) {
      this.$emit('update:dialogVisible', val)
    },
  },
}
</script>
<style lang="scss">
.btnCancel {
  float: right;
}
</style>