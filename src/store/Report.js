import http from '../http-common'

const report = {
    state: {
        reports: [],
        listReports: {},
        reportResult: {}
    },
    getters: {
        getReports(state) {
            return state.reports
        },
        getListReports(state) {
            return state.listReports
        },
        getReportResults(state) {
            return state.reportResult
        }
    },
    mutations: {
        setReports(state, val) {
            state.reports = val
        },
        setListReports(state, val) {
            state.listReports = val
        },
        setReportResults(state, res) {
            state.reportResult = res
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
            const res = await http.put(`api/reports/${report.id}`, report)
            return res.data
        },
        async delete(context, id) {
            const res = await http.put(`api/reports/delete/${id}`, {})
            return res.data
        },
        async getReportById({ commit }, id) {
            const res = await http.get(`api/reports/${id}`)
            if (res.status === 200) {
                commit('setReports', res.data.data)
                return res.data.data
            }

        }
    }

}
export default report