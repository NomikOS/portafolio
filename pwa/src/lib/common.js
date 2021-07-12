const credentials = {}
let commonUrls = {}

const APP_ENV = (function() {
  if (/(testing\.)/.test(window.location.href)) {
    return 'testing'
  } else {
    return 'local'
  }
})()

switch (APP_ENV) {
  case 'local':
    commonUrls = {
      urlApi: 'http://localhost:8081'
    }
    break
  case 'production':
    commonUrls = {
      urlApi: 'http://localhost:8081'
    }
    break
}

module.exports = {
  credentials: credentials,
  urls: commonUrls,
  APP_ENV,
  categories: [
    {
      name: 'Bancos',
      catId: 10003,
      checked: false
    },
    {
      name: 'Farmacias',
      catId: 10005,
      checked: false
    },
    {
      name: 'Cafeterias y salones de te',
      catId: 10029,
      checked: false
    },
    {
      name: 'Almacenes',
      catId: 10084,
      checked: false
    },
    {
      name: 'Supermercados',
      catId: 10008,
      checked: false
    },
    {
      name: 'Restaurantes',
      catId: 10004,
      checked: false
    }
  ]
}
