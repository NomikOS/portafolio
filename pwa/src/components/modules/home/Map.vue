<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import { geocodeLatLng } from '@/services/map'
const property = 'location'
// Container global de markers
let markers = []
let radioDistancia

export default {
  data: () => ({
    listener1: null,
    map: null,
    marker: null
  }),
  computed: {
    ...mapState('home', ['postGuard', 'records', 'goHome', 'distancia']),
    ...mapGetters('home', ['homeCoords', 'inHome']),
    data: {
      get() {
        return this.postGuard[property]
      },
      set(input) {
        this.POST_GUARD({ name: property, value: input })
      }
    }
  },
  watch: {
    distancia: function(nv) {
      this.drawRadio()
    },
    goHome: function(nv) {
      if (nv) {
        this.updateMap()
        this.GO_HOME(false)
      }
    },
    records: {
      immediate: true,
      handler(points) {
        console.warn({ 'LOGGING points': points })
        this.markers(points)
      }
    }
  },
  methods: {
    ...mapMutations({
      POST_GUARD: 'home/POST_GUARD',
      GO_HOME: 'home/GO_HOME'
    }),
    markers(points) {
      // Remover todos los markers si ya hay
      while (markers.length) {
        markers.pop().setMap(null)
      }

      const infowindow = new window.google.maps.InfoWindow()
      let marker, i

      for (i = 0; i < points.length; i++) {
        const point = points[i]
        marker = new window.google.maps.Marker({
          position: new window.google.maps.LatLng(
            point.latitude,
            point.longitude
          ),
          map: this.map
        })
        markers.push(marker)

        window.google.maps.event.addListener(
          marker,
          'click',
          (function(marker, i) {
            return function() {
              infowindow.setContent(
                `${point.name}<br />${point.category_name}
                <br />${point.latitude},${point.longitude}`
              )
              infowindow.open(this.map, marker)
            }
          })(marker, i)
        )
      }
    },
    updateMap() {
      const coords = this.setCoordsMixin(this.homeCoords)
      console.warn({ 'LOGGING coords': coords })
      this.marker.setPosition(coords)
      this.map.setCenter(coords)
      // this.map.setZoom(15)
    },
    getData() {
      this.$store.commit('global/LOADINGS', 'home')
      this.$store.dispatch('home/poisSector').finally(() => {
        this.$store.commit('global/LOADINGS_OFF', 'home')
      })
    },
    drawRadio() {
      // Radio distancia
      if (radioDistancia) {
        radioDistancia.setMap(null)
      }

      radioDistancia = new window.google.maps.Circle({
        strokeColor: '#0000FF',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#0000FF',
        fillOpacity: 0.15,
        map: this.map,
        center: this.map.getCenter(),
        radius: this.distancia
      })
    }
  },
  async mounted() {
    let zoom = 17

    const initCoords = this.data.coords
    const coords = this.setCoordsMixin(initCoords)
    const controls = {
      streetViewControl: false,
      scaleControl: false,
      mapTypeControl: false,
      clickableIcons: false,
      gestureHandling: 'cooperative',
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ],
      zoomControl: true,
      center: coords,
      zoom: zoom
    }

    this.map = new window.google.maps.Map(this.$refs['map'], controls)

    // Marker centrado
    const svgMarker = {
      path: window.google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
      fillColor: 'blue',
      fillOpacity: 1,
      strokeWeight: 0,
      rotation: 0,
      scale: 10
    }
    this.marker = new window.google.maps.Marker({
      position: coords,
      icon: svgMarker,
      map: this.map
    })

    this.drawRadio()

    this.map.addListener('center_changed', () => {
      const center = this.map.getCenter()
      this.marker.setPosition(center)
      // No usar evento drag pq se esta disparando al poner el
      // mouse/dedos sobre el mapa (con gestureHandling cooperative)
      // el cual no dispara nuestro geocodeLatLng
    })

    const debounce = (fn, time) => {
      let timeout
      return function() {
        const functionCall = () => fn.apply(this, arguments)
        clearTimeout(timeout)
        timeout = setTimeout(functionCall, time)
      }
    }

    // Pedir datos cuando pare ubicacion en mapa
    this.map.addListener(
      'center_changed',
      debounce(async e => {
        const center = this.map.getCenter()
        try {
          const data = await geocodeLatLng(this.map, center)

          const location = {
            coords: `${center.lat()},${center.lng()}`,
            address: data.address,
            street: data.street,
            city: data.city,
            commune: data.commune || ''
          }
          console.log(`Emitiendo location`, location)
          this.POST_GUARD({ name: property, value: location })
          this.getData()
          this.drawRadio()
        } catch (e) {
        } finally {
        }
      }, 1000)
    )
  },
  beforeDestroy() {}
}
</script>

<template>
  <div id="map" ref="map" />
</template>

<style scoped>
#map {
  height: 100%;
  background: gray;
}
</style>
