<script>
import '@/components/modules/home'

export default {
  metaInfo: {
    title: 'PWA de puntos de interés Georesearch'
  },
  created() {
    this.$store.commit('global/LOADINGS', 'home')
    this.$store.dispatch('home/poisAll').finally(() => {
      this.$store.commit('global/LOADINGS_OFF', 'home')
    })
  }
}
</script>

<template>
  <VContainer class="fill-height" fluid>
    <VRow style="height:100%" no-gutters>
      <VCol :cols="$vuetify.breakpoint.smAndDown ? 6 : 2">
        <Category />
      </VCol>
      <VCol :cols="$vuetify.breakpoint.smAndDown ? 6 : 10">
        <Map />
      </VCol>
    </VRow>
  </VContainer>
</template>
