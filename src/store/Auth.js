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
            const response = await http.post('/api/auth/login', account)
            if (response.data.status == 'success') {
                var user = response.data.data
                localStorage.setItem('USER', JSON.stringify(user))
            }
        },
        logout(context) {
            localStorage.removeItem('USER')
            useRouter().push('/login')
        }
    }
}
export default auth