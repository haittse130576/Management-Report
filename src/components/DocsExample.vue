<template>
  <div class="example">
    <CNav variant="tabs">
      <CNavItem>
        <CNavLink active>
          Submit File
        </CNavLink>
      </CNavItem>
      <!-- <CNavItem>
        <CNavLink href="#/dashboard" active>
          Submit File
        </CNavLink>
      </CNavItem> -->
    </CNav>
    <CTabContent class="rounded-bottom">
      <CTabPane class="p-3 preview" visible>
        <slot></slot>
      </CTabPane>
    </CTabContent>
  </div>
</template>

<script>
export default {
  name: 'DocsExample',
  props: {
    href: {
      type: String,
      default: undefined,
      required: false,
    },
  },
}
</script>
