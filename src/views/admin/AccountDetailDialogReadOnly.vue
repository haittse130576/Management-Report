<template>
  <div>
    <el-dialog
      :title="title"
      v-model="dialogVisible"
      :before-close="handleClose"
      width="50%"
      @close="handleClose"
    >
      <el-form
        :model="getAccountDetail"
        ref="form"
        label-width="80px"
        :inline="false"
        size="normal"
      >
        <el-form-item label="Email">
          <el-input v-model="getAccountDetail.data.email" disabled></el-input>
        </el-form-item>
        <el-form-item label="Full Name">
          <el-input v-model="getAccountDetail.data.fullname" disabled></el-input>
        </el-form-item>
        <el-form-item label="Phone">
          <el-input v-model="getAccountDetail.data.phone" disabled></el-input>
        </el-form-item>
        <el-form-item label="Address">
          <el-input v-model="getAccountDetail.data.address" disabled></el-input>
        </el-form-item>
        <el-form-item label="Role">
          <el-input v-model="getAccountDetail.data.roleName" disabled></el-input>
        </el-form-item>
        <el-form-item label="Birthday">
          <el-input v-model="getAccountDetail.data.birthday" disabled></el-input>
        </el-form-item>
        <el-form-item label="Status">
          <el-input v-model="getAccountDetail.data.status" disabled></el-input>
        </el-form-item>
        
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AccountDetailDialogReadOnly',
  props: {
    dialogVisible: {
      type: Boolean,
    },
  },
  data() {
    return {
      title:'Account Detail Dialog Read Only'
    }
  },
  computed: {
    ...mapGetters('account',['getAccountDetail']),
  },
  mounted() {
  },
  methods: {
    handleClose() {
      this.$emit('close')
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