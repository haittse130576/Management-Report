<template>
  <div class="card bg-default">
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
              {{ submitForm.projectName }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">Report Name</div>
              </template>
              {{ submitForm.reportName }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">Due date</div>
              </template>
              {{ dateFormat(report.endTime) }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">Last modified</div>
              </template>
              {{ dateFormat(submitForm.submitTime) }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">File submissions</div>
              </template>
              <input type="file" @change="UploadFile" />
            </el-descriptions-item>
          </el-descriptions>
          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <el-form
              :model="submitForm"
              ref="form"
              label-width="80px"
              :inline="false"
              size="normal"
            >
              <el-form-item size="normal">
                <el-button type="primary" size="default" @click="onSubmit"
                  >Submit</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, useStore } from 'vuex'
import moment from 'moment'
import useStorage from '../../useStorage'
const { uploadFile, fileURL } = useStorage()
export default {
  name: 'Submission',
  data() {
    return {
      store: useStore(),
      firebase: useStorage(),
    }
  },
  computed: {
    ...mapState('submit', {
      submit: (state) => state.submit,
    }),
    ...mapState('report', {
      report: (state) => state.report,
    }),
    submitForm: {
      get() {
        return this.submit
      },
      set(value) {
        this.store.commit('submit/setSubmit', value)
      },
    },
  },
  methods: {
    dateFormat(date) {
      if (date == undefined) {
        return ''
      }
      return moment(date).format(' DD-MM-YYYY - hh:mm')
    },
    UploadFile(event) {
      console.log('Upload file,', event)
      this.file = event.target.files[0]

      if (this.file) {
        uploadFile(this.file)
      }
      console.log('File', fileURL)
    },
    async onSubmit() {
      const reportUrl = sessionStorage.getItem('downloadURL')
      if (reportUrl) {
        // downloadURL = JSON.parse(reportUrl)
        this.submitForm.reportUrl = reportUrl
        this.submitForm.submitTime = new Date()
        console.log('---',this.submitForm);
        const res = await this.store.dispatch(
          'submit/updateSubmit',

          this.submitForm,
        )
        if (res && res.data.status === 'success') {
          this.$message('Successfully!!!')
        } else {
          this.$alert('Error!')
        }
      }
    },
  },
  mounted() {},
}
</script>
<style lang=""></style>
