import axios from "axios"
import http from '../http-common'
const account = {
    state: {
        accounts: [],
        accountResult:{}
    },
    getters: {
        getAccounts(state) {
            return state.accounts
        },
        getAccountResult(state){
            return state.accountResult
        }
    },
    mutations: {
        setAccounts(state, val) {
            state.accounts = val
        },
        setAccountResult(state, res){
            state.accountResult = res
        }
    },
    actions: {
        async getAccountsAction(context) {
            const response = await axios.get('/api/accounts')
            context.commit('setAccounts', response.data)
            return response
        },
        async loginAction(context, user) {
            let dto = {
                email: user.email,
                password: user.password
            }
            const response = await axios.post('/api/accounts/login', dto)
            console.log(response);
            return response
        },
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
        }
    }

}
export default account