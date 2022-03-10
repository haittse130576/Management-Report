<template>
  <CDropdown variant="nav-item">
    <CDropdownToggle placement="bottom-end" class="py-0" :caret="false">
      <CAvatar :src="avatar" size="md" />
    </CDropdownToggle>
    <CDropdownMenu class="pt-0">
      <CDropdownHeader component="h6" class="bg-light fw-semibold py-2">
        Account
      </CDropdownHeader>
      <CDropdownItem> <CIcon icon="cil-user" /> Profile </CDropdownItem>
      <CDropdownItem @click="logout"> <CIcon icon="cil-lock-locked" /> Logout </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
</template>

<script>
import avatar from '@/assets/images/avatars/8.jpg'
import {useStore} from 'vuex'
export default {
  name: 'AppHeaderDropdownAccnt',
  data(){
    return{
      store: useStore(),
      avatar: avatar,
      itemsCount: 42,
    }
  },
  methods:{
    logout(){
      this.store.dispatch('auth/logout')
      this.$router.push('/login')
    }
  },
}
</script>
