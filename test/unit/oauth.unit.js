/**
 * Test cases for OAuth authentication module
 *
 */

const test = require('tap').test
const sinon = require('sinon')
const OAuth = require('./../../lib/utility/request/auth/providers/oauth')
const input = {
  token: 'token'
}

test('oAuth should not throw with valid parameters', (t) => {
  const sandbox = sinon.sandbox.create()

  const validateConfigurationStub = sandbox.stub(OAuth.prototype, 'validateConfiguration')

  const context = {
    validateConfiguration: validateConfigurationStub
  }

  t.doesNotThrow(function () {
    OAuth.call(context, input.token)
  })

  t.ok(validateConfigurationStub.calledOnce, 'validate configuration should be called')

  sandbox.restore()
  t.end()
})

test('oAuth should set proper properties if token is passed', (t) => {
  var oauth

  t.doesNotThrow(function () {
    oauth = new OAuth(input.token)
  })

  t.equal(oauth.token, 'token')

  t.end()
})

test('oAuth should throw if no token is passed', (t) => {
  var oauth

  t.throws(function () {
    oauth = new OAuth()
  }, 'To use oauth you should provide access token!')

  t.end()
})

test('oauth auth should apply key as header', (t) => {
  const sandbox = sinon.sandbox.create()
  const cbSpy = sandbox.spy()
  const context = input
  const requestMock = {
    set: function () { }
  }

  const requestAuthStub = sandbox.stub(requestMock, 'set')

  OAuth.prototype.apply.call(context, requestMock, cbSpy)

  t.ok(cbSpy.calledOnce)
  t.ok(requestAuthStub.calledOnce, 'request "set" should be called')
  t.ok(requestAuthStub.calledWith('Authorization', 'Bearer token'), 'request "set" should be called with the correct parameters')

  sandbox.restore()
  t.end()
})
