/**
 * Test cases for form authentication provider module
 *
 */

const test = require('tap').test
const sinon = require('sinon')
const ApiKeyAuth = require('./../../lib/utility/request/auth/providers/api-key')
const BasicAuth = require('./../../lib/utility/request/auth/providers/basic')
const OAuth = require('./../../lib/utility/request/auth/providers/oauth')
const mockery = require('mockery')

// Mock the outter dependeceis in the auth.js file
mockery.enable({
  warnOnReplace: false,
  warnOnUnregistered: false
});

const apiKeyStub = sinon.stub(ApiKeyAuth, 'constructor').callsFake((name, value, i) => {
  return { type: 'api-key'}
})
const basicAuthStub = sinon.stub(BasicAuth, 'constructor').callsFake((username, password) => {
  return { type: 'basic'}
})
const oAuthStub = sinon.stub(OAuth, 'constructor').callsFake((token) => {
  return { type: 'oauth'}
})

mockery.registerMock('./providers/api-key', apiKeyStub)
mockery.registerMock('./providers/basic', basicAuthStub)
mockery.registerMock('./providers/oauth', oAuthStub)
const auth = require('./../../lib/utility/request/auth/auth').formAuthenticationProviders

test('Authentication provider should return null if no valid auth parameters are passed', (t) => {
  const invalidAuthProvider = {
    type: 'invalid'
  }

  const provider = auth(invalidAuthProvider)

  t.equal(provider, null)
  t.end()
})

test('Authentication provider should return api-key authentication if api-key auth configuration is passed', (t) => {
  const apiKeyAuth = {
    type: 'api-key',
    name: 'key',
    in: 'query'
  }

  const securityMetadata = {
    value: 'keyValye'
  }

  const provider = auth(apiKeyAuth, securityMetadata)

  t.equal(provider.type, 'api-key')

  t.end()
})

test('Authentication provider should return api-basic authentication if basic auth configuration is passed', (t) => {
  const basicAuth = {
    type: 'basic'
  }

  const securityMetadata = {
    username: 'user',
    password: 'password'
  }

  const provider = auth(basicAuth, securityMetadata)

  t.equal(provider.type, 'basic')

  t.end()
})

test('Authentication provider should return oAuth authentication if oAuth auth configuration is passed', (t) => {
  const oAuth = {
    type: 'oauth'
  }

  const securityMetadata = {
    token: 'token',
  }

  const provider = auth(oAuth, securityMetadata)

  t.equal(provider.type, 'oauth')

  t.end()
})

test('Remove global stubs and mocks', (t) => {
  mockery.disable()

  t.end()
})
