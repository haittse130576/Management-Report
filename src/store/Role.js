import http from '../http-common'

const role = {
    state:{
        listRoles:[]
    },
    getters:{
        getListRoles(state){
            return state.listRoles
        }
    },
    mutations:{
        setListRoles(state, val){
            state.listRoles = val
        }
    },
    actions:{
        async getListRolesAction(context){
            let response = await http.get("/api/roles")
            context.commit('setListRoles', response.data)
            console.log(response)
            return response
        }
    }


}
export default role