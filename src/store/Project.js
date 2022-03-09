import http from '../http-common'

const project = {
    namespaced : true,
    state:{
        projects:[],
        project:{
            id:'',
            projectName:'',
            description:'',
            status:''
        }
    },
    getters:{
        getProject(state){
            return state.project
        }
    },
    mutations:{
        setProjects(state, val){
            state.projects = val
        },
        setProject(state, val){
            state.project = val
            console.log(state.project);
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
            const res = await http.put(`api/projects/inactive/${id}`,{})
            return res.data
        },
        async getProjectById({commit}, id){
            const res = await http.get(`api/projects/${id}`)
            if(res.status === 200){
                commit('setProject', res.data.data)
                return res.data.data
            }
            
        }
    }
}
export default project