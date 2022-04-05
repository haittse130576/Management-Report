import http from '../http-common'
const account = {
  namespaced: true,
  state: {
    accounts: [],
    accountResult: {},
    accountDetail: {},
    members: {},
  },
  getters: {
    getAccounts(state) {
        return state.accounts
    },
    getAccountResult(state) {
      return state.accountResult
    },
    getAccountDetail(state) {
      return state.accountDetail
    },
    getMembers(state) {
      return state.members
    },
  },
  mutations: {
    setAccounts(state, val) {
      const user = localStorage.getItem('USER')
      if(user){
        const userObj = JSON.parse(user).account
        const accountTmp = val?.filter(item => item.id != userObj.id)
        state.accounts = accountTmp
      }
      
    },
    setAccountResult(state, res) {
      state.accountResult = res
    },
    setAccountDetail(state, res) {
      state.accountDetail = res
    },
    setMembers(state, val) {
      state.members = val
    },
  },
  actions: {
    async searchListAccounts(context, search) {
      const response = await http.get('/api/accounts/search', {
        params: {
          email: search.email,
          fullname: search.fullname,
          roleId: search.roleId,
          status: search.status,
          pageNumber: search.pageNumber,
          pageSize: search.pageSize,
        },
      })
      if (response && response.data) {
        context.commit('setAccounts', response.data.data.items)
        context.commit('setAccountResult', response.data.data)
      }

      return response
    },
    async getAccountByEmail(context, email) {
      const response = await http.get(`/api/accounts/detail`, {
        params: { email: email },
      })
      if (response.data.status === 'success') {
        context.commit('setAccountDetail', response.data.data)
      }
      return response.data
    },
    async deleteAccountById(context, id) {
      const response = await http.delete(`/api/accounts/delete`, {
        params: { id: id },
      })
      if (response.data.status === 'success') {
        return response.data
      }
      return response.data
    },
    async getAccountByGroup({ commit }, groupCode) {
      const res = await http.get(`api/accounts/get-by-group/${groupCode}`)
      if (res && res.data) {
        commit('setAccounts', res.data.data)
        return res.data
      }
    },
    async insertAccount(context, account) {
      const res = await http.post('api/accounts/add', {
        email: account.email,
        password: account.password,
        fullname: account.fullname,
        roleId: account.roleId,
        birthday: account.birthday,
        phone: account.phone,
        address: account.address,
        status: account.status,
        accountCode: account.accountCode,
      })
      return res.data
    },
    async update(context, account) {
      let body = {
        id: account.id,
        email: account.email,
        password: account.password,
        fullname: account.fullname,
        roleId: account.roleId,
        birthday: account.birthday,
        phone: account.phone,
        address: account.address,
        status: account.status,
        accountCode: account.accountCode,
      }
      const res = await http.put(`api/accounts/update`, body)
      return res.data
    },
    async searchMember({ commit }, searchValue) {
      const response = await http.get(`api/accounts/search-member`, {
        params: searchValue,
      })
      if (response && response.data) {
        commit('setMembers', response.data.data)
      }
    },
    async checkEmailExist(context, email) {
      const res = await http.get(`api/accounts/check-mail-exist`, {
        params: {
          email: email,
        },
      })
      if (res && res.status === 200) {
        return res
      }
    },
    async checkCodeExist(context, accountCode) {
      const res = await http.get(`api/accounts/check-code-exist`, {
        params: {
          accountCode: accountCode,
        },
      })
      if (res && res.status === 200) {
        return res
      }
    },
    async checkMentor({commit}, params){
      const res = await http.get(`api/account-group/check-mentor?accountId=${params.accountId}&semester=${params.semester}&year=${params.year}`)
      return res.data.data
    }
  },
}
export default account
