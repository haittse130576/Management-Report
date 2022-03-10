import http from '../http-common'

const mark = {
    state:{
        students:[],
        mark:{
            report1:'',
            report2:'',
            report3:'',
            report4:'',
            report5:'',
            report6:'',
            report7:'',
            status:'',
            final:''
        },
        student:{}
    },
    getters:{
        getStudents(state){
            return state.students
        },
        getStudent(state){
            return state.student
        }
    },
    mutations:{
        setStudents(state, val){
            state.students = val
        },
        setStudent(state, val){
            state.student = val
        },
        setMark(state, val){
            state.mark = val
            console.log(state.mark);
        }
    },
    actions:{
        async getMarksByGroup(context, groupId){
            const res = await http.get(`api/marks/get-by-group?groupId=`+groupId)
            if(res.status === 200){
                context.commit('setStudents', res.data.data)
                return res.data.data
            }
            
        }
    }
}
export default mark