<template>
  <CRow>
    <ul>
      <li v-for="groupItem in this.groups" :key="groupItem.id">
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
                <CAccordionItem :item-key="1">
                  <CAccordionHeader @click="mark(groupItem.id)"
                    >Mark on Group members
                  </CAccordionHeader>
                </CAccordionItem>
                <CAccordionItem :item-key="2">
                  <CAccordionHeader>List Report </CAccordionHeader>
                  <CAccordionBody>
                    <CListGroup>
                      <CListGroupItem component="a" @click="reportDir(0,groupItem.projectId)" >
                        Report 1
                      </CListGroupItem>
                      <CListGroupItem component="a" @click="reportDir(1,groupItem.projectId)">
                        Report 2
                      </CListGroupItem>
                      <CListGroupItem component="a" @click="reportDir(2,groupItem.projectId)">
                        Report 3
                      </CListGroupItem>
                      <CListGroupItem component="a" @click="reportDir(3,groupItem.projectId)">
                        Report 4
                      </CListGroupItem>
                      <CListGroupItem component="a" @click="reportDir(4,groupItem.projectId)">
                        Report 5
                      </CListGroupItem>
                      <CListGroupItem component="a" @click="reportDir(5,groupItem.projectId)">
                        Report 6
                      </CListGroupItem>
                      <CListGroupItem component="a" @click="reportDir(6,groupItem.projectId)">
                        Report 7
                      </CListGroupItem>
                    </CListGroup>
                  </CAccordionBody>
                </CAccordionItem>
              </CAccordion>
            </CCardBody>
          </CCard>
        </CCol>
      </li>
    </ul>
  </CRow>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  name: 'Teacher Home',
  data() {
    return {
      groups: [],
      listAccounts: [],
      store: useStore()
    }
  },
  computed: {},
  methods: {
    async projectList() {
      var user = JSON.parse(localStorage.getItem('USER'))
      console.log(user.account.email)
      var mail = 'admin'
      let result = await this.store.dispatch(
        'group/getGroupByAccountAction',
        mail,
      )
      this.groups = result.data.data
      console.log(this.groups)
    },

    mark(val) {
      const router = useRouter()
      const obj = val
      console.log('group ID is:' + obj)
      this.$router.push({ name: 'Scores', params: { obj } })
    },
    reportDir(reportId, projectId){
      const router = useRouter()
      const reportObj = {
        reportId : reportId,
        projectId: projectId
      }
      console.log(reportObj.reportId , reportObj.projectId)
      this.$router.push({ path: '/teacher/submit', params: {reportObj} })
    },
  },


  mounted() {
    this.projectList()
  },
}
</script>