import axios from "axios"
const accounts = {
    state: {
        accounts: []
    },
    getters: {
        getAccounts: (state) => {
            return state.accounts
        }
    },
    mutations: {
        setAccounts(state, val) {
            state.accounts = val
        }
    },
    actions: {
        async getAccountsAction(context) {
            const response = await axios.get('/api/accounts')
            if (response.data != null) {
                context.commit('setAccounts', response.data)
            }
            return response

        }
    }

}
export default accounts