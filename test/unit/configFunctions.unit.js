const test = require('tap').test
const fs = require('fs')
const path = require('path')
const delimiter = path.sep
const rootDir = __dirname.split(delimiter).slice(0, -2).join(delimiter)
const configPath = path.join(rootDir, 'conf', 'config')
const config = require(configPath)
const sdkPath = path.join(rootDir, 'sdk')
var endpointsCount = 0

test('Check functions in config.js', (t) => {
  const endpoints = Object.values(config)
  endpoints.forEach((endpoint) => {
    if (typeof endpoint === 'object' && endpoint.hasOwnProperty('path')) {
      endpointsCount += 1
    }
  })

  fs.readdir(sdkPath, (err, files) => {
    t.equals(files.length, endpointsCount)
    t.end()
  })
})