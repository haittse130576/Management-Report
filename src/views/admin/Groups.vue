<template>
  <div class="admin-group">
    <CInputGroup>
      <CFormInput
        type="file"
        id="inputGroupFile04"
        aria-describedby="inputGroupFileAddon04"
        aria-label="Upload"
        @change="onChangeFile"
      />
      <CButton
        type="button"
        color="secondary"
        variant="outline"
        id="inputGroupFileAddon04"
        @click="onSubmit"
        >Submit</CButton
      >
    </CInputGroup>
  </div>
</template>
<script>
// import {
//   getStorage,
//   ref,
//   uploadBytesResumable,
//   getDownloadURL,
// } from 'firebase/storage'
import {ref} from 'vue'
import useStorate from '@/useStorage'
export default {
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
}
</script>
<style lang="scss">
</style>