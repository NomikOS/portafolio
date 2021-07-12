import { register } from 'register-service-worker'
let refreshing = false

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log(
        'App is being served from cache by a service worker.\n' +
          'For more details, visit https://goo.gl/AFskqB'
      )
    },
    registered() {
      console.log('Service worker has been registered.')
    },
    cached() {
      console.log('Content has been cached for offline use.')
    },
    updatefound() {
      console.log('New content is downloading.1')
      // new content clear cache so user gets the new version
      caches.keys().then((cacheNames) => {
        cacheNames.forEach((cacheName) => {
          console.log(`Deleting: ${cacheName}`)
          caches.delete(cacheName)
        })
      })
    },
    updated() {
      console.log('New content is available; please refresh.1')
      console.log({ 'LOGGING refreshing 2': refreshing })
      if (refreshing) return
      setTimeout(() => {
        console.log(`Forzando reload comentado!!!`)
        // window.location.reload()
      }, 1000)
      refreshing = true
    },
    offline() {
      console.log(
        'No internet connection found. App is running in offline mode.'
      )
    },
    error(error) {
      console.error('Error during service worker registration:', error)
    }
  })
}
