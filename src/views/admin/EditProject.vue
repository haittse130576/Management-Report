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
        :model="project"
        ref="getProject"
        label-width="100px"
        :inline="false"
        size="normal"
      >
        <el-form-item label="Project Name">
          <el-input v-model="project.projectName"></el-input>
        </el-form-item>
        
        <el-form-item label="Status">
          <el-select v-model="project.status" placeholder="Status">
              <el-option label="Active" value="Active"></el-option>
              <el-option label="Inactive" value="Inactive"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="Description">
          <el-input type="textarea" v-model="project.description"></el-input>
        </el-form-item>
        </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">Cancel</el-button>
          <el-button type="primary" @click="submitForm('getProject')"
            >Submit</el-button
          >
            </span>
      </template>
        
          
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { useStore } from 'vuex'
export default {
  name: 'EditProject',
  props: {
    dialogVisible: {
      type: Boolean,
    }
    
  },
  data() {
    return {
      title: 'Update Project',
      store: useStore(),
      searchValue: {},
    }
  },
  computed: {
    ...mapGetters('project', ['getProject']),
   project: {
      get() {
        return this.getProject
      },
      set(value) {
        this.store.commit('project/setProject', value)
      },
    },
  },
  mounted() {},
  methods: {
    
    handleClose() {
      this.resetForm('getProject')
      this.$emit('close')
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          var response = await this.store.dispatch(
            'project/update',
            this.project,
          )
          if (response.status === 'success') {
            this.$notify({
              title: 'Success',
              message: 'Insert successfully',
              type: 'success',
            })

            this.resetForm('getProject')
            await this.store.dispatch('project/search', this.searchValue)
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