const test = require('tap').test
const fs = require('fs')
const path = require('path')
const utils = require('./utils.js')

test('Package.json should be present and have all required packages', (t) => {
  const packageJson = require('../../../package.json')
  t.ok(packageJson)
  t.ok(packageJson.devDependencies)
  t.ok(packageJson.devDependencies.ajv)
  t.ok(packageJson.devDependencies.arrow)
  t.ok(packageJson.devDependencies.fs)
  t.ok(packageJson.devDependencies.husky)
  t.ok(packageJson.devDependencies.mockery)
  t.ok(packageJson.devDependencies.nsp)
  t.ok(packageJson.devDependencies.nyc)
  t.ok(packageJson.devDependencies.request)
  t.ok(packageJson.devDependencies.retire)
  t.ok(packageJson.devDependencies.sinon)
  t.ok(packageJson.devDependencies.snazzy)
  t.ok(packageJson.devDependencies.standard)
  t.ok(packageJson.devDependencies.tap)

  t.end()
})

test('sdk, lib & conf folders are present', (t) => {
  t.ok(fs.existsSync(path.join(process.cwd(), 'lib')))
  t.ok(fs.existsSync(path.join(process.cwd(), 'sdk')))
  t.ok(fs.existsSync(path.join(process.cwd(), 'conf')))
  t.doesNotThrow(() => {
    fs.accessSync(path.join(process.cwd(), 'lib'), fs.constants.R_OK | fs.constants.W_OK)
  }, 'User should have r/w access to the lib folder')
  t.doesNotThrow(() => {
    fs.accessSync(path.join(process.cwd(), 'sdk'), fs.constants.R_OK | fs.constants.W_OK)
  }, 'User should have r/w access to the sdk folder')
  t.doesNotThrow(() => {
    fs.accessSync(path.join(process.cwd(), 'conf'), fs.constants.R_OK | fs.constants.W_OK)
  }, 'User should have r/w access to the conf folder')
  t.end()
})

test('Connector descriptor is present and valid', (t) => {
  var files = fs.readdirSync(process.cwd())
  files = files.filter(f => f.endsWith('.json') && f != 'connector.schema.json' && f != 'package.json')
  var connectorDescrPath = files[0]

  const descriptor = require(path.join(process.cwd(), connectorDescrPath))
  t.ok(descriptor)
  t.equal(utils.validateResult(descriptor), true)
  t.end()
})

test('Documentation file is present and not empty', (t) => {
  const docsPath = path.join(process.cwd(), 'documentation.md')
  const stat = fs.statSync(docsPath)
  t.ok(stat.size)

  t.end()
})

test('test all methods', (t) => {
  const source = require(path.join(process.cwd(), 'conf/config.js')).source
  const methods = fs.readdirSync(path.join(process.cwd(), 'sdk'))

  if (source === 'webAPI') {
    methods.forEach(function (method) {
      if (method.endsWith('.js')) {
        const testGetMethods = require('./webAPI.methods.template.js')
        testGetMethods(utils.trimFuncName(method))
      }
    })
  } else {

    const filePath = __dirname.replace('test/unit/default', 'conf/elements.json')
    var element

    if (fs.statSync(filePath)) {
      try {
        element = require(filePath)
      } catch (E) {
        console.log(E)
        t.end()
      }
    }

    t.ok(element)
    t.equal(typeof element, 'object')
    t.ok(element, 'element.json file is not empty')
    t.ok(element.configuration, 'Should have configuration property')
    t.ok(element.description, 'Should have description property')
    t.ok(element.authentication, 'Should have authentication property')
    t.ok(element.resources, 'Should have resources property')

    methods.forEach(function (method) {
      if (method.endsWith('.js')) {
        const testGetMethods = require('./CE.methods.template.js')
        testGetMethods(utils.trimFuncName(method))
      }
    });
  }

  t.end()
})
