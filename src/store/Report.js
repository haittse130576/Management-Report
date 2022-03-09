import http from '../http-common'

const report = {
    state:{
        reports:[],
        listReports:{},
        reportResult:{}
    },
    getters:{
        getReports(state) {
            return state.reports
        },
        getListReports(state){
            return state.listReports
        },
        getReportResults(state){
            return state.reportResult
        }
    },
    mutations:{
        setReports(state, val){
            state.reports = val
        },
        setListReports(state, val){
            state.listReports = val
        },
        setReportResults(state, res){
            state.reportResult = res
        }
        
    },
    actions:{
        async getReportsAction(context){
            let response = await http.get("/api/reports")
            let data = response.data.data
            context.commit('setReports', data)
        },
    }
}
export default report