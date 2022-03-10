<template>
  <div class="mt-2 card bg-default">
    <div class="table-responsive">
      <el-table ref="tableRef" :data="students" style="width: 100%" stripe>
        <el-table-column prop="accountCode" label="ID" header-align="center" />

        <el-table-column
          prop="fullname"
          label="Full Name"
          header-align="center"
        />
        <el-table-column
          prop="report1"
          label="Report 1"
          header-align="center"
          align="center"
          contenteditable="true"
        />
        <el-table-column
          prop="report2"
          label="Report 2"
          header-align="center"
          align="center"
        />
        <el-table-column
          prop="report3"
          label="Report 3"
          header-align="center"
          align="center"
        />
        <el-table-column
          prop="report4"
          label="Report 4"
          header-align="center"
          align="center"
        />
        <el-table-column
          prop="report5"
          label="Report 5"
          header-align="center"
          align="center"
        />
        <el-table-column
          prop="report6"
          label="Report 6"
          header-align="center"
          align="center"
        />
        <el-table-column
          prop="report7"
          label="Report 7"
          header-align="center"
          align="center"
        />
        <el-table-column
          label="Status"
          header-align="center"
          align="center"
          prop="status"
        >
        </el-table-column>

        <el-table-column
          prop="final"
          label="Final"
          header-align="center"
          align="center"
        />
        <el-table-column align="center" label="Action" header-align="center">
          <template #default="scope">
            <el-button-group class="ml-4">
              <el-button
                type="primary"
                :icon="Edit"
                @click="onEdit(scope.$index, scope.row.email)"
              ></el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { Edit } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
export default {
  name: 'Scores',
  components: {},
  data() {
    return {
      Edit,
      students: [],
    }
  },
  computed: {
  },
  props: true,
  methods: {
    ...mapActions(['getMarksByGroup']),
    async init() {
        const router = useRouter()
      console.log("ID is:"+this.$route.params.obj)
      var tote = this.$route.params.obj
      if(tote!=null){
      this.students = await this.getMarksByGroup(tote)
      }
      console.log(this.students)
    },
    // async onSubmit() {
    //   this.searchValue = {
    //     fullname: this.form.fullname,
    //     email: this.form.email,
    //     roleId: this.form.role,
    //     status: this.form.status,
    //     pageNumber: 1,
    //     pageSize: 10,
    //   }
    //   if (this.form.fullname.trim() === '') {
    //     this.searchValue.fullname = null
    //   }
    //   if (this.form.email.trim() === '') {
    //     this.searchValue.email = null
    //   }
    //   if (this.form.role === 'All') {
    //     this.searchValue.roleId = 0
    //   }
    //   if (this.form.status.trim() === 'All') {
    //     this.searchValue.status = null
    //   }
    //   this.searchResult = await this.searchListAccounts(this.searchValue)
    // },

    // async onEdit(index, email) {
    //   await this.getAccountByEmail(email)
    //   this.dialogVisible = true
    // },
    // handleAccountDetailDialogClose() {
    //   this.dialogVisible = false
    // },
  },
  mounted() {
    this.init()
  },
}
</script>
<style lang="scss">
</style>