import http from '../http-common'
const submit = {
  namespaced: true,
  state: {
    submits: [],
    submit: {},
    fileURL: '',
  },
  getters: {
    getSubmit(state) {
      return state.submit
    },
    getSubmits(state) {
      return state.submits
    },
    getFileURL(state) {
      return state.fileURL
    },
  },
  mutations: {
    setSubmit(state, val) {
      state.submit = val
    },
    setSubmits(state, val) {
      state.submits = val
    },
    setFileURL(state, val) {
      state.fileURL = val
      console.log('URL', val)
    },
  },
  actions: {
    async getSubmitByReportAndProject({ commit }, query) {
      const response = await http.get(
        `/api/submits/get-by-report-and-project?reportId=${query.reportId}&groupId=${query.groupId}`,
      )
      if (response.data.status === 'success') {
        commit('setSubmit', response.data.data)
      }
      return response.data.data
    },
    async updateSubmit(context, submit) {
      const response = await http.put(`api/submits/${submit.id}`, submit)
      return response
    },
  },
}
export default submit
