<template>
  <div class="user-project">
    <DocsExample v-for="item in items" :key="item" href="#">
      <CCard id="user-projecet">
        <CCardHeader>{{item.reportName}}</CCardHeader>
        <CCardBody>
          <CCardTitle>{{item.reportName}}</CCardTitle>
          <CCardText>
            With supporting text below as a natural lead-in to additional
            content.
          </CCardText>
          <CButton href="#">{{item.reportName}}</CButton>
        </CCardBody>
      </CCard>
    </DocsExample>
  </div>
</template>
<script>
import { ref } from 'vue'
export default {
  setup() {
    const items = [
      {
        reportName: 'Report 1',

      },
    ]
    return {
      items,
    }
  },
}
</script>
<style lang="">
</style>