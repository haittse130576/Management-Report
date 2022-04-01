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
    <h6>
      <strong>{{ student.accountCode }} - {{ student.fullname }}</strong>
    </h6>
  </ul>
  <div class="submission mt-2">
    <div class="submission-info">
      <el-descriptions
        class="margin-top"
        title="Mark"
        :column="1"
        :size="size"
        border
      >
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">Report 1</div>
          </template>
          {{ student.report1 }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">Report 2</div>
          </template>
          {{ student.report2 }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">Report 3</div>
          </template>
          {{ student.report3 }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">Report 4</div>
          </template>
          {{ student.report4 }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">Report 5</div>
          </template>
          {{ student.report5 }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">Report 6</div>
          </template>
          {{ student.report6 }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">Report 7</div>
          </template>
          {{ student.report7 }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">Status</div>
          </template>
          {{ student.status }}
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions, useStore } from 'vuex'
import { Edit } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

export default {
  name: 'ScoresView',

  data() {
    return {
      Edit,
      store: useStore(),
      students: [],
      rowState: {},
      group: {},
      student: {},
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
        isClosed: 1,
      })
      const sol = await this.store.dispatch('group/getGroupByIdAction', tote)
      this.group = sol.data.data
      console.log(this.group)
      console.log(this.students)
      var user = JSON.parse(localStorage.getItem('USER'))
      const mark = this.students
        .filter((obj) => {
          return obj.accountId === user.account.id
        })
        .pop()

      this.student = mark
      console.log(this.student)
    },
  },
  mounted() {
    this.init()
  },
}
</script>
<style lang="scss">
</style>