<template>
  <div class="bg-default">
    <button @click="onClick">Test</button>
  </div>
</template>

<script>
import { mapGetters, mapState, useStore } from 'vuex'
export default {
  name: 'GroupDetail',
  data() {
    return {
      store: useStore(),
      loading: true,
    }
  },
  computed: {
      ...mapState({
          group: state => state.group
      })
  },

  methods: {
    onClick() {
        const val = this.store.getters['group/getGroup']
        console.log('ui26');
      console.log(this.group.group.id)
    },
  },
}
</script>

<style>
</style>