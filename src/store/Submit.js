import http from '../http-common'
const submit = {
    namespaced: true,
    state: {
        submits: [],
        submit: {},
        fileURL: ''
    },
    getters: {
        getSubmit(state) {
            return state.submit
        },
        getSubmits(state) {
            return state.submits
        },
        getfileURL(state){
            return state.fileURL
        }
    },
    mutations: {
        setSubmit(state, val) {
            state.submit = val
        },
        setSubmits(state, val) {
            state.submits = val
        },
        setFileURL(state, val){
            state.fileURL = val
        }
    },
    actions: {
        async getSubmitByReportAndProject({commit}, query){
            const response = await http.get(`/api/submits/get-by-report-and-project?reportId=${query.reportId}&groupId=${query.groupId}`
            )
            if (response.data.status === 'success') {
                commit('setSubmit', response.data.data)

            }
            return response.data.data
        }
    }
}
export default submit