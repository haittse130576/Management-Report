<template >
  <div class="report-page">
    <CCard>
      <div class="m-3">
        <div class="row flex-row">
          <section class="col-9">
            <h1 class="font-bold text-uppercase fs-3">Report Details</h1>
          </section>
        </div>
        <div class="submission mt-2">
          <div class="submission-info">
            <el-descriptions
              class="margin-top"
              title="Submisstion status"
              :column="1"
              :size="size"
              border
            >
              <el-descriptions-item>
                <template #label>
                  <div class="cell-item">Project Name</div>
                </template>
                {{submit.projectName}}
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <div class="cell-item">Report Name</div>
                </template>
                {{submit.reportName}}
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <div class="cell-item">Due date</div>
                </template>
                  {{dateFormat(report.endTime)}}
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <div class="cell-item">Last modified</div>
                </template>
                {{dateFormat(submit.submitTime)}}
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <div class="cell-item">File submissions</div>
                </template>
                <el-link>{{submit.reportUrl}}</el-link>
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>
      </div>
    </CCard>
  </div>
</template>
<script>
import { mapGetters, mapActions, useStore, mapState } from 'vuex'
import moment from 'moment'
export default {
  name: 'Submission', 
   data() {
    return {
      store: useStore(),
      report: {},
    }
  },
  computed: {
    ...mapState('submit', {
      submit: (state) => state.submit,
    }),
  },
  methods: {
    async projectList() {
     const rep = await this.store.dispatch('report/getReportById',this.submit.reportId)
     this.report = rep
     console.log(this.report)
    },

    dateFormat(date) {
      if (date == undefined) {
        return ''
      }
      return moment(date).format(' DD-MM-YYYY - hh:mm')
    },
  },

  mounted() {
    this.projectList()
  },
}
</script>
<style lang="">
</style>