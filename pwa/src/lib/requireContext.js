// This condition actually should detect if it's an Node environment

const fs = require('fs')
const path = require('path')

module.exports = {
  requireContext: function requireContext (base = '.',
    scanSubDirectories = false,
    regularExpression = /\.js$/
  ) {

    const files = {}

    function readDirectory (directory) {
      console.log({LOGGING1111111: directory})
      fs.readdirSync(directory).forEach((file) => {
        const fullPath = path.resolve(directory, file)

        if (fs.statSync(fullPath).isDirectory()) {
          if (scanSubDirectories) readDirectory(fullPath)

          return
        }

        if (!regularExpression.test(fullPath)) return

        files[fullPath] = true
      })
    }

    readDirectory(path.resolve(__dirname, base))

    function Module (file) {
    // console.log({LOGGING: file})
      return require(file)
    }

    Module.keys = () => Object.keys(files)

    return Module
  }
}
