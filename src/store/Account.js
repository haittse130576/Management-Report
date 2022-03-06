import axios from "axios"
import http from '../http-common'
const account = {
    state: {
        accounts: [],
        accountResult:{},
        accountDetail:{}
    },
    getters: {
        getAccounts(state) {
            return state.accounts
        },
        getAccountResult(state){
            return state.accountResult
        },
        getAccountDetail(state){
            return state.accountDetail
        }
    },
    mutations: {
        setAccounts(state, val) {
            state.accounts = val
        },
        setAccountResult(state, res){
            state.accountResult = res
        },
        setAccountDetail(state, res){
            state.accountDetail = res
        }
    },
    actions: {
        async getAccountsAction(context) {
            const response = await axios.get('/api/accounts')
            context.commit('setAccounts', response.data)
            return response
        },
        // async loginAction(context, user) {
        //     let dto = {
        //         email: user.email,
        //         password: user.password
        //     }
        //     const response = await axios.post('/api/accounts/login', dto)
        //     console.log(response);
        //     return response
        // },
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
            context.commit('setAccountResult', response.data.data)
            console.log(response);
            return response
        },
        async getAccountByEmail(context, email){
            const response = await http.get(`/api/accounts/detail/${email}`)
            if(response.data.status === 'success'){
                context.commit('setAccountDetail', response.data)
            }
            return response.data
        }
    }

}
export default account