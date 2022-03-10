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
                    v-model="account.email"
                    @keydown.prevent
                  />
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-user" />
                  </CInputGroupText>
                  <CFormInput
                    placeholder="FullName"
                    v-model="account.fullname"
                    autocomplete="fullname"
                  />
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-calendar" />
                  </CInputGroupText>
                  <el-date-picker
                    placeholder="Date of Birth"
                    v-model="account.birthday"
                    autocomplete="dateofbirth"
                  ></el-date-picker>
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-location-pin" />
                  </CInputGroupText>
                  <CFormInput
                    placeholder="Address"
                    v-model="account.address"
                    autocomplete="address"
                  />
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-bell" />
                  </CInputGroupText>
                  <CFormInput
                    placeholder="Phone Number"
                    v-model="account.phone"
                    autocomplete="phonenumber"
                  />
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-notes" />
                  </CInputGroupText>
                  <CFormInput
                    placeholder="Student Code"
                    v-model="account.accountCode"
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
export default {
  name: 'Profile',
  data() {
    return {
      account: {},
      currentAccount: {},
    }
  },
  computed: {
    ...mapGetters(['getAccountDetail']),
  },
  methods: {
    ...mapActions(['getAccountByEmail']),
    async profile() {
      var test = 'manhlvdse130605@fpt.edu.vn'
      this.currentAccount = JSON.parse(localStorage.getItem('USER'))
      this.account = this.currentAccount
      console.log(this.account)
    },
    async updateButon() {
      let result = await this.updateProfileAction(this.account)
      console.log(result.data)
    },
  },

  mounted() {
    this.profile()
  },
}
</script>