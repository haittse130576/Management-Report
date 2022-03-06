
import http from '../http-common'
const auth = {
    namespaced: true,
    state: {
        account: {
            email: ''
        }
    },
    getters: {

    },
    mutations: {
        setAccount(state, val) {
            state.account = val
        }
    },
    actions: {
        async login(context, account) {
            const response = await http.post('/api/accounts/login', account)
            if (response.data.status == 'success') {
                var user = response.data.data
                context.commit('setAccount', user)
                sessionStorage.setItem('USER', JSON.stringify(user))   
                return response.data;           
            } else {
                context.commit('setAccount', {})
            }
        }
    }
}
export default auth