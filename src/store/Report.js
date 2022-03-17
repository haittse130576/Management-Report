import http from '../http-common'

const report = {
    namespaced : true,
    state: {
        reports: [],
        report:{},
        listReports: {},
        reportResult: {}
    },
    getters: {
        getReports(state) {
            return state.reports
        },
        getReportResults(state) {
            return state.reportResult
        },
        getReport(state){
            return state.report
        }
    },
    mutations: {
        setReports(state, val) {
            state.reports = val
        },
        setReportResults(state, res) {
            state.reportResult = res
        },
        setReport(state, val) {
            state.report = val
            console.log('mutation', val);
        }
    },
    actions: {
        async getReportsAction(context) {
            let response = await http.get("/api/reports")
            let data = response.data.data
            context.commit('setReports', data)
        },
        async insert(context, report) {
            const response = await http.post('/api/reports', {
                title: report.title,
                startTime: report.startTime,
                endTime: report.endTime,
                status: report.status
            })
            return response.data
        },
        async update(context, report) {
            const res = await http.put(`api/reports/${report.id}`,
                {
                id: report.id,
                title: report.title,
                startTime: report.startTime,
                endTime: report.endTime,
                status: report.status
                })
            return res.data
        },
        async delete(context, id) {
            const res = await http.put(`api/reports/delete/${id}`, {})
            return res.data
        },
        async getReportById({ commit }, id) {
            const res = await http.get(`api/reports/${id}`)
            if (res.status === 200) {
                commit('setReport', res.data.data)
                return res.data.data
            }

        }
    }

}
export default report