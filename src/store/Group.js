import axios from "axios"
const groups = {
    state: {
        groups: [],
        group: {},
        listAccounts: [],
    },
    getters: {
        getGroups: (state) => {
            return state.groups
        },
        getGroup: (state) => {
            return state.group
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
        }
    },
    actions: {
        async getGroupsAction(context) {
            const response = await axios.get('/api/groups')
            if (response.data != null) {
                context.commit('setGroups', response.data)
            }
            return response

        },

        async getGroupByIdAction(context,id) {
            try{
            if(id){
                    const response = await axios.get('/api/groups/'+id)
                    if (response.status===200) {
                        context.commit('setGroup', response.data)
                    }
                    return response
            }
            }catch(error){
                console.log(error);
            }
        },
        async getGroupByAccountAction(context,email){
            try{
                if(email){
                    const response = await axios.get('/api/groups/get-by-account?email='+email)
                    if(response.status ===200){
                        context.commit('setGroups', response.data)
                    }
                    return response
                }
            }catch(error){
                console.log(error)
            }
        },
        async getAccountByGroupIdAction(context,groupId){
            try{
                if(groupId){
                    const response = await axios.get('/api/account-group/find-by-group-id?groupId='+groupId)
                    if(response.status ===200){
                        context.commit('setListAccounts', response.data)
                    }
                    return response
                }
            }catch(error){
                console.log(error)
            }
        }
    }

}
export default groups