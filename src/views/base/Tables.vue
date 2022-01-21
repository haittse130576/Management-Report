<template>
  <div id="table">
    <ul>
      <li v-for="item in this.accounts">
        <b>{{item.email}} - {{item.fullname}}</b>
       
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  name: 'Tables',
  data() {
    return {
      accounts:[]
    }
  },
  computed: {

  },
  methods: {
    ...mapActions(['getAccountsAction']),
    async test() {
      let result = await this.getAccountsAction()
      this.accounts = result.data
      console.log(result)
    },
  },
  mounted() {
    this.test()
  },
}
</script>
