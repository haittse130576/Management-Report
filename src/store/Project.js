import http from '../http-common'

const project = {
    namespaced : true,
    state:{
        projects:[]
    },
    mutations:{
        setProjects(state, val){
            state.projects = val
        }
    },
    actions:{
        async search({commit}){
            const response = await http.get('/api/projects/search')
            if(response.data.status === 'success'){
                commit('setProjects', response.data.data)
                
            }
            return response.data.data
        },
        async insert(context, project){
            const response = await http.post('/api/projects/add', project)
            return response.data
        },
        async update(context, project){
            const res = await http.put(`api/projects/update/${project.id}`, project)
            return res.data
        },
        async inactive(context, id){
            const res = await http.put(`api/projects/update/${project.id}`)
            return res.data
        }
    }
}
export default project