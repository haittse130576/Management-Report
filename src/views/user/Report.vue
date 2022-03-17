<template>
  <div>
    <a @click="onSubmit">
      <DocsExample v-for="report in reports" :key="report">
        <CCard>
          <CCardHeader>{{ report.title }}</CCardHeader>
          <CCardBody>
            <CCardTitle>Start: {{ report.startTime }}</CCardTitle>
          </CCardBody>
          <CCardBody>
            <CCardTitle>End: {{ report.endTime }}</CCardTitle>
          </CCardBody>
        </CCard>
      </DocsExample>
    </a>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['getReports', 'getListReports']),
    reports: {
      get() {
        return this.getReports
      },
    },
  },
  methods: {
    ...mapActions(['getReportsAction']),
    async init() {
      await this.getReportsAction()
    },
  },
  mounted() {
    this.init()
  },
  // dateFormat(row, column) {
  //     var date = row[column.property];
  //     if (date == undefined) {
  //       return "";
  //     }
  //     return moment(date).format("hh:mm:ss [At] YYYY-MM-DD");
  //   },
}
</script>
<style >
a:link {
  color: black;
}
</style>