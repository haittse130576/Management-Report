<template>
  <CHeader position="sticky" class="mb-4">
    <CContainer fluid>
      <CHeaderBrand v-if="user.account.roleId === 4" href="#/user/home"
        >FPT UNIVERSITY HCM</CHeaderBrand
      >
      <CHeaderBrand
        v-if="user.account.roleId === 3"
        href="#/teacher/teacher-home"
        >FPT UNIVERSITY HCM</CHeaderBrand
      >
      <CHeaderNav class="d-none d-md-flex me-auto">
        <CNavItem>
          <CNavLink v-if="user.account.roleId === 4" href="#/user/home">
            Home
          </CNavLink>
          <CNavLink
            v-if="user.account.roleId === 3"
            href="#/teacher/teacher-home"
          >
            Home
          </CNavLink>
        </CNavItem>
      </CHeaderNav>
      <CHeaderNav>
        <p>{{ user.account.fullname }}</p>
        <AppHeaderDropdownAccnt />
      </CHeaderNav>
    </CContainer>
    <CHeaderDivider />
  </CHeader>
</template>

<script>
import AppBreadcrumb from './AppBreadcrumb'
import AppHeaderDropdownAccnt from './AppHeaderDropdownAccnt'
import { logo } from '@/assets/brand/logo'
export default {
  name: 'AppHeader',
  components: {
    AppBreadcrumb,
    AppHeaderDropdownAccnt,
  },
  setup() {
    const user = JSON.parse(localStorage.getItem('USER'))
    return {
      logo,
      user,
    }
  },
}
</script>
