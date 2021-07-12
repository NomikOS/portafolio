import Vue from 'vue'
import '@/components/common'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@/plugins/vuetify'
import '@/plugins/dayjs'

import ajaxConfig from '@/lib/ajaxConfig'
import VueSweetalert2 from 'vue-sweetalert2'
import Support from '@/mixins/Support'
import VueI18n from 'vue-i18n'
import Toasted from 'vue-toasted'
import VueTippy from 'vue-tippy'
import AllPages from '@/mixins/AllPages'
import VueLazyload from 'vue-lazyload'
import VueMeta from 'vue-meta'
import InfiniteLoading from 'vue-infinite-loading'
import Lightbox from 'vue-easy-lightbox'
import VueClipboard from 'vue-clipboard2'
import VueSocialSharing from 'vue-social-sharing'
import VueGeolocation from 'vue-browser-geolocation'

var VueScrollTo = require('vue-scrollto')

Vue.use(VueScrollTo, {
  container: 'body',
  duration: 0,
  easing: 'ease',
  offset: 0,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
})

// IMPORTANTE: referencia a console mediante logger para
// mantener mi shortcur para escribir // logger.info()
// Ademas para test defino logger a winston o bristol
// global.logger = console

Vue.use(VueSweetalert2, {
  cancelButtonText: 'Cancelar',
  confirmButtonText: '<strong>OK</strong>',
  // confirmButtonColor: '#ee44aa',
  cancelButtonColor: '#82b1ff44', // Ver tb .swal2-styled.swal2-cancel en main.vue
  reverseButtons: true
})

Vue.use(VueI18n)

Vue.use(Toasted, {
  iconPack: 'fontawesome',
  icon: 'smile',
  duration: 3000,
  closeOnSwipe: true,
  theme: 'toasted-primary',
  type: 'success',
  position: 'bottom-left',
  fullWidth: true
})

Vue.mixin(Support)

Vue.use(VueTippy, {
  flipDuration: 0,
  // placement: 'top',
  arrow: true,
  popperOptions: {
    // modifiers: {
    //   preventOverflow: {
    //     enabled: false
    //   }
    // }
  }
})

Vue.use(VueLazyload)

Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true
})

Vue.use(InfiniteLoading, {
  /* options */
})

// Configurar axios para helpers globales
ajaxConfig.init()

// Mixins
Vue.mixin(AllPages)
// Vue.mixin(Sketch)

Vue.use(Lightbox)

// Don't warn about using the dev version of Vue in development.
Vue.config.productionTip = process.env.NODE_ENV === 'production'
Vue.config.devtools = true

Vue.use(VueClipboard)
Vue.use(VueSocialSharing)
Vue.use(VueGeolocation)
