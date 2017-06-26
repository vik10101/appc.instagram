/**
 * Test cases for api-key authentication module
 *
 */

const test = require('tap').test
const sinon = require('sinon')
const ApiKeyAuth = require('./../../lib/utility/request/auth/providers/api-key')

const input = {
  name: 'name',
  value: 'value'
}

// if no type is passed
test('Api key auth should throw if the required parameters are not passed', (t) => {

  t.throws(function () {
    ApiKeyAuth(input.name, input.value)
  },
  'The type "undefined" for api key authentication is invalid, it must be either "header" or "query".')

  t.end()
})

test('Api key auth should throw if invalid type is passed', (t) => {
  const type = 'invalid'

  t.throws(function () {
    ApiKeyAuth(input.name, input.value, type)
  }, 'The type "' + type + '" for api key authentication is invalid, it must be either "header" or "query".')

  t.end()
})

test('Api key auth not throw if valid type header is passed', (t) => {
  const type = 'header'
  var apiKeyAuth

  t.doesNotThrow(function () { 
    apiKeyAuth = new ApiKeyAuth(input.name, input.value, type)
  }, 'The type "' + type + '" for api key authentication is invalid, it must be either "header" or "query".', 
  'Api-key auth should not throw with valid parameters')

  t.ok(apiKeyAuth)
  t.equal(apiKeyAuth.name, 'name')
  t.equal(apiKeyAuth.value, 'value')
  t.equal(apiKeyAuth.type, 'header')

  t.end()
})

test('Api key auth not throw if valid type query is passed', (t) => {
  const type = 'query'
  var apiKeyAuth

  t.doesNotThrow(function () { 
    apiKeyAuth = new ApiKeyAuth(input.name, input.value, type)
  }, 'The type "' + type + '" for api key authentication is invalid, it must be either "header" or "query".', 
  'Api-key auth should not throw with valid parameters')

  t.ok(apiKeyAuth)
  t.equal(apiKeyAuth.name, 'name')
  t.equal(apiKeyAuth.value, 'value')
  t.equal(apiKeyAuth.type, 'query')

  t.end()
})

test('Api key auth should apply key as header', (t) => {
  const sandbox = sinon.sandbox.create()
  const cbSpy = sandbox.spy()
  const context = {
    name: 'name',
    value: 'value',
    type: 'header'
  }
  const requestMock = {
    query: function () { },
    set: function () { }
  }
  var apiKeyAuth

  const requestSetStub = sandbox.stub(requestMock, 'set')

  ApiKeyAuth.prototype.apply.call(context, requestMock, cbSpy)

  t.ok(cbSpy.calledOnce)
  t.ok(requestSetStub.calledOnce, 'request "set" should be called')
  t.ok(requestSetStub.calledWith('name', 'value'), 'request "set" should be called with the correct parameters')

  sandbox.restore()
  t.end()
})

test('Api key auth should apply key as query', (t) => {
  const sandbox = sinon.sandbox.create()
  const cbSpy = sandbox.spy()
  const context = {
    name: 'name',
    value: 'value',
    type: 'query'
  }
  const requestMock = {
    query: function () { },
    set: function () { }
  }
  var apiKeyAuth

  const requestQueryStub = sandbox.stub(requestMock, 'query')

  ApiKeyAuth.prototype.apply.call(context, requestMock, cbSpy)

  t.ok(cbSpy.calledOnce)
  t.ok(requestQueryStub.calledOnce, 'request "query" should be called')

  sandbox.restore()
  t.end()
})