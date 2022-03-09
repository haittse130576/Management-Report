<template>
  <div>
    <el-dialog
      :title="title"
      v-model="dialogVisible"
      :before-close="handleClose"
      width="40%"
      @close="handleClose"
    >
      <el-form
        :model="dataTable"
        ref="form"
        label-width="100px"
        :inline="false"
        size="normal"
      >
        <el-form-item label="Report Name">
          <el-input v-model="dataTable.reportName"></el-input>
        </el-form-item>
        <el-form-item label="Activity time">
          <el-col :span="11">
            <el-date-picker
              v-model="form.date1"
              type="date"
              placeholder="Pick a date"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
          <el-col :span="2" class="text-center">
            <span class="text-gray-500">-</span>
          </el-col>
          <el-col :span="11">
            <el-time-picker
              v-model="form.dsate2"
              placeholder="Pick a time"
              style="width: 100%"
            ></el-time-picker>
          </el-col>
        </el-form-item>

        <el-form-item align="center" header-align="right">
          <el-popconfirm
            confirm-button-text="Yes"
            cancel-button-text="No, thanks"
            :icon="InfoFilled"
            title="Are you sure to create this?"
            @confirm="confirmEvent"
            @cancel="cancelEvent"
          >
            <template #reference>
              <el-button type="primary" @click="onSubmit">Create</el-button>
            </template>
          </el-popconfirm>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { reactive, ref } from 'vue'

export default {
  

  

  name: 'CreateNewReportDialog',
  props: {
    dialogVisible: {
      type: Boolean,
    },
  },
  data() {
    return {
      title: 'Create New Report Dialog',

      dataTable: [
        {
          reportName: '',
          timeSetup: '',
        },
      ],
      form: [
        {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
        },
      ],
    }
  },

  mounted() {},
  methods: {
    handleClose() {
      this.$emit('close')
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