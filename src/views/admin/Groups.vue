<template>
  <div class="card bg-default">
    <span class="m-2">
      <el-button type="primary" size="default" @click="onCreate"
        >Add New</el-button
      >
    </span>
    <el-dialog title="Create New Group" v-model="dialogFormVisible">
      <el-form
        :model="groupForm"
        label-width="150px"
        :rules="rules"
        ref="ruleForm"
      >
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
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
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
import { mapGetters, mapActions, useStore, mapState } from 'vuex'
import { Search, Edit, Delete } from '@element-plus/icons-vue'
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
          callback(new Error('The group code is existed'))
        } else {           
          callback()
        }
      }, 1000)
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
        semester: '',
        year: '2022',
        projectId: '',
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
          {
            min: 7,
            max: 7,
            message: 'Length must be 7',
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
        date1: [
          {
            type: 'date',
            required: true,
            message: 'Please pick a year',
            trigger: 'change',
          },
        ],
      },
    }
  },
  computed: {
    ...mapState('project', {
      projects: (state) => state.projects,
    }),
  },
  methods: {
    async init() {
      this.loading = true
      this.pagingGroup = await this.store.dispatch(
        'group/searchGroup',
        this.searchValue,
      )
      this.groups = this.pagingGroup.items
      this.loading = false
    },
    async onSearch() {
      this.searchValue = {
        groupCode: this.form.groupCode,
        semester: this.form.semester,
        year: this.form.year,
        pageNumber: 1,
        pageSize: 10,
      }
      if (this.form.groupCode.trim() == '') {
        this.searchValue.groupCode = null
      }
      if (this.form.semester.trim() == '') {
        this.searchValue.semester = null
      }
      if (this.form.year.trim() == '') {
        this.searchValue.year = null
      }
      await this.init()
    },
    async onCreate() {
      this.dialogFormVisible = true
      await this.store.dispatch('project/getActiveProject')
    },
    onSubmit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          console.log('group', this.groupForm)
          var res = await this.store.dispatch('group/insertGroup', this.groupForm)
          if (res && res.data.status === 'success') {
            this.$message({
              message: 'Congrats, the group create successfully.',
              type: 'success',
            })
            this.dialogFormVisible =false
            await this.init()
          } else {
            this.$message.error('Oops, this is a error.')
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    async setPage(val) {
      this.searchValue = {
        groupCode: this.form.groupCode,
        semester: this.form.semester,
        year: this.form.year,
        pageNumber: val,
        pageSize: 10,
      }
      if (this.form.groupCode.trim() == '') {
        this.searchValue.groupCode = null
      }
      if (this.form.semester.trim() == '') {
        this.searchValue.semester = null
      }
      if (this.form.year.trim() == '') {
        this.searchValue.year = null
      }
      await this.init()
    },
    onEdit(index, groupId) {
      this.$router.push('/admin/groups/detail')
      this.store.commit('group/setGroup', {id:groupId})
    },
  },
  mounted() {
    this.init()
  },
}
</script>
<style lang="scss"></style>
