<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="9" :lg="7" :xl="6">
          <CCard class="mx-4">
            <CCardBody class="p-4">
              <CForm>
                <h1>Your Profile</h1>
                <p class="text-medium-emphasis">Update your account</p>
                <CInputGroup class="mb-3">
                  <CInputGroupText>@</CInputGroupText>
                  <CFormInput
                    placeholder="Email"
                    v-model="currentAccount.email"
                    @keydown.prevent
                  />
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-user" />
                  </CInputGroupText>
                  <CFormInput
                    placeholder="FullName"
                    v-model="currentAccount.fullname"
                    autocomplete="fullname"
                  />
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-calendar" />
                  </CInputGroupText>
                  <el-date-picker
                    placeholder="Date of Birth"
                    v-model="currentAccount.birthday"
                    autocomplete="dateofbirth"
                  ></el-date-picker>
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-location-pin" />
                  </CInputGroupText>
                  <CFormInput
                    placeholder="Address"
                    v-model="currentAccount.address"
                    autocomplete="address"
                  />
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-bell" />
                  </CInputGroupText>
                  <CFormInput
                    placeholder="Phone Number"
                    v-model="currentAccount.phone"
                    autocomplete="phonenumber"
                  />
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-notes" />
                  </CInputGroupText>
                  <CFormInput
                    placeholder="Student Code"
                    v-model="currentAccount.accountCode"
                    @keydown.prevent
                  />
                </CInputGroup>
                <!-- <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-lock-locked" />
                  </CInputGroupText>
                  <CFormInput
                    type="password"
                    v-model="account.password"
                    placeholder="Password"
                  />
                </CInputGroup> -->
                <div class="d-grid">
                  <CButton color="success" @click="updateButon()"
                    >Update Profile</CButton
                  >
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions, mapGetters, mapState } from 'vuex'
import { inputProps } from 'element-plus'
import { CForm } from '@coreui/vue'
export default {
  name: 'Profile',
  data() {
    return {
      currentAccount: {},
    }
  },
  computed: {
  },
  methods: {
    ...mapActions(['updateProfileAction']),
    async profile() {
      var test = 'manhlvdse130605@fpt.edu.vn'
      let temp = JSON.parse(localStorage.getItem('USER'))
      this.currentAccount = temp.account
      console.log(this.currentAccount)
    },
    async updateButon() {
      
      let result = await this.updateProfileAction(this.currentAccount)
      console.log(result.data)
    },
  },

  mounted() {
    this.profile()
  },
}
</script>