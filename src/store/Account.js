import http from '../http-common'
const account = {
  namespaced: true,
  state: {
    accounts: [],
    accountResult: {},
    accountDetail: {},
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
  },
  mutations: {
    setAccounts(state, val) {
      state.accounts = val
    },
    setAccountResult(state, res) {
      state.accountResult = res
    },
    setAccountDetail(state, res) {
      state.accountDetail = res
    },
  },
    actions: {       
        async searchListAccounts(context, search){
            const response = await http.get('/api/accounts/search',{
                params:{
                    email: search.email,
                    fullname: search.fullname,
                    roleId: search.roleId,
                    status: search.status,
                    pageNumber:search.pageNumber,
                    pageSize: search.pageSize
                }
            })
            if(response && response.data){
                context.commit('setAccounts', response.data.data.items)
                context.commit('setAccountResult', response.data.data)
            }
            
            return response
        },
        async getAccountByEmail(context, email){
            const response = await http.get(`/api/accounts/detail`,{params:{email: email}})
            if(response.data.status === 'success'){
                context.commit('setAccountDetail', response.data.data)
            }
            return response.data
            
        },
        async deleteAccountById(context, id){
          const response = await http.delete(`/api/accounts/delete`,{params:{id:id}})
          if(response.data.status === 'success'){
            return response.data
          }
          return response.data
          
      },
        async getAccountByGroup({commit}, groupCode){
            const res = await http.get(`api/accounts/get-by-group/${groupCode}`)
            if(res && res.data){
                commit('setAccounts',res.data.data)
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
    }

}
export default account
