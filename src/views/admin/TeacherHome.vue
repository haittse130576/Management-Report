<template>
  <CRow>
    <ul >
      <li v-for="groupItem in this.groups" :key="groupItem.id">
        <CCol :xs="12">
          <CCard class="mb-4">
            <CCardHeader>
              <strong>
                <b>{{ groupItem.projectName }}</b></strong
              >
            </CCardHeader>
            <CCardBody>
              <small>{{ groupItem.year }} - {{groupItem.semester}}</small>
              <CAccordion>
                <CAccordionItem :item-key="1">
                  <CAccordionHeader>Group Members </CAccordionHeader>
                  <CAccordionBody>
                    <CListGroup>
                      <CListGroupItem component="a" href="#" active>
                        Trần Thanh Hài
                      </CListGroupItem>
                      <CListGroupItem component="a" href="#">
                        Lê Vĩnh Đức Mạnh
                      </CListGroupItem>
                      <CListGroupItem component="a" href="#">
                        Kiều Xuân Trường
                      </CListGroupItem>
                      <CListGroupItem component="a" href="#">
                        Đạt Nguyễn
                      </CListGroupItem>
                    </CListGroup>
                  </CAccordionBody>
                </CAccordionItem>
                <CAccordionItem :item-key="2">
                  <CAccordionHeader>List Report </CAccordionHeader>
                  <CAccordionBody>
                    <CListGroup>
                      <CListGroupItem component="a" href="#" active>
                        Report 1
                      </CListGroupItem>
                      <CListGroupItem component="a" href="#">
                        Report 2
                      </CListGroupItem>
                      <CListGroupItem component="a" href="#">
                        Report 3
                      </CListGroupItem>
                      <CListGroupItem component="a" href="#">
                        Report 4
                      </CListGroupItem>
                      <CListGroupItem component="a" href="#">
                        Report 5
                      </CListGroupItem>
                      <CListGroupItem component="a" href="#">
                        Report 6
                      </CListGroupItem>
                      <CListGroupItem component="a" href="#">
                        Report 7
                      </CListGroupItem>
                    </CListGroup>
                  </CAccordionBody>
                </CAccordionItem>
              </CAccordion>
              <div class="text-center"  >
                  <CButton color="primary"  @click="mark(groupItem.id )"
                    >Mark</CButton
                  >
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </li>
    </ul>
  </CRow>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  name: 'Teacher Home',
  data() {
    return {
      groups: [],
      listAccounts: [],
      
    }
  },
  computed: {},
  methods: {
    ...mapActions([
      'getGroupByAccountAction',
      'getAccountByGroupIdAction',
    ]),
    async projectList() {
      //Project
      // let resultP = await this.getProjectsAction()
      // this.projects = resultP.data
      var user = JSON.parse(localStorage.getItem("USER"))
        console.log(user.account.email)
        var mail = "hai"
       let result = await this.getGroupByAccountAction(mail);
       this.groups = result.data.data
      console.log(this.groups)
    },
    
     listStudentInGroup(groupId){
      const result = this.getAccountByGroupIdAction(groupId)
      this.listAccounts = result.data
    
    },
    mark(val)    {
        const router = useRouter()

        const obj = val
        console.log("group ID is:"+obj)
        this.$router.push({ name: 'Scores',params:{obj}})    
        
    }
  },
  mounted() {
    this.projectList()
  },
}
</script>