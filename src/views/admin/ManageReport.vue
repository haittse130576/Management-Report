<template>
  <div>
    <div text-align="right">
      <el-button type="primary" @click="onEdit">Create New Report</el-button>
    </div>
    <div class="mt-2 card bg-default">
      <div class="table-responsive">
        <el-table :data="reports" style="width: 100%" stripe>
          <el-table-column
            prop="title"
            align="center"
            label="Report Name"
            header-align="center"
          />
          <el-table-column
            prop="endTime"
            align="center"
            label="Time End"
            header-align="center"
            :formatter="dateFormat"
          />
          <el-table-column
            prop="startTime"
            align="center"
            label="Start Time"
            header-align="center"
            :formatter="dateFormat"
          />
          <el-table-column
            prop="status"
            align="center"
            label="Status"
            header-align="center"
          />
          
          <el-table-column align="center" label="Action" header-align="center">
            <!-- <template>
          <template #default="scope">
            <el-button-group class="ml-4">
              <el-button
                type="primary"
                :icon="Edit"
                @click="onEdit(scope.$index, scope.row.reportId)"
              ></el-button>
              <el-button type="danger" :icon="Delete"></el-button>
            </el-button-group>
          </template> -->
            <el-popconfirm
              confirm-button-text="Yes"
              cancel-button-text="No, thanks"
              :icon="InfoFilled"
              icon-color="red"
              title="Are you sure to delete this?"
              @confirm="confirmEvent"
              @cancel="cancelEvent"
            >
              <template #reference>
                <el-button type="danger">Delete</el-button>
              </template>
            </el-popconfirm>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <create-new-report
      :dialogVisible="dialogVisible"
      @close="handleAccountDetailDialogClose"
    />
  </div>
</template>
<script >
import CreateNewReport from './CreateNewReport.vue'
import { ref } from 'vue'
import { mapGetters, mapActions } from 'vuex'
import moment from "moment";

export default {
  name: 'ManageReport',
  components: {
    CreateNewReport,
  },
  data() {
    return {
      dialogVisible: false,
      form: {
        fullname: '',
        email: '',
      },
      
    }
  },
  computed: {
    ...mapGetters(['getReports','getListReports']),
    reports: {
      get() {
        return this.getReports
      },
    },
  },
  methods: {
    onEdit() {
      this.dialogVisible = true
    },
    handleAccountDetailDialogClose() {
      this.dialogVisible = false
    },
    ...mapActions([
      'getReportsAction',
     
    ]),
    async init(){
      await this.getReportsAction()
    },
    dateFormat(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return moment(date).format("hh:mm:ss [At] YYYY-MM-DD");
    },
  },
   mounted(){
    this.init()
  }
}
</script>
<style lang="scss">
</style>