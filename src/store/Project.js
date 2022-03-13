import http from '../http-common'
const project = {
    namespaced: true,
    state: {
        projects: [],
        project: {
            id: '',
            projectName: '',
            description: '',
            status: ''
        }
    },
    getters: {
        getProject(state) {
            return state.project
        },
        getProjects(state) {
            var result = state.projects.map(project =>project = {
                id : project.id.toString(),
                description: project.description,
                projectName: project.projectName,
                status :project.status
            })
            
            console.log('projects', result);
            return result
        }
    },
    mutations: {
        setProjects(state, val) {
            state.projects = val
            console.log('state', state.projects);
        },
        setProject(state, val) {
            state.project = val
        }
    },
    actions: {
        async search({ commit }, search) {
            console.log(search);
            const response = await http.get('/api/projects/search', {
                params: {
                    projectName: search.projectName,
                    pageNumber: search.pageNumber,
                    status: search.status,
                    pageSize: search.pageSize
                }

            })
            if (response.data.status === 'success') {
                commit('setProjects', response.data.data)

            }
            return response.data.data
        },
        async insert(context, project) {
            const response = await http.post('/api/projects/add', project)
            return response.data
        },
        async update(context, project) {
            const res = await http.put(`api/projects/update/${project.id}`, project)
            return res.data
        },
        async inactive(context, id) {
            const res = await http.put(`api/projects/inactive/${id}`, {})
            return res.data
        },
        async getProjectById({ commit }, id) {
            const res = await http.get(`api/projects/${id}`)
            if (res.status === 200) {
                commit('setProject', res.data.data)
                return res.data.data
            }

        },
        async getActiveProject({commit}){
            const res = await http.get(`api/projects/get-active`)
            if(res && res.data){
                commit('setProjects', res.data.data)
                return res.data.data
            }else{
                commit('setProjects',{})
                return null
            }
        }
    }
}
export default project