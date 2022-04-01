import http from '../http-common'
const groups = {
  namespaced: true,
  state: {
    groups: [],
    group: {},
    listAccounts: [],
    groupParams: {},
  },
  getters: {
    getGroups: (state) => {
      return state.groups
    },
    getGroup: (state) => {
      var group = state.group
      if (state.group.year && state.group.projectId) {
        group = {
          id: state.group.id,
          groupCode: state.group.groupCode,
          semester: state.group.semester,
          year: state.group.year.toString(),
          projectId: state.group.projectId.toString(),
          projectName: state.group.projectName,
        }
      }
      return group
    },
    getListAccounts: (state) => {
      return state.listAccounts
    },
  },
  mutations: {
    setGroups(state, val) {
      state.groups = val
    },
    setGroup(state, val) {
      state.group = val
    },
    setListAccounts(state, val) {
      state.listAccounts = val
    },
    setGroupParams(state, group) {
      state.groupParams = {
        semester: group.semester,
        year: group.year,
        projectId: group.projectId,
        groupCode: group.groupCode,
        mentorId: group.mentor.id,
        leaderId: group.leader.id,
        members: group.members.map((member) => member.id),
      }
    },
  },
  actions: {
    async getGroupsAction(context) {
      const response = await http.get('/api/groups')
      if (response.data != null) {
        context.commit('setGroups', response.data.data)
      }
      return response
    },

    async getGroupByIdAction(context, id) {
      try {
        if (id) {
          const response = await http.get('/api/groups/' + id)
          if (response.status === 200) {
            context.commit('setGroup', response.data.data)
          }
          return response
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getGroupByAccountAction(context, email) {
      const response = await http.get(
        '/api/groups/get-by-account?email=' + email,
      )
      if (response.status === 200) {
        context.commit('setGroups', response.data.data)
      }
      return response
    },
    async getAccountByGroupIdAction(context, groupId) {
      try {
        if (groupId) {
          const response = await http.get(
            '/api/account-group/find-by-group-id?groupId=' + groupId,
          )
          if (response.status === 200) {
            context.commit('setListAccounts', response.data)
          }
          return response
        }
      } catch (error) {
        console.log(error)
      }
    },
    async searchGroup({ commit }, params) {
      const res = await http.get(`api/groups/search`, {
        params: params,
      })
      if (res && res.status === 200) {
        if (res.data.data) {
          return res.data.data
        }
      }
      return null
    },
    async insertGroup({ state }) {
      const body = state.groupParams
      const res = await http.post(`api/groups/insert`, body)
      if (res && res.status === 200) {
        return res
      }
    },
    async checkGroupCodeExist(context, groupCode) {
      const res = await http.get(`api/groups/check-exist`, {
        params: {
          groupCode: groupCode,
        },
      })
      if (res && res.status === 200) {
        return res
      }
    },
  },
}
export default groups
