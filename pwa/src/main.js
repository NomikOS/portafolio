import Vue from 'vue'
import '@/common.js'
import App from './App.vue'
import router from '@/router'
import store from '@/state/store'
import vuetify from './plugins/vuetify'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  vuetify,
  components: { App },
  template: '<App/>',
  watch: {},
  mounted() {}
})
