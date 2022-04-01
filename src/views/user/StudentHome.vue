<template>
  <CRow>
    <CCol :xs="12" v-for="groupItem in groups" :key="groupItem.id">
      <CCard class="mb-4">
        <CCardHeader>
          <strong>
            <b>{{ groupItem.projectName }}</b></strong
          >
        </CCardHeader>
        <CCardBody>
          <small>{{ groupItem.year }} - {{ groupItem.semester }}</small>
          <CAccordion>
            <CAccordionItem>
              <CAccordionHeader>List Report</CAccordionHeader>
              <CAccordionBody>
                <template v-for="item in this.reports" :key="item.id">
                  <CListGroup :item-key="2">
                    <CListGroupItem @click="reportDir(groupItem, item)">
                      <div class="row">
                        <div class="col">
                          <CAccordionBody>{{ item.title }}</CAccordionBody>
                        </div>
                        <div class="col">
                          <CAccordionBody class="d-flex flex-row-reverse"
                            >Due: {{ dateFormat(item.endTime) }}</CAccordionBody
                          >
                        </div>
                      </div>
                    </CListGroupItem>
                  </CListGroup>
                </template>
              </CAccordionBody>
            </CAccordionItem>
          </CAccordion>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import { useStore, mapState } from 'vuex'
import moment from 'moment'
export default {
  name: 'Student Home',
  data() {
    return {
      store: useStore(),
      listReports: [],
    }
  },
  computed: {
    ...mapState('report', {
      reports: (state) => state.reports,
    }),
    ...mapState('group', {
      groups: (state) => state.groups,
    }),
  },
  methods: {
    async projectList() {
      var user = JSON.parse(localStorage.getItem('USER'))
      if (user && user.account.roleId == 4) {
        await this.store.dispatch(
          'group/getGroupByAccountAction',
          user.account.email,
        )
        await this.store.dispatch('report/getReportsAction')
      } else {
        this.$router.push('/login')
      }
    },

    async reportDir(groupItem, item) {
      const query = {
        groupId: groupItem.id,
        reportId: item.id,
      }
      await this.store.dispatch('submit/getSubmitByReportAndProject', query)
      await this.store.dispatch('report/getReportById', item.id)
      this.$router.push({ path: '/user/project' })
    },
    dateFormat(date) {
      if (date == undefined) {
        return ''
      }
      return moment(date).format(' DD-MM-YYYY - hh:mm')
    },
  },

  mounted() {
    this.projectList()
  },
}
</script>
