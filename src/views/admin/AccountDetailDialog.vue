<template>
  <div>
    <el-dialog
      title="Update Account"
      v-model="dialogVisible"
      :before-close="handleClose"
      width="50%"
      @close="handleClose"
    >
      <el-form
        :model="account"
        ref="getAccountDetail"
        label-width="80px"
        :inline="false"
        size="normal"
      >
        <el-form-item label="Email">
          <el-input v-model="account.email" disabled></el-input>
        </el-form-item>
        <el-form-item label="Full Name">
          <el-input v-model="account.fullname"></el-input>
        </el-form-item>
        <el-form-item label="Account Code">
          <el-input v-model="account.accountCode"></el-input>
        </el-form-item>
        <el-form-item label="Phone">
          <el-input v-model="account.phone"></el-input>
        </el-form-item>
        <el-form-item label="Address">
          <el-input v-model="account.address"></el-input>
        </el-form-item>
        <el-form-item label="Role">
          <el-select v-model="account.roleId">
            <el-option
              v-for="role in getListRoles"
              :key="role.id"
              :label="role.name"
              :value="role.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="Birthday">
          <el-input v-model="account.birthday"></el-input>
        </el-form-item> -->
        <el-form-item label="Birthday">
          <el-form-item >
            <el-date-picker
              type="date"
              placeholder="Pick a date"
              v-model="account.birthday"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-form-item>
        <!-- <el-form-item label="Status">
          <el-input v-model="getAccountDetail.data.status"></el-input>
        </el-form-item> -->
        <el-form-item label="Status">
          <el-select v-model="account.status">
            <el-option label="Active" value="Active"></el-option>
            <el-option label="Inactive" value="Inactive"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">Cancel</el-button>
          <el-button type="primary" @click="submitForm('getAccountDetail')"
            >Submit</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import account from '@/store/Account'
import { mapGetters } from 'vuex'
import { useStore } from 'vuex'
export default {
  name: 'AccountDetailDialog',
  props: {
    dialogVisible: {
      type: Boolean,
    },
  },
  data() {
    return {
      title: 'Update Acount',
      store: useStore(),
      searchValue: {},
    }
  },
  computed: {
    ...mapGetters('account', ['getAccountDetail']),
    ...mapGetters(['getListRoles']),
    account: {
      get() {
        return this.getAccountDetail
      },
      set(value) {
        this.store.commit('account/setAccountDetail', value)
      },
    },
  },
  mounted() {},
  methods: {
    handleClose() {
      this.resetForm('getAccountDetail')
      this.$emit('close')
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          
          var response = await this.store.dispatch(
            'account/update',
            this.getAccountDetail,
          )
          if (response.status === 'success') {
            this.$notify({
              title: 'Success',
              message: 'Insert successfully',
              type: 'success',
            })

            this.resetForm('getAccountDetail')
            await this.store.dispatch(
              'account/searchListAccounts',
              this.searchValue,
            )
            this.handleClose()
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
  },
  watch: {
    visbleSync(val) {
      this.$emit('update:dialogVisible', val)
    },
  },
}
</script>
<style lang="scss">
</style>