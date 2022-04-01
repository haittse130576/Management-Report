<template>
  <CRow>
    <template v-for="groupItem in this.groups" :key="groupItem.id">
      <CCol :xs="12">
        <CCard class="mb-4">
          <CCardHeader>
            <strong>
              <b>{{ groupItem.projectName }}</b></strong
            >
          </CCardHeader>
          <CCardBody>
            <small>{{ groupItem.year }} - {{ groupItem.semester }}</small>
            <CAccordion>
              <CAccordionItem :item-key="1" >
                <CAccordionHeader @click="mark(groupItem.id)"
                  >Evaluation
                </CAccordionHeader>
              </CAccordionItem>
              <CAccordionItem>
                <CAccordionHeader>List Report </CAccordionHeader>
                <CAccordionBody>
                  <template v-for="item in this.reports" :key="item.id">
                    <CListGroup :item-key="2">
                      <CListGroupItem @click="reportDir(groupItem,item)">
                        <div class="row">
                          <div class="col">
                            <CAccordionBody>{{ item.title }}</CAccordionBody>
                          </div>
                          <div class="col">
                            <CAccordionBody class="d-flex flex-row-reverse"
                              >Due:
                              {{ dateFormat(item.endTime) }}</CAccordionBody
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
    </template>
  </CRow>
</template>

<script>
import { useRouter } from 'vue-router'
import { mapGetters, mapActions, useStore, mapState } from 'vuex'
import moment from 'moment'
export default {
  name: 'Student Home',
  data() {
    return {
      groups: [],
      store: useStore(),
      listReports: [],
    }
  },
  computed: {
    ...mapState('report', {
      reports: (state) => state.reports,
    }),
  },
  methods: {
    async projectList() {
      let result = await this.store.dispatch(
        'group/getGroupByAccountAction',
        user.account.email,
      )
      this.groups = result.data.data
      console.log(this.groups)
      await this.store.dispatch('report/getReportsAction')
      console.log(this.reports)
    },

    mark(val) {
      const router = useRouter()
      const obj = val
      console.log('group ID is:' + obj)
      this.$router.push({ name: 'ScoresView', params: { obj } })
    },
    
    async reportDir(groupItem,item) {
      console.log('report',item)
            console.log('group',groupItem)
      const query = {
        groupId: groupItem.id,
        reportId: item.id,
      }
      
      console.log(query)
      await this.store.dispatch(
        'submit/getSubmitByReportAndProject',
        query
      )

      this.$router.push({ path: '/user/submit'})
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