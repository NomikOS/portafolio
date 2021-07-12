import axios from 'axios'
import store from '@/state/store'
import axiosRetry from 'axios-retry'
const uuidv1 = require('uuid/v1')

// Reintentos autos general
// By default, it retries if it is a network error or a 5xx error
// on an idempotent request (GET, HEAD, OPTIONS, PUT or DELETE).
axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay })

let countingRetriesBy401Error = 0
const ajaxConfig = (() => {
  function init() {
    const xTracerSessionId = uuidv1()
    const xTracerSystems = 'ia-pwa'

    // Iniciar en cada sesion
    let xTracerRequestId = 1

    axios.defaults.headers.common['x-tracer-session-id'] = xTracerSessionId
    axios.defaults.headers.common['x-tracer-systems'] = xTracerSystems
    // Identificar cada request dentro de la sesion para logs.
    // Aqui para que esté listo para primer request
    axios.defaults.headers.common['x-tracer-request-id'] = xTracerRequestId

    // Do something before request is sent
    axios.interceptors.request.use(
      (config) => {
        // eslint-disable-next-line standard/computed-property-even-spacing
        axios.defaults.headers.common['x-tracer-request-id'] =
          xTracerRequestId++
        return config
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error)
      }
    )

    axios.interceptors.response.use(
      (response) => {
        // Reset intento debidos a 401 (si se dieron)
        countingRetriesBy401Error = 0
        // Si no error, todo OK
        return response
      },
      async (error) => {
        await manageCaseKongUnauthorized(error)

        // Manejo global de errores
        // Lo hago en catch individual por que no hallo
        // Posible solucion, pero por ahora esta bien manejarlo individual
        // @see https://github.com/axios/axios/issues/715

        // TODO add answers when have time
        // https://stackoverflow.com/questions/49967779/axios-handling-errors
        // https://stackoverflow.com/questions/51330377/stop-axios-promise-chain

        // Dejar resolucion de fallo a codigo cliente
        return Promise.reject(error)
      }
    )
  }

  return {
    init
  }
})()

export default ajaxConfig

async function manageCaseKongUnauthorized(error) {
  let retryNewToken = false
  const headers = error.response?.headers || {}

  if (headers['x-kong-user-not-found'] === 'true') {
    console.log('La api informa que el usuario no fue encontrado.')
    // Limpiar token que ha provocado este issue
    await store.dispatch('auth/logout')
  }

  if (error.config && error.response && error.response.status === 401) {
    if (
      headers['x-kong-unauthorized'] &&
      headers['x-kong-unauthorized'] === 'true'
    ) {
      // Nuestro api gateway informa que el token ha expirado
      // Ya que este header^ se setea pos chequeo de token
      retryNewToken = true
    }

    if (retryNewToken) {
      // Intentar 3 veces maximo antes de forzar logout
      // user y terminar loop
      if (++countingRetriesBy401Error === 3) {
        countingRetriesBy401Error = 0
        console.log('CountingRetriesBy401Error por error 401 maximo alcanzado')
      } else {
        console.log(
          `CountingRetriesBy401Error ${countingRetriesBy401Error} refrescando token...`
        )

        const idToken = await store.dispatch('auth/idToken', 'Retry por 401')

        if (idToken) {
          error.config.headers['Authorization'] = `Bearer ${idToken}`
          console.log('Reintentando consulta con', error.config)
          axios.request(error.config)
        }
      }
    }
  }
}
