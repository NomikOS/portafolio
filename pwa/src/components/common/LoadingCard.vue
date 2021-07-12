<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('home', ['totalRecords', 'centerPoint'])
  }
}
</script>

<template>
  <div>
    <VContainer class="ma-2">
      <VRow align="center">
        <VCol>
          <FontAwesomeIcon
            icon="cog"
            spin
            size="lg"
            :small="$vuetify.breakpoint.xs"
            v-if="isLoadingCosaMixin('home')"
          />
          <template v-else>
            <FontAwesomeIcon
              icon="crosshairs"
              size="lg"
              class="mr-2"
              :small="$vuetify.breakpoint.xs"
            />
            <span>
              {{ totalRecords }} puntos de interés alrededor de "{{
                centerPoint.address
              }}"
            </span>
          </template>
        </VCol>
      </VRow>
    </VContainer>
  </div>
</template>
