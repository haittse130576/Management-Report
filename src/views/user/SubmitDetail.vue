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
                kooriookami
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <div class="cell-item">Report Name</div>
                </template>
                Report 1
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <div class="cell-item">Due date</div>
                </template>
                18/5/2022 23:59 PM
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <div class="cell-item">Last modified</div>
                </template>
                18/5/2022 23:59 PM
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <div class="cell-item">File submissions</div>
                </template>
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
import { ref } from 'vue'
import useStorate from '@/useStorage'
export default {
  setup() {
    const file = ref(null)
    const reportName = ref('report_1')
    const { uploadFile } = useStorate(reportName)
    function onChangeFile(event) {
      const selected = event.target.files[0]
      if (selected) {
        file.value = selected
      } else {
        console.log(file)
      }
    }
    function onSubmit() {
      if (file.value) uploadFile(file.value)
    }

    return {
      onChangeFile,
      onSubmit,
    }
  },
}
</script>
<style lang="">
</style>