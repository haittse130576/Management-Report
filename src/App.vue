<template>
  <router-view />
</template>
<script>
import { onBeforeMount, ref } from 'vue-demi'
import { useRoute, useRouter } from 'vue-router'
import {getAuth, onAuthStateChanged, signOut} from 'firebase/auth'
export default {
  setup(){
    const router = useRouter()
    const route = useRoute()
    const isLogin = ref(false)
    let auth
    onBeforeMount(() =>{
      auth = getAuth()
      onAuthStateChanged(auth, (user)=>{
        if(user){
          isLogin.value = true
        }else{
          isLogin.value = false
        }
      })
    })
  }
}
</script>
<style lang="scss">
// Import Main styles for this application
@import 'styles/style';
</style>
