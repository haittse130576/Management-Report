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
                {{ submit.projectName }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <div class="cell-item">Report Name</div>
                </template>
                {{ submit.reportName }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <div class="cell-item">Due date</div>
                </template>
                {{ dateFormat(submit.endTime) }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <div class="cell-item">Last modified</div>
                </template>
                {{ dateFormat(submit.submitTime) }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <div class="cell-item">File submissions</div>
                </template>
                
              </el-descriptions-item>
            </el-descriptions>
            <div class="d-grid gap-2 d-md-flex justify-content-md-center">
              <CButton
                type="button"
                color="primary"
                variant="outline"
                id="commentBtn"
                @click="onSubmit"
                >Comment</CButton
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
import { computed, ref } from 'vue'
import moment from 'moment'
export default {
  name: 'Submit',
  data() {
    return {}
  },
  computed: {
    ...mapState('submit', {
      submit: (state) => state.submit,
    }),
  },
  methods: {
    async projectList() {},

    dateFormat(date) {
      if (date == undefined) {
        return ''
      }
      return moment(date).format(' DD-MM-YYYY - hh:mm')
    },
    },
    setup() {
    const file = ref(null)
    const {uploadFile} = useStorate()
    function onChangeFile(event) {
      const selected = event.target.files[0]
      if (selected) {
        file.value = selected
        console.log(file.value)
      } else {
        console.log(file)
      }
    }
    function onSubmit() {
      if(file.value) uploadFile(file.value)
    }
    return {
      onChangeFile,
      onSubmit
    }
  },

  mounted() {
    this.projectList()
  },
}
</script>
<style lang="">
</style>