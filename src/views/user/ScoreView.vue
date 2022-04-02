<template>
  <div class="card bg-default" >
    <h3 class="m-3">View Score</h3>
  </div>
  <div class="card bg-default mt-2">
    
    <ul prop="group" class="mt-3">
      <h4>
        <small>Project Name: </small>
        <strong>{{ group.projectName }}</strong>
      </h4>
      <h5>
        <small>Group: </small>
        <strong> {{ group.groupCode }}</strong>
      </h5>
      <h6>
        <strong>{{ mark.accountCode }} - {{ mark.fullname }}</strong>
      </h6>
    </ul>
    <div class="submission mt-2">
      <div class="submission-info">
        <el-descriptions
          class="margin-top"

          :column="1"
          :size="size"
          border
        >
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">Report 1</div>
            </template>
            {{ mark.report1 }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">Report 2</div>
            </template>
            {{ mark.report2 }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">Report 3</div>
            </template>
            {{ mark.report3 }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">Report 4</div>
            </template>
            {{ mark.report4 }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">Report 5</div>
            </template>
            {{ mark.report5 }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">Report 6</div>
            </template>
            {{ mark.report6 }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">Report 7</div>
            </template>
            {{ mark.report7 }}
          </el-descriptions-item>

          <el-descriptions-item>
            <template #label>
              <div class="cell-item">Status</div>
            </template>
            {{ mark.status }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </div>
  </div>
  
</template>
<script>
import { mapGetters, mapActions, useStore, mapState } from 'vuex'
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
  computed: {
    ...mapState('group', {
      groupItem: (state) => state.group,
    }),
    ...mapState('mark', {
      mark: (state) => state.mark,
    }),
  },
  props: true,
  methods: {
    ...mapActions(['getMarksByGroup', 'updateMark']),
    async init() {
      // this.students = await this.getMarksByGroup(tote)

      const sol = await this.store.dispatch(
        'group/getGroupByIdAction',
        this.groupItem.id,
      )
      this.group = sol.data.data
      var user = JSON.parse(localStorage.getItem('USER'))
      this.students = await this.store.dispatch('mark/getMarksByAccountId', {
        accountId: user.account.id,
      })
    },
  },
  mounted() {
    this.init()
  },
}
</script>
<style lang="scss"></style>
