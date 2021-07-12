<script>
export default {
  computed: {},
  methods: {},
  created() {
    // this.$store.commit('global/LOADINGS', 'home')
    // this.$store.dispatch('home/records').finally(() => {
    //   this.$store.commit('global/LOADINGS_OFF', 'home')
    // })
  }
}
</script>

<template>
  <div>
    <div id="map" ref="map" />
  </div>
</template>
