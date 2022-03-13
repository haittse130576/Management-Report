<template>
  <div>
    <el-dialog
      :title="title"
      v-model="dialogVisible"
      :before-close="handleClose"
      width="20%"
      @close="handleClose"
    >
      <el-form
        :model="dataTable"
        ref="form"
        label-width="100px"
        :inline="false"
        size="normal">
        
        <el-form-item label="Start Time">
          <el-date-picker
            v-model="report.startTime"
            type="datetime"
            placeholder="Select date and time">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="Set Time">
          <el-date-picker
            v-model="report.endTime"
            type="datetime"
            placeholder="Select date and time">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="Status">
          <el-select v-model="report.status" placeholder="Status">
            <el-option label="Active" value="Active"></el-option>
            <el-option label="Inactive" value="Inactive"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item align="center" header-align="right">
          <el-popconfirm
          confirm-button-text="OK"
          cancel-button-text="No, Thanks"
          :icon="InfoFilled"
          title="Are you sure to Update this?"
        >
          <template #reference>
            <el-button type="success">Update</el-button>
          </template>
        </el-popconfirm>
           <el-button type="" class="btnCancel">Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { reactive, ref } from 'vue'
import { mapMutations } from 'vuex'

export default {
  name: 'EditReportDialog',
  props: {
    dialogVisible: {
      type: Boolean,
    },
    report: {
        type: Object,
    }
  },
  data() {
    return {
      title: 'Edit Report Dialog',
        store: useStore(),
    }
  },

  mounted() {},
  methods: {
    handleClose() {
      this.$emit('close')
    },
    ...mapMutations(['setReports']),
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