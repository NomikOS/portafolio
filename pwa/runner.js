const cypress = require('cypress')

setInterval(() => {

  cypress.run({
    spec: './tests/e2e/specs/home.spec.js'
  })
    .then((results) => {
      // console.log(results)
    })
    .catch((err) => {
      // console.error(err)
    })
}, 5000)
