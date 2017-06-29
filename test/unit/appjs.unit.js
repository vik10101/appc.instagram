const fs = require('fs')
const test = require('tap').test
const path = require('path')
const delimiter = path.sep
const rootDir = __dirname.split(delimiter).slice(0, -2).join(delimiter)
const pathToFile = path.join(rootDir, 'app.js')
const sinon = require('sinon')
const mockery = require('mockery')
const Arrow = require('arrow')

// Mock the outter dependeceis in the app.js file
mockery.enable({
  warnOnReplace: false,
  warnOnUnregistered: false
});

const startSpy = sinon.spy()

const arrowStub = sinon.stub(Arrow, 'constructor').callsFake((config, loadOnly) => {
  return {
    start: startSpy
  }
})

mockery.registerMock('arrow', arrowStub)

test('check if app.js file exists', function (t) {
  t.ok(fs.existsSync(pathToFile))
  t.end()
})

const app = require('../../app')

test('called Arrow', function (t) {
  t.ok(arrowStub.calledOnce)
  t.ok(startSpy.calledOnce)
  t.end()
})

test('Remove global stubs and mocks', (t) => {
  mockery.disable()
  arrowStub.restore()
  t.end()
})