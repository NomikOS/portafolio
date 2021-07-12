<script>
import { mapState } from 'vuex'
import release from '../../../public/release.json'

export default {
  data: () => ({
    fav: true,
    showMenu: false,
    message: false,
    showAbout: false,
    info: ''
  }),
  computed: {
    ...mapState('global', ['deferredPrompt'])
  },
  methods: {
    logout() {
      this.showMenu = false
      this.$router.push('/logout')
    },
    about() {
      this.showMenu = false
      this.showAbout = true
    },
    go(ruta) {
      this.$router.push(ruta)
      this.showMenu = false
    }
  },
  created() {
    this.release = release
  }
}
</script>

<template>
  <div>
    <VMenu
      v-model="showMenu"
      :close-on-content-click="false"
      :nudge-width="300"
      offset-y
      :nudge-bottom="10"
    >
      <template v-slot:activator="{ on }">
        <VBtn icon class="mr-0" @click="showAbout = true" v-on="on">
          <FontAwesomeIcon icon="user" size="2x" />
        </VBtn>
      </template>
    </VMenu>

    <VDialog v-model="showAbout" width="500">
      <VCard>
        <VCardTitle class="mb-2 card-title"> Acerca de </VCardTitle>

        <VCardText
          class="mt-5"
          :class="{ 'body-2': $vuetify.breakpoint.xs }"
          style="font-size: 15px"
        >
          Prueba técnica de Igor Parra para Geo-research
          <br />
          <br />
          Copyright &copy; {{ new Date().getFullYear() }} IRPB &middot; Todos
          los derechos reservados
        </VCardText>

        <VDivider class="mt-0" />

        <VCardActions>
          <VSpacer></VSpacer>
          <VBtn color="primary" @click="showAbout = false"> OK </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>
