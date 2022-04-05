import http from '../http-common'

const mark = {
  namespaced: true,
  state: {
    students: [],
    mark: {},
    student: {
      id: '',
      accountId: '',
      report1: '',
      report2: '',
      report3: '',
      report4: '',
      report5: '',
      report6: '',
      report7: '',
      status: '',
      final: '',
    },
    marks: [],
  },
  getters: {
    getStudents(state) {
      return state.students
    },
    getStudent(state) {
      return state.student
    },
    getMarks(state) {
      return state.marks
    },
  },
  mutations: {
    setStudents(state, val) {
      state.students = val
    },
    setStudent(state, val) {
      state.student = val
    },
    setMark(state, val) {
      state.mark = val
    },
    setMarks(state, val) {
      state.marks = val
    },
  },
  actions: {
    async getMarksByGroup(context, groupId) {
      const res = await http.get(`api/marks/get-by-group?groupId=` + groupId)
      if (res.status === 200) {
        context.commit('setStudents', res.data.data)
        return res.data.data
      }
    },
    async updateMark(context, student) {
      const res = await http.put(`api/marks/update`, student)
      return res.data
    },
    async getMarksByGroupId({ commit }, params) {
      const res = await http.get(
        `api/marks/get-by-group?groupId=${params.groupId}&isClosed=${params.isClosed}&roleId=${params.roleId}`,
      )
      if (res && res.data) {
        commit('setMarks', res.data.data)
        commit('setStudents', res.data.data)
        return res.data.data
      }
    },
    async getMarksByAccountId({ commit }, params) {
      const res = await http.get(
        `api/marks/get-by-account?accountId=${params.accountId}`,
      )
      if (res && res.data) {
        commit('setMark', res.data.data)
      }
    },
    async sendMark(context, marks){
      const res = await http.post(`/api/marks/submit-mark`,marks)
      return res
    }
  },
}
export default mark
