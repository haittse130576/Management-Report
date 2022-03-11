<template>
  <div class="card bg-default">
    <el-row :gutter="10">
      <el-col :span="18" :offset="0">
        <el-form
          :inline="true"
          :model="formSearch"
          class="demo-form-inline m-3"
        >
          <el-form-item label="Project Name">
            <el-input
              v-model="formSearch.projectName"
              placeholder="Project Name"
            ></el-input>
          </el-form-item>
          <el-form-item label="Status">
            <el-select v-model="formSearch.status" placeholder="Status">
              <el-option label="Active" value="Active"></el-option>
              <el-option label="Inactive" value="Inactive"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">Search</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="4" :offset="2">
        <el-button
          class="mt-3"
          type="primary"
          size="default"
          @click="dialogVisible = true"
          >Add New</el-button
        >
      </el-col>
    </el-row>
  </div>
  <div class="card bg-default mt-3">
    <el-table ref="tableRef" :data="projects" style="width: 100%" stripe v-loading="loading">
      <el-table-column
        type="index"
        label="No."
        width="50"
        border
        header-align="center"
        align="center"
      />
      <el-table-column
        prop="projectName"
        label="Project Name"
        header-align="center"
      />
      <el-table-column
        prop="status"
        label="Status"
        header-align="center"
        align="center"
      >
        <template #default="scope">
          <el-tag
            :type="scope.row.status === 'Active' ? 'success' : 'danger'"
            >{{ scope.row.status }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column label="Operations" header-align="center" align="center">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
            >Edit</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      class="d-flex flex-row-reverse"
      background
      layout="prev, pager, next"
      :total="paging.totalCount"
      :page-size="paging.pageSize"
      :current-page="paging.pageIndex"
      :page-count="paging.totalPages"
      @current-change="setPage"
    >
    </el-pagination>
  </div>
  <el-dialog
    v-model="dialogVisible"
    title="Add New Project"
    width="35%"
    draggable
  >
    <div>
      <el-form
        :model="projectForm"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="Project name" prop="projectName">
          <el-input v-model="projectForm.projectName"></el-input>
        </el-form-item>

        <el-form-item label="Description" prop="desc">
          <el-input
            type="textarea"
            v-model="projectForm.description"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="resetForm('ruleForm')">Cancel</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >Submit</el-button
        >
      </span>
    </template>
  </el-dialog>

  <edit-project
    :dialogVisible="dialogVisibleEditProject"
    :project="project"
    @close="handleEditProjectClose"
  />
</template>
<script>
import { useStore } from 'vuex'
import EditProject from './EditProject.vue'
export default {
  components: { EditProject },
  computed: {},
  data() {
    return {
      loading: true,
      paging: {},
      project: {},
      dialogVisible: false,
      dialogVisibleEditProject: false,
      store: useStore(),
      projects: [],
      projectForm: {
        projectName: '',
        description: '',
        status: '',
      },
      rules: {
        projectName: [
          {
            required: true,
            message: 'Please input project name',
            trigger: 'blur',
          },
        ],
      },
      formSearch: {
        projectName: '',
        status: 'All',
      },
      searchValue: {},
    }
  },
  methods: {
    async init() {
      this.loading = true
      this.paging = await this.store.dispatch('project/search', this.searchValue)
      this.projects = this.paging.items
      this.loading = false
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          var response = await this.store.dispatch(
            'project/insert',
            this.projectForm,
          )
          if (response.status === 'success') {
            this.$message('Successfully!!!')
            this.dialogVisible = false
            this.resetForm('ruleForm')
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
    async handleEdit(index, row) {
      let projectId = row.id
      console.log(`test: ${projectId}`)
      this.project = await this.store.dispatch(
        'project/getProjectById',
        projectId,
      )
      this.dialogVisibleEditProject = true
    },
    handleEditProjectClose() {
      this.dialogVisibleEditProject = false
    },
    async onSubmit() {
      this.searchValue = {
        projectName: this.formSearch.projectName,
        status: this.formSearch.status
      }
      if (this.formSearch.status === 'All') {
        this.searchValue.status = null
      }
      if (this.formSearch.projectName === '') {
        this.searchValue.projectName = null
      }
      await this.init()
    },
    handleDelete(index, row) {
      var id = row.id
      console.log(id)
      this.$confirm(
        'This will permanently update the project. Continue?',
        'Warning',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        },
      )
        .then(() => {
          this.store.dispatch('project/inactive', id)
          this.$message({
            type: 'success',
            message: 'Update completed',
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: 'Update canceled',
          })
        })
    },
    async setPage(val) {
      this.searchValue = {
        projectName: this.formSearch.projectName,
        status: this.formSearch.status,
        pageNumber: val,
        pageSize: this.paging.pageSize,
      }
      if (this.formSearch.status === 'All') {
        this.searchValue.status = null
      }
      if (this.formSearch.projectName === '') {
        this.searchValue.projectName = null
      }
      await this.init()
    },
  },
  mounted() {
    this.init()
  },
}
</script>
<style lang="scss">
</style>