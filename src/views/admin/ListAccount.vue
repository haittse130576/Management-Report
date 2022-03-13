<template>
  <el-button type="primary" @click="onAdd" class="btnAdd">Add </el-button>
  <div class="card bg-default">
    <el-form
      class="mt-3"
      :model="form"
      ref="form"
      label-width="50px"
      :inline="true"
    >
      <el-form-item label="Name">
        <el-input v-model="form.fullname"></el-input>
      </el-form-item>
      <el-form-item label="Email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="Role">
        <el-select v-model="form.role">
          <el-option
            v-for="role in getListRoles"
            :key="role.id"
            :label="role.name"
            :value="role.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Status">
        <el-select v-model="form.status">
          <el-option label="Active" value="active"></el-option>
          <el-option label="Inactive" value="inactive"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Search</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="mt-2 card bg-default">
    <div class="table-responsive">
      <el-table ref="tableRef" :data="account" style="width: 100%" stripe v-loading="loading">
        <el-table-column
          type="index"
          label="No."
          width="50"
          border
          header-align="center"
          align="center"
        />
        <el-table-column
          prop="fullname"
          label="Full Name"
          header-align="center"
        />
        <el-table-column prop="email" label="Email" header-align="center" />
        <el-table-column
          prop="roleName"
          label="Role"
          header-align="center"
          align="center"
        />
        <el-table-column
          prop="phone"
          label="Phone"
          header-align="center"
          align="right"
        />
        <el-table-column
          label="Status"
          header-align="center"
          align="center"
          prop="status"
        >
        </el-table-column>
        <el-table-column align="center" label="Action" header-align="center">
          <template #default="scope">
            <el-button-group class="ml-4">
              <el-button
                type="primary"
                :icon="Edit"
                @click="onEdit(scope.$index, scope.row.email)"
              ></el-button>
              <el-button type="danger" :icon="Delete"></el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <div class="d-flex flex-row-reverse">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="accountPaging.pageSize"
          :total="accountPaging.totalCount"
          :current-page="accountPaging.pageIndex"
          :page-count="accountPaging.totalPages"
          @current-change="setPage"
        >
        </el-pagination>
      </div>
    </div>
    <account-detail-dialog
      :dialogVisible="dialogVisible"
      @close="handleAccountDetailDialogClose"
    />
    <form-validation
      :dialogVisible="dialogVisibleAdd"
      @close="handleAccountDetailDialogAddClose"
    />
  </div>
</template>
<script>
import { mapGetters, mapActions, useStore, mapState } from 'vuex'
import { Search, Edit, Delete } from '@element-plus/icons-vue'
import AccountDetailDialog from './AccountDetailDialog.vue'
import FormValidation from './FormValidation.vue'
export default {
  name: 'Groups',
  components: {
    AccountDetailDialog,
    FormValidation,
  },
  data() {
    return {
      store: useStore(),
      form: {
        fullname: '',
        email: '',
        role: 'All',
        status: 'All',
      },

      Edit,
      Delete,
      roles: [],
      searchResult: {},
      searchValue: {},
      dialogVisible: false,
      dialogVisibleAdd: false,
      loading: true
    }
  },
  computed: {
    ...mapState('account',{
      account:(state) => state.accounts,
      accountPaging:(state) => state.accountResult
    })
  },
  methods: {
    async init() {
      this.loading = true
      this.roles = await this.store.dispatch('getListRolesAction')
      this.searchResult = await this.store.dispatch('account/searchListAccounts',this.searchValue)
      this.loading = false
    },
    async onSubmit() {
      this.searchValue = {
        fullname: this.form.fullname,
        email: this.form.email,
        roleId: this.form.role,
        status: this.form.status,
        pageNumber: 1,
        pageSize: 10,
      }
      if (this.form.fullname.trim() === '') {
        this.searchValue.fullname = null
      }
      if (this.form.email.trim() === '') {
        this.searchValue.email = null
      }
      if (this.form.role === 'All') {
        this.searchValue.roleId = 0
      }
      if (this.form.status.trim() === 'All') {
        this.searchValue.status = null
      }
      await this.init()
    },
    async setPage(val) {
      console.log(val);
      this.searchValue = {
        fullname: this.form.fullname,
        email: this.form.email,
        roleId: this.form.role,
        status: this.form.status,
        pageNumber: val,
        pageSize: this.accountPaging.pageSize,
      }
      if (this.form.fullname.trim() === '') {
        this.searchValue.fullname = null
      }
      if (this.form.email.trim() === '') {
        this.searchValue.email = null
      }
      if (this.form.role === 'All') {
        this.searchValue.roleId = 0
      }
      if (this.form.status.trim() === 'All') {
        this.searchValue.status = null
      }
      await this.init()
    },
    async onEdit(index, email) {
      await this.store.dispatch('account/getAccountByEmail', email)
      this.dialogVisible = true
    },
    onAdd() {
      this.dialogVisibleAdd = true
    },
    handleAccountDetailDialogClose() {
      this.dialogVisible = false
    },
    handleAccountDetailDialogAddClose() {
      this.dialogVisibleAdd = false
    },
  },

  mounted() {
    this.init()
  },
}
</script>
<style lang="scss">
</style>