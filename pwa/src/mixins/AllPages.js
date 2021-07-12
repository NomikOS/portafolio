export default {
  computed: {
    loggedInMixin() {
      return this.$store.getters['auth/loggedIn']
    },
    currentPostMixin() {
      return this.$store.state.post.record
    },
    xsOnlyMixin() {
      return this.$vuetify.breakpoint.xsOnly
    }
  },
  methods: {
    setCoordsMixin(coords) {
      coords = coords.split(',')
      const lat = +(coords[0] || '0').trim()
      const lng = +(coords[1] || '0').trim()
      return { lat, lng }
    },
    coordsMixin(coords) {
      coords = coords.split(',')
      const lat = Number(coords[0]).toFixed(5)
      const lng = Number(coords[1]).toFixed(5)
      return `${lat}, ${lng}`
    },
    isLoadingCosaMixin(cosa) {
      return this.$store.getters['global/isLoadingCosa'](cosa)
    },
    forceLoginMixin({ postId, parentId }) {
      this.$store.commit('global/SET_BACK_DATA', { postId, parentId })
      this.$router.push({ name: 'auth' })
    }
  }
}
