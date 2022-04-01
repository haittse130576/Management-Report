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
        <el-table-column align="center" label="Action" header-align="center">
          <template #default="scope">
            <el-button-group class="ml-4">
              <el-button
                type="primary"
                :icon="Edit"
                @click="onEdit(scope.$index, scope.row)"
                :disabled="scope.row.isClose===true"
              ></el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="card bg-default">
      <span class="m-2">
        <el-button type="primary" @click="sendMark">Send Mark</el-button>
      </span>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions, useStore } from 'vuex'
import { Edit, InfoFilled } from '@element-plus/icons-vue'
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
      var tote = this.$route.params.obj
      if (tote === null) {
        this.$router.go(-1)
      }
      // this.students = await this.getMarksByGroup(tote)
      this.students = await this.store.dispatch('mark/getMarksByGroupId', {
        groupId: tote,
        isClosed: 0,
        roleId: 3,
      })
      const sol = await this.store.dispatch('group/getGroupByIdAction', tote)
      this.group = sol.data.data
      console.log(this.group)
      console.log(this.students)
    },

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
      }
      console.log(score)
      this.$confirm('Confirm update mark. Continue?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      })
        .then(async () => {
          await this.store.dispatch('mark/updateMark', score)
          // this.updateMark(score)
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
    sendMark() {
      this.$confirm('Confirm send mark to FPTU. Continue?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      })
        .then(async () => {
          this.students.forEach(Element => {
            Element.isClose = true
            this.store.dispatch('mark/updateMark', Element)

          });
          console.log(this.students)
          this.$message({
            type: 'success',
            message: 'Send completed',
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: 'Canceled',
          })
        })
    },
  },
  mounted() {
    this.init()
  },
}
</script>
<style lang="scss"></style>
