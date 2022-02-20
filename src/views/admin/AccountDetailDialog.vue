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
          <el-input v-model="getAccountDetail.data.fullname"></el-input>
        </el-form-item>
        <el-form-item label="Phone">
          <el-input v-model="getAccountDetail.data.phone"></el-input>
        </el-form-item>
        <el-form-item label="Address">
          <el-input v-model="getAccountDetail.data.address"></el-input>
        </el-form-item>
        <el-form-item label="Role">
          <el-input v-model="getAccountDetail.data.roleName"></el-input>
        </el-form-item>
        <el-form-item label="Birthday">
          <el-input v-model="getAccountDetail.data.birthday"></el-input>
        </el-form-item>
        <el-form-item label="Status">
          <el-input v-model="getAccountDetail.data.status"></el-input>
        </el-form-item>
        
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AccountDetailDialog',
  props: {
    dialogVisible: {
      type: Boolean,
    },
  },
  data() {
    return {
      title:'Account Detail Dialog'
    }
  },
  computed: {
    ...mapGetters(['getAccountDetail']),
  },
  mounted() {
    console.log('AccountDetailDialog' + this.dialogVisible)
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