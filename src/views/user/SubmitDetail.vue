<template >
  <div class="report-page">
    <CCard>
      <div class="m-3">
        <div class="row flex-row">
          <section class="col-9">
            <h1 class="font-bold text-uppercase fs-3">Project Name</h1>
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
                  {{dateFormat(submit.endTime)}}
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
                {{submit.reportUrl}}
                <CInputGroup>
                  
                  <CFormInput
                    type="file"
                    id="inputGroupFile04"
                    aria-describedby="inputGroupFileAddon04"
                    aria-label="Upload"
                    @change="onChangeFile"
                  />
                </CInputGroup>
              </el-descriptions-item>
            </el-descriptions>
            <div class="d-grid gap-2 d-md-flex justify-content-md-center">
              <CButton
              class="me-md-2"
                type="button"
                color="danger"
                variant="outline"
                id="inputGroupFileAddon04"
                @click="onCancel"
                >Cancel</CButton
              >

              <CButton
                type="button"
                color="primary"
                variant="outline"
                id="inputGroupFileAddon04"
                @click="onSubmit"
                >Submit</CButton
              >
            </div>
          </div>
        </div>
      </div>
    </CCard>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import moment from 'moment'
export default {
  name: 'Submission', 
   data() {
    return {
    }
  },
  computed: {
    ...mapState('submit', {
      submit: (state) => state.submit,
    }),
  },
  methods: {
    async projectList() {
     
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