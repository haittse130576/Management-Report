import http from '../http-common'

const group = {
    namespaced: true,
    state: () => ({
        group: {
            id: '',
            semester: '',
            year: '',
            projectId: '',
            groupCode: ''
        },
        groups: []
    }),
    getters: {
        getGroup(state) {
            console.log('getter: ' + state.group.id);
            return state.group
        }
    },
    mutations: {
        setGroup(state, val) {
            state.group = val
        },
        setGroups(state, val) {
            state.groups = val
        }
    },
    actions: {
        async getGroupById({state, commit}) {
            const res = await http.get(`api/groups/${state.group.id}`)
            const data = res.data.data
            commit('setGroup', data)
        },
        async searchGroup({ commit }, param) {
            const res = await http.get('api/groups/search', {
                Semester: param.semester,
                GroupCode: param.groupCode,
                PageSize: param.pageSize,
                PageNumber: param.pageNumber
            })
            if (res.status === 200) {
                commit('setGroups', res.data.data.items)
                return res.data.data
            }

        },
        async insertGroup(context, group) {
            const res = await http.post('api/groups', {
                semester: group.semester,
                year: group.year,
                projectId: group.projectId,
                groupCode: groupCode
            })
        },
        async updateGroup(context, group) {
            const res = await http.put(`api/groups/${group.id}`, {
                id: group.id,
                semester: group.semester,
                year: group.year,
                projectId: group.projectId,
                groupCode: group.groupCode
            })
            if (res.status === 200) {

            }
        }
    }
}
export default group