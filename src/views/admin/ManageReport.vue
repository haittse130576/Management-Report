<template>
  <div>
    <div text-align="right">
      <el-button type="primary" @click="onEdit">Create New Report</el-button>
    </div>
    <div class="mt-2 card bg-default">
      <div class="table-responsive">
        <el-table
          ref="tableRef"
          :data="reports"
          style="width: 100%"
          stripe
          v-loading="loading"
        >
          <el-table-column
            type="index"
            label="No."
            width="50"
            border
            header-align="center"
            align="center"
          />
          <el-table-column
            prop="title"
            align="center"
            label="Report Name"
            header-align="center"
          />
          <el-table-column
            prop="endTime"
            align="center"
            label="Time End"
            header-align="center"
            :formatter="dateFormat"
          />
          <el-table-column
            prop="startTime"
            align="center"
            label="Start Time"
            header-align="center"
            :formatter="dateFormat"
          />
          <el-table-column
            prop="status"
            label="Status"
            header-align="center"
            align="center"
          >
            <template #default="scope">
              <el-tag
                :type="scope.row.status === 'Active' ? 'success' : 'danger'"
                >{{ scope.row.status }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column
            label="Operations"
            header-align="center"
            align="center"
          >
            <template #default="scope">
              <el-button
                size="small"
                @click="handleEdit(scope.$index, scope.row.id)"
                >Edit</el-button
              >
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row.id)"
                >Delete</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <create-new-report
      :dialogVisible="dialogVisible"
      @close="handleCreateReportDialogClose"
    />
    <edit-report
      :dialogVisible="dialogVisibleEdit"
      @close="handleEditReportClose"
    />
  </div>
</template>
<script >
import CreateNewReport from './CreateNewReport.vue'
import { ref } from 'vue'
import { mapGetters, mapActions, useStore, mapState } from 'vuex'
import moment from 'moment'
import EditReport from './EditReport.vue'

export default {
  name: 'ManageReport',
  components: {
    CreateNewReport,
    EditReport,
  },
  data() {
    return {
      dialogVisible: false,
      dialogVisibleEdit: false,
      store: useStore(),
      form: {
        fullname: '',
        email: '',
      },
    }
  },
  computed: {
    ...mapState('report', {
      reports: (state) => state.reports,
    }),
  },
  methods: {
    onEdit() {
      this.dialogVisible = true
    },
    handleCreateReportDialogClose() {
      this.dialogVisible = false
    },
    async handleEdit(index, row) {
      let reportId = row
      this.reports = await this.store.dispatch('report/getReportById', reportId)
      this.dialogVisibleEdit = true
    },
    handleEditReportClose() {
      this.dialogVisibleEdit = false
    },
    handleDelete(index, row) {
      var id = row.id
      console.log(id)
      this.$confirm(
        'This will permanently update the report. Continue?',
        'Warning',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        },
      )
        .then(async () => {
          await this.store.dispatch('report/delete', id)
          this.$message({
            type: 'success',
            message: 'Update completed',
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: 'Update canceled',
          })
        })
    },
    async init() {
      await this.store.dispatch('report/getReportsAction')
    },
    dateFormat(row, column) {
      var date = row[column.property]
      if (date == undefined) {
        return ''
      }
      return moment(date).format('DD-MM-YYYY - hh:mm')
    },
  },
  mounted() {
    this.init()
  },
}
</script>
<style lang="scss">
</style>