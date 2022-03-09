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
        ref="form"
        label-width="100px"
        :inline="false"
        size="normal"
      >
        <el-form-item label="Project Name">
          <el-input v-model="project.projectName"></el-input>
        </el-form-item>
        <el-form-item label="Description">
          <el-input v-model="project.description"></el-input>
        </el-form-item>
        <el-form-item label="Status">
          <el-select v-model="project.status" placeholder="Status">
              <el-option label="Active" value="Active"></el-option>
              <el-option label="Inactive" value="Inactive"></el-option>
            </el-select>
        </el-form-item>

        <el-popconfirm
          confirm-button-text="OK"
          cancel-button-text="No, Thanks"
          :icon="InfoFilled"
          title="Are you sure to Update this?"
        >
          <template #reference>
            <el-button type="success">Update</el-button>
          </template>
        </el-popconfirm>
        <el-button type="" class="btnCancel">Cancel</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
import { useStore } from 'vuex'
export default {
  name: 'EditProject',
  props: {
    dialogVisible: {
      type: Boolean,
    },
    project: {
      type: Object,
    },
  },
  data() {
    return {
      title: 'Update Project',
      store: useStore(),
     
    }
  },
  computed: {
   
  },
  mounted() {},
  methods: {
    ...mapMutations(['setProject']),
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
.btnCancel {
  float: right;
}
</style>