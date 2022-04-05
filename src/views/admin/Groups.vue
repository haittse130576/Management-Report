<template>
  <div class="card bg-default">
    <span class="m-2">
      <el-button type="primary" size="default" @click="onCreate"
        >Add New</el-button
      >
    </span>
    <el-dialog title="Create New Group" v-model="dialogFormVisible" @close="handleClose">
      <el-form
        :model="groupForm"
        label-width="150px"
        :rules="rules"
        ref="ruleForm"
      >
        <el-row :gutter="20">
          <el-col :span="12" :offset="0">
            <el-form-item label="Group Code" prop="groupCode">
              <el-input
                v-model="groupForm.groupCode"
                placeholder="Please input group code"
                @change="onCheckExist"
              ></el-input>
            </el-form-item>
            <el-form-item label="Project" prop="projectId">
              <el-select
                v-model="groupForm.projectId"
                placeholder="Please select a project"
              >
                <el-option
                  v-for="project in projects"
                  :key="project"
                  :label="project.projectName"
                  :value="project.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="Semester" prop="semester">
              <el-select
                v-model="groupForm.semester"
                placeholder="Please select a semester"
              >
                <el-option label="Spring" value="Spring"></el-option>
                <el-option label="Summer" value="Summer"></el-option>
                <el-option label="Fall" value="Fall"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Year" prop="year">
              <el-date-picker
                v-model="groupForm.year"
                type="year"
                placeholder="Pick a year"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="Mentor" prop="mentor">
          <el-input
            v-model="groupForm.mentor.name"
            placeholder="Please input mentor code"
            @click="onClickMentorInput"
          ></el-input>
        </el-form-item>
        <el-form-item label="Leader" prop="leader">
          <el-input
            v-model="groupForm.leader.name"
            placeholder="Please input leader code"
            @click="onClickLeaderInput"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-for="(member, index) in groupForm.members"
          :label="`Member ${index + 1}`"
          :key="member.key"
          :prop="'members.' + index + '.name'"
          :rules="{
            required: true,
            message: 'Member can not be null',
            trigger: 'blur',
          }"
        >
          <el-row :gutter="20">
            <el-col :span="20" :offset="0">
              <el-input
                v-model="member.name"
                placeholder="Please input member code"
                @click="onClickMemberInput(index, member)"
              ></el-input>
            </el-col>
            <el-col :span="4" :offset="0">
              <el-button @click.prevent="removeDomain(member)"
                >Delete</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <el-dialog
        title="Search account"
        v-model="dialogSearchAccountVisible"
        width="50%"
        @close="handleSearchClose"
        append-to-body
      >
        <span>
          <div>
            <el-form
              :model="memberFormSearch"
              ref="memberFormSearch"
              :rules="rules"
              label-width="80px"
              :inline="false"
              size="normal"
            >
              <el-row :gutter="20">
                <el-col :span="12" :offset="0">
                  <el-form-item label="Code">
                    <el-input v-model="memberFormSearch.Code"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12" :offset="0">
                  <el-form-item label="Name">
                    <el-input v-model="memberFormSearch.Name"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="onSearchMember"
                      >Search</el-button
                    >
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div>
            <el-table
              :data="members?.items"
              border
              stripe
              height="250"
              @row-click="onClickRow"
            >
              <el-table-column prop="accountCode" label="Code" width="150px">
              </el-table-column>
              <el-table-column prop="fullname" label="Name"> </el-table-column>
            </el-table>
          </div>
        </span>
      </el-dialog>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">Cancel</el-button>
          <el-button @click="addDomain">New member</el-button>
          <el-button type="primary" @click="onSubmit('ruleForm')"
            >Confirm</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
  <div class="card bg-default mt-2">
    <el-form
      class="mt-3"
      :model="form"
      ref="form"
      label-width="100px"
      :inline="true"
    >
      <el-form-item label="Group Code">
        <el-input v-model="form.groupCode"></el-input>
      </el-form-item>
      <el-form-item label="Semester">
        <el-select v-model="form.semester" clearable>
          <el-option label="Spring" value="Spring"></el-option>
          <el-option label="Summer" value="Summer"></el-option>
          <el-option label="Fall" value="Fall"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Year">
        <el-date-picker
          v-model="form.year"
          type="year"
          placeholder="Pick a year"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSearch">Search</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="mt-2 card bg-default">
    <div class="table-responsive">
      <el-table
        ref="tableRef"
        :data="groups"
        style="width: 100%"
        stripe
        v-loading="loading"
      >
        <el-table-column
          type="index"
          label="No."
          width="50"
          border
          header-align="center"
          align="center"
        />
        <el-table-column
          prop="groupCode"
          label="Group Code"
          header-align="center"
          align="center"
        />
        <el-table-column
          prop="projectName"
          label="Project Name"
          header-align="center"
        />
        <el-table-column
          prop="semester"
          label="Semester"
          header-align="center"
          align="center"
        />
        <el-table-column
          prop="year"
          label="Year"
          header-align="center"
          align="center"
        />

        <el-table-column align="center" label="Action" header-align="center">
          <template #default="scope">
            <el-button
              type="primary"
              :icon="Edit"
              @click="onEdit(scope.$index, scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="d-flex flex-row-reverse">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="pagingGroup.pageSize"
          :total="pagingGroup.totalCount"
          :current-page="pagingGroup.pageIndex"
          :page-count="pagingGroup.totalPages"
          @current-change="setPage"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { useStore, mapState } from 'vuex'
import { Edit, Delete } from '@element-plus/icons-vue'
export default {
  name: 'Groups',
  components: {},
  data() {
    var checkGroupCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Please input the group code'))
      }
      setTimeout(async () => {
        var res = await this.store.dispatch('group/checkGroupCodeExist', value)
        if (res && res.data) {
          return callback(new Error('The group code is existed'))
        } else {
          callback()
        }
      }, 1000)
    }
    var checkMentor = (rule, value, callback) => {
      if (!value) {
        callback(new Error('Please input the mentor'))
      } else {
        if (this.groupForm.mentor.id != '') {
          setTimeout(async () => {
            let params = {
              accountId: this.groupForm?.mentor.id,
              semester: this.groupForm?.semester,
              year: this.groupForm?.year,
            }
            var res = await this.store.dispatch('account/checkMentor', params)
            if (res >= 5) {
              return callback(new Error('Mentor had guided through 5 groups'))
            }
          }, 1000)
        }else{
          callback(new Error('Please input the mentor'))
        }
      }
      callback()
    }
    var checkLeader = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Please input the leader'))
      }
     if(this.groupForm.leader.id == ''){
       callback(new Error('Please input the leader'))
     }
    }
    return {
      store: useStore(),
      form: {
        groupCode: '',
        semester: '',
        year: '',
      },
      groupForm: {
        groupCode: '',
        semester: 'Summer',
        year: '2022',
        projectId: '',
        mentor: { id: '', name: '' },
        leader: { id: '', name: '' },
        members: [
          {
            key: 1,
            value: '',
          },
          { key: 2, value: '' },
        ],
      },
      groupCodeCheck: false,
      Edit,
      Delete,
      pagingGroup: {},
      groups: [],
      dialogVisible: false,
      loading: true,
      searchValue: {},
      dialogFormVisible: false,
      rules: {
        groupCode: [
          {
            validator: checkGroupCode,
            trigger: 'blur',
          },
        ],
        semester: [
          {
            required: true,
            message: 'Please select semester',
            trigger: 'change',
          },
        ],
        projectId: [
          {
            required: true,
            message: 'Please select project',
            trigger: 'change',
          },
        ],
        year: [
          {
            type: 'date',
            required: true,
            message: 'Please pick a year',
            trigger: 'change',
          },
        ],
        mentor: [
          {
            validator: checkMentor,
            trigger: 'blur',
          },
          {
            required: true,
            message: 'Please input mentor',
            trigger: 'blur',
          },
        ],
        leader: [
          {
            validator: checkLeader,
            trigger: 'blur',
          },
          {
            required: true,
            message: 'Please input leader',
            trigger: 'blur',
          },
        ],
      },
      memberFormSearch: {
        roleId: 3,
        Code: '',
        Name: '',
        Semester: 'Summer',
        Year: '2022',
      },
      dataTable: [],
      dialogSearchAccountVisible: false,
      metorFlag: false,
      leaderFlag: false,
      memberFlag: false,
      currentMemberField: {
        index: 0,
        member: {},
      },
      checkValid: false,
    }
  },
  computed: {
    ...mapState('project', {
      projects: (state) => state.projects,
    }),
    ...mapState('account', {
      members: (state) => state.members,
    }),
  },
  methods: {
    async init(searchValue) {
      this.loading = true
      this.pagingGroup = await this.store.dispatch(
        'group/searchGroup',
        searchValue,
      )
      this.groups = this.pagingGroup.items
      this.loading = false
    },
    async onSearch() {
      let params = {
        groupCode: this.form.groupCode,
        semester: this.form.semester,
        year: this.form.year,
        pageNumber: 1,
        pageSize: 10,
      }
      await this.init(params)
    },
    async onCreate() {
      this.dialogFormVisible = true
      await this.store.dispatch('project/getActiveProject')
    },
    onSubmit(formName) {
      this.store.commit('group/setGroupParams', this.groupForm)
      this.$refs[formName].validate(async (valid) => {
        if (valid && !this.checkValid) {
          var res = await this.store.dispatch('group/insertGroup')
          if (res && res.data.status === 'success') {
            this.$message({
              message: 'Congrats, the group create successfully.',
              type: 'success',
            })
            this.dialogFormVisible = false
            await this.init({})
          } else {
            this.$message.error('Oops, this is a error.')
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
      this.resetForm('ruleForm')
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    async setPage(val) {
      console.log('Page', val)
      this.searchValue = {
        groupCode: this.form.groupCode,
        semester: this.form.semester,
        year: this.form.year,
        pageNumber: val,
        pageSize: 10,
      }
      console.log('Search Value', this.searchValue)
      await this.init(this.searchValue)
    },
    onEdit(index, groupId) {
      this.$router.push('/admin/groups/detail')
      this.store.commit('group/setGroup', { id: groupId })
    },
    onClickMentorInput() {
      this.metorFlag = true
      this.memberFormSearch.roleId = 3
      ;(this.memberFormSearch.Name = ''), (this.memberFormSearch.Code = '')
      this.dialogSearchAccountVisible = true
    },
    onClickLeaderInput() {
      this.leaderFlag = true
      this.memberFormSearch.roleId = 4
      ;(this.memberFormSearch.Name = ''), (this.memberFormSearch.Code = '')
      this.dialogSearchAccountVisible = true
    },
    removeDomain(item) {
      if (this.groupForm.members.length > 2) {
        var index = this.groupForm.members.indexOf(item)
        if (index !== -1) {
          this.groupForm.members.splice(index, 1)
        }
      } else {
        this.$alert('Minimum member is 2. Can not remove')
      }
    },
    addDomain() {
      if (this.groupForm.members.length < 4) {
        this.groupForm.members.push({
          key: Date.now(),
          value: '',
        })
      } else {
        this.$alert('Maximum member is 4')
      }
    },
    onClickMemberInput(index, member) {
      this.memberFlag = true
      this.currentMemberField = {
        index: index,
        member: member,
      }
      this.memberFormSearch.roleId = 4
      this.memberFormSearch.Name = ''
      this.memberFormSearch.Code = ''

      this.dialogSearchAccountVisible = true
    },
    onSearchMember() {
      if (this.memberFormSearch.roleId == 4) {
        this.store.dispatch('account/searchMember', this.memberFormSearch)
      }
      if (this.memberFormSearch.roleId == 3) {
        this.store.dispatch('account/searchMember', this.memberFormSearch)
      }
    },
    handleSearchClose() {
      this.dialogSearchAccountVisible = false
      this.store.commit('account/setMembers', {})
      this.resetFlag()
    },
    onClickRow(row, column, event) {
      this.checkValid = false
      var member = { id: row.id, name: row.fullname }
      this.groupForm.members.map((item) => {
        if (item.id === this.groupForm.leader.id) {
          this.checkValid = true
          console.log(item.id)
          this.$alert(`Duplicate memember ${item.name}. Please input again.`)
        }
        if (item.id === member.id) {
          this.checkValid = true
          console.log(item.id)
          this.$alert(`Duplicate memember ${item.name}. Please input again.`)
        }
      })
      if(member.id === this.groupForm.leader.id){
        this.checkValid = true
          console.log(member.id)
          this.$alert(`Duplicate memember ${member.name}. Please input again.`)
      }
      if(!this.checkValid){
        if (this.memberFlag) {
        let indexMember = this.currentMemberField.index
        let tmpMembers = this.groupForm.members.map((item, index) =>
          index === indexMember
            ? { ...item, id: row.id, name: row.fullname }
            : item,
        )
        this.groupForm.members = tmpMembers
      }
      if (this.leaderFlag) {
        this.groupForm.leader = member
      }
      if (this.metorFlag) {
        this.groupForm.mentor = member
      }
      }
      console.log('leader', this.groupForm.leader.id)
      console.log('member', member.id)

      this.handleSearchClose()
    },
    resetFlag() {
      ;(this.memberFlag = false),
        (this.leaderFlag = false),
        (this.metorFlag = false)
    },
    handleClose(){
      this.dialogFormVisible = false
      this.groupForm =  {
        groupCode: '',
        semester: 'Summer',
        year: '2022',
        projectId: '',
        mentor: { id: '', name: '' },
        leader: { id: '', name: '' },
        members: [
          {
            key: 1,
            value: '',
          },
          { key: 2, value: '' },
        ],
      },
    this.resetForm('ruleForm'),
    this.resetFlag()
    }
  },
  mounted() {
    this.init()
  },
}
</script>
<style lang="scss"></style>
