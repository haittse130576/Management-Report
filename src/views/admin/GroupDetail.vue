<template>
  <div class="card bg-default">
    <h3 class="m-2">Group Detail</h3>
    <div class="m-4">
      <el-form
        :model="groupForm"
        label-width="150px"
        :rules="rules"
        ref="ruleForm"
        label-position="top"
      >
        <el-row :gutter="20">
          <el-col :span="12" :offset="0">
            <el-form-item label="Group Code">
              <el-input v-model="groupForm.groupCode" disabled></el-input>
            </el-form-item>
            <el-form-item label="Project">
              <el-select
                v-model="groupForm.projectId"
                placeholder="Please select a project"
                disabled
              >
                <el-option
                  :label="groupForm.projectName"
                  :value="groupForm.projectId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="Semester" prop="semester">
              <el-select
                v-model="groupForm.semester"
                placeholder="Please select a semester"
                disabled
              >
                <el-option label="Spring" value="Spring"></el-option>
                <el-option label="Summer" value="Summer"></el-option>
                <el-option label="Fall" value="Fall"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Year" prop="year">
              <el-date-picker
                disabled
                v-model="groupForm.year"
                type="year"
                placeholder="Pick a year"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
  <div class="card bg-default mt-2">
    <el-row class="m-2" :gutter="20">
      <el-col :span="12" :offset="0">
        <h3>Group Members</h3>
      </el-col>
      <el-col :span="12" :offset="0">
        <el-button type="primary" size="default" @click="onAddMember"
          >Add Member</el-button
        >
      </el-col>
    </el-row>

    <el-table :data="accounts" border stripe v-loading="loading">
      <el-table-column type="index" width="50" label="No." />
      <el-table-column prop="accountCode" label="Code" width="150px">
      </el-table-column>
      <el-table-column prop="email" label="Emal"> </el-table-column>
      <el-table-column prop="fullname" label="Full Name"> </el-table-column>
      <el-table-column prop="roleName" label="Code" width="150px">
      </el-table-column>
    </el-table>
  </div>
  <el-dialog
    title="Add New Member"
    width="50%"
    v-model="dialogVisible"
    append-to-body
  >
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
            <el-form-item label="Name">
              <el-input v-model="memberFormSearch.Name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="Code">
              <el-input v-model="memberFormSearch.Email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSearchMember"
                >Search</el-button
              >
              <el-button>Reset</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div>
      <el-table :data="dataTable" border stripe>
        <el-table-column prop="acountCode" label="Code" width="150px">
        </el-table-column>
        <el-table-column prop="fullname" label="Name"> </el-table-column>
      </el-table>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="onSubmit('ruleForm')"
          >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { mapGetters, mapState, useStore } from 'vuex'
export default {
  name: 'GroupDetail',
  data() {
    return {
      store: useStore(),
      loading: true,
      dialogVisible: false,
      groupForm: {
        id: '',
        groupCode: '',
        semester: '',
        year: '',
        projectId: 0,
      },
      rules: {
        semester: [
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
            message: 'Please pick a date',
            trigger: 'change',
          },
        ],
      },
      memberForm: {
        role: 'Member',
        accountId: '',
      },
      searchValue: {
        RoleId: 4,
        PageNumber: 1,
        PageSize: 10,
      },
      dataTable: [
        { acountCode: 'Se001', fullname: 'Nguyen Van A' },
        { acountCode: 'Se001', fullname: 'Nguyen Van A' },
        { acountCode: 'Se001', fullname: 'Nguyen Van A' },
        { acountCode: 'Se001', fullname: 'Nguyen Van A' },
      ],
      innerVisible: false,
      memberFormSearch: {
        Code: '',
        Name: '',
        Email: '',
        Role: 4,
      },
    }
  },
  computed: {
    ...mapState('group', {
      group: (state) => state.group,
    }),
    ...mapState('account', {
      accounts: (state) => state.accounts,
      listAccountSelect: (state) => state.listAccountSelect,
      listMember: (state) => state.listMembers,
    }),
    ...mapState('project', {
      projects: (state) => state.projects,
    }),
    ...mapGetters('project', ['getProjects']),
    ...mapGetters('group', ['getGroup']),
  },

  methods: {
    async init() {
      this.loading = true
      if (!this.group.id) {
        this.$router.push('/admin/groups')
      }
      var res = await this.store.dispatch(
        'group/getGroupByIdAction',
        this.group.id,
      )
      await this.store.dispatch('project/getActiveProject')
      await this.store.dispatch(
        'account/getAccountByGroup',
        this.group.groupCode,
      )
      this.groupForm = this.getGroup
      console.log(this.accounts)
      this.loading = false
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    async onAddMember() {
      this.searchValue.Semester = this.group.semester
      this.searchValue.Year = this.group.year
      await this.store.dispatch('account/getAvailableMember', this.searchValue)
      this.dialogVisible = true
    },
    handleClose() {
      this.dialogVisible = false
    },
    onClickAccountInput(value) {
      this.innerVisible = true
    },
  },
  mounted() {
    this.init()
  },
}
</script>

<style></style>
