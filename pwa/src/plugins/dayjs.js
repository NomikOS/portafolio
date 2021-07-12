import Vue from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime' // dependent on utc plugin
import 'dayjs/locale/es'
// const timezone = require('dayjs/plugin/timezone')
// const utc = require('dayjs/plugin/utc')

// dayjs.extend(utc)
// dayjs.extend(timezone)
// dayjs.tz.setDefault('Asia/Dhaka')
dayjs.extend(relativeTime) // load on demand
dayjs.locale('es') // use Spanish locale globally

Object.defineProperties(Vue.prototype, {
  $date: {
    get() {
      return dayjs
    }
  }
})

Vue.filter('calendarDate', function (value) {
  if (value) {
    const x = dayjs(value)
      .fromNow()
      .replace(/^./, (str) => str.toUpperCase())
    return x
  }
})
Vue.filter('defaultDate', function (value) {
  if (value) {
    const x = dayjs(value)
      .format('YYYY-MM-DD HH:mm:ss')
      .replace(/^./, (str) => str.toUpperCase())
    return x
  }
})
Vue.filter('niceDate', function (value) {
  if (value) {
    const x = dayjs(value)
      .format('MMMM DD HH:mm, YYYY')
      .replace(/^./, (str) => str.toUpperCase())
    return x
  }
})
