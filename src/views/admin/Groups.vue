<template>
  <div class="card bg-default">
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
import { mapGetters, mapActions, useStore } from 'vuex'
import { Search, Edit, Delete } from '@element-plus/icons-vue'
export default {
  name: 'Groups',
  components: {},
  data() {
    return {
      store: useStore(),
      form: {
        groupCode: '',
        semester: '',
        year: '',
      },

      Edit,
      Delete,
      pagingGroup: {},
      groups: [],
      dialogVisible: false,
      loading: true,
      searchValue: {},
    }
  },
  computed: {},
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
      console.log('search value',this.searchValue);
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
    async onEdit(index, email) {
      this.dialogVisible = true
    },
    handleAccountDetailDialogClose() {
      this.dialogVisible = false
    },
  },
  mounted() {
    this.init()
  },
}
</script>
<style lang="scss"></style>
