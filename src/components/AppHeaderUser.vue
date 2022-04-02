<template>
  <CHeader position="sticky" class="mb-4">
    <CContainer fluid>
      <CHeaderBrand class="" href="#/user/home"
        >FPT UNIVERSITY HCM</CHeaderBrand
      >
      <CHeaderNav class="d-none d-md-flex me-auto">
        <CNavItem>
          <CNavLink href="#/user/home"> Home </CNavLink>
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
