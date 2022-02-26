<template>
  <div class="user=project">
    <DocsExample v-for="item in items"
    :key="item"
     href="#">
      <CCard>
        <CCardHeader>Report Name</CCardHeader>
        <CCardBody>
          <CCardTitle>Report Name</CCardTitle>
          <CCardText>
            With supporting text below as a natural lead-in to additional
            content.
          </CCardText>
          <CButton href="#">Deadline time.....</CButton>
        </CCardBody>
      </CCard>
    </DocsExample>
  </div>
</template>
<script>
export default {
    setup(){

        return{
            
        }
    }
}
</script>
<style lang="">
</style>