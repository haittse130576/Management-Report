<template>
  <div class="container py-5 h-100" :style="style">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="card shadow-2-strong" style="border-radius: 1rem">
          <div class="card-body p-5 text-center">
            <h3 class="mb-5">Sign in</h3>

            <button
              @click="login"
              class="btn btn-lg btn-block btn-primary"
              style="background-color: #dd4b39"
              type="submit"
            >
              <i class="fab fa-google me-2"></i> Sign in with google
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import background from '@/assets/images/fpt_background.jpg'
import { useStore } from 'vuex'
export default {
  name: 'Login',
  setup() {
    const router = useRouter()
    const store = useStore()
    const auth = getAuth()
    const provider = new GoogleAuthProvider()
    const style = `background-image:url(${background})`
    const login = () => {
      signInWithPopup(auth, provider).then(async (result) => {
        const email = result.user.email
        if (!email.toLowerCase().includes('@fpt.edu.vn')) {
          alert('Use FPT email to login again')
          router.push('/login')
        } else {
          const res = await store.dispatch('auth/login', { email: email })
          var test = JSON.parse(sessionStorage.getItem("USER"))
          console.log('sesssss');
          console.log(test);
          // router.push('/')
          if (res.status === 'success') {
            var roleId = res.data.roleId
            switch (roleId) {
              case 1:
                router.push('/admin/dashboard')
                break
              case 2:
                router.push('/admin/dashboard')
                break
              case 3:
                router.push('/user/home')
                break
              case 4:
                router.push('/user/home')
                break
              default:
                router.push('/login')
            }
          }
        }
      })
    }

    return {
      login,
      style,
    }
  },
}
</script>
<style lang="scss">
</style>
