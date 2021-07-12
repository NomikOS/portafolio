<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
const property = 'categories'

export default {
  data: () => ({
    items: [100, 500, 1000]
  }),
  computed: {
    ...mapState('home', ['postGuard', 'distancia']),
    ...mapGetters('home', ['homeCoords', 'inHome']),
    data: {
      get() {
        return this.postGuard[property]
      }
    }
  },
  methods: {
    ...mapMutations({
      POST_GUARD: 'home/POST_GUARD',
      DISTANCIA: 'home/DISTANCIA',
      GO_HOME: 'home/GO_HOME'
    }),
    setx(i, { ...option }, value) {
      let data = { ...this.data }
      data[i] = option
      data[i].checked = value
      // Volver a array
      data = Object.values(data)
      this.POST_GUARD({ name: property, value: data })
      this.getData()
    },
    setDistancia(d) {
      this.DISTANCIA(d)
      this.getData()
    },
    getData() {
      this.$store.commit('global/LOADINGS', 'home')
      this.$store.dispatch('home/poisSector').finally(() => {
        this.$store.commit('global/LOADINGS_OFF', 'home')
      })
    },
    home() {
      this.GO_HOME(true)
    }
  }
}
</script>

<template>
  <VContainer>
    <VRow>
      <VChip class="mb-3" color="green" dark>
        Filtrar por categoría
      </VChip>
      <VCol
        v-for="(option, i) in data"
        :key="i"
        cols="12"
        class="ma-0 pa-0 pl-3"
      >
        <VCheckbox
          class="ma-0 pa-0"
          :input-value="option.checked"
          @change="setx(i, option, $event)"
          :label="option.name"
        />
      </VCol>
      <VChip class="mb-3" color="green" dark>
        Distancia alrededor
      </VChip>
      <VCol cols="11" class="ma-0 pa-0 pl-3">
        <VSelect
          :value="distancia"
          :items="items"
          @input="setDistancia"
          dense
        ></VSelect>
      </VCol>
      <VCol cols="11" class="ma-0 pa-0 pl-3 mt-5">
        <VBtn
          @click="home()"
          small
          :disabled="inHome"
          :dark="!inHome"
          color="green"
        >
          <FontAwesomeIcon icon="home" size="lg" class="mr-2" />
          Ir a oficina
        </VBtn>
      </VCol>
    </VRow>
  </VContainer>
</template>
