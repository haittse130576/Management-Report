<template>
  <ul prop="group">
    <h4>
      <small>Project: </small>
      <strong>{{ group.projectName }}</strong>
    </h4>
    <h6>
      <small>Group: </small>
      <strong> {{ group.groupCode }}</strong>
    </h6>
  </ul>
  <div class="mt-2 card bg-default">
    <div class="table-responsive">
      <el-table :data="students" style="width: 100%" stripe>
        <el-table-column prop="accountCode" label="ID" header-align="center" />

        <el-table-column
          prop="fullname"
          label="Full Name"
          header-align="center"
        ></el-table-column>
        <el-table-column label="Process Scores" header-align="center">
          <el-table-column
            prop="report1"
            label="Report 1"
            header-align="center"
            align="center"
          >
            <template #default="scope">
              <el-input-number
                v-model="scope.row.report1"
                :min="0"
                :max="10"
                controls-position="right"
              >
              </el-input-number>
            </template>
          </el-table-column>
          <el-table-column
            prop="report2"
            label="Report 2"
            header-align="center"
            align="center"
          >
            <template #default="scope">
              <el-input-number
                v-model="scope.row.report2"
                :min="0"
                :max="10"
                controls-position="right"
              >
              </el-input-number>
            </template>
          </el-table-column>

          <el-table-column
            prop="report3"
            label="Report 3"
            header-align="center"
            align="center"
          >
            <template #default="scope">
              <el-input-number
                v-model="scope.row.report3"
                :min="0"
                :max="10"
                controls-position="right"
              >
              </el-input-number> </template
          ></el-table-column>
          <el-table-column
            prop="report4"
            label="Report 4"
            header-align="center"
            align="center"
          >
            <template #default="scope">
              <el-input-number
                v-model="scope.row.report4"
                :min="0"
                :max="10"
                controls-position="right"
              >
              </el-input-number> </template
          ></el-table-column>
          <el-table-column
            prop="report5"
            label="Report 5"
            header-align="center"
            align="center"
          >
            <template #default="scope">
              <el-input-number
                v-model="scope.row.report5"
                :min="0"
                :max="10"
                controls-position="right"
              >
              </el-input-number>
            </template>
          </el-table-column>
          <el-table-column
            prop="report6"
            label="Report 6"
            header-align="center"
            align="center"
          >
            <template #default="scope">
              <el-input-number
                v-model="scope.row.report6"
                :min="0"
                :max="10"
                controls-position="right"
              >
              </el-input-number>
            </template>
          </el-table-column>
          <el-table-column
            prop="report7"
            label="Report 7"
            header-align="center"
            align="center"
          >
            <template #default="scope">
              <el-input-number
                v-model="scope.row.report7"
                :min="0"
                :max="10"
                controls-position="right"
              >
              </el-input-number> </template
          ></el-table-column>
        </el-table-column>
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
                @click="onEdit(scope.$index, scope.row)"
              ></el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions, useStore } from 'vuex'
import { Edit } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'


export default {
  name: 'Scores',

  data() {
    return {
      Edit,
      store: useStore(),
      students: [],
      rowState: {},
      group: {},
    }
  },
  computed: {},
  props: true,
  methods: {
    ...mapActions(['getMarksByGroup', 'updateMark']),
    async init() {
      const router = useRouter()
      console.log('ID is:' + this.$route.params.obj)
      var tote = this.$route.params.obj
      if (tote == null) {
        this.$router.go(-1)
      }
      this.students = await this.getMarksByGroup(tote)
      const sol = await this.store.dispatch('group/getGroupByIdAction', tote)
      this.group = sol.data.data
      console.log(this.group)
      console.log(this.students)
    },
    // async onSubmit() {
    //   this.searchValue = {
    //     fullname: this.form.fullname,
    //     email: this.form.email,
    //     roleId: this.form.role,
    //     status: this.form.status,
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

    async onEdit(index, row) {
      const score = {
        id: row.id,
        accountId: row.accountId,
        report1: row.report1,
        report2: row.report2,
        report3: row.report3,
        report4: row.report4,
        report5: row.report5,
        report6: row.report6,
        report7: row.report7,
        status: row.status,
        final: row.final,
      }
      console.log(score)
      this.$confirm('Confirm update mark. Continue?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      })
        .then(() => {
          this.updateMark(score)
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