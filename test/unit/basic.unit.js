/**
 * Test cases for basic authentication module
 *
 */

const test = require('tap').test
const sinon = require('sinon')
const BasicAuth = require('./../../lib/utility/request/auth/providers/basic')
const input = {
  username: 'user',
  password: 'secret'
}

test('Basic auth should not throw with valid parameters', (t) => {
  const sandbox = sinon.sandbox.create()

  const validateConfigurationStub = sandbox.stub(BasicAuth.prototype, 'validateConfiguration')

  const context = {
    validateConfiguration: validateConfigurationStub
  }

  t.doesNotThrow(function () {
    BasicAuth.call(context, input.username, input.password)
  })

  t.ok(validateConfigurationStub.calledOnce, 'validate configuration should be called')

  sandbox.restore()
  t.end()
})

test('Basic auth should set proper properties if valid parameters are passed', (t) => {
  var basic

  t.doesNotThrow(function () {
    basic = new BasicAuth(input.username, input.password)
  })

  t.equal(basic.username, 'user')
  t.equal(basic.password, 'secret')

  t.end()
})

// Some API's require only username
test('Basic auth should set proper properties if only valid username is passed', (t) => {
  var basic

  t.doesNotThrow(function () {
    basic = new BasicAuth(input.username)
  })

  t.equal(basic.username, 'user')
  t.equal(basic.password, '')

  t.end()
})

test('Basic auth should set proper properties if only valid password is passed', (t) => {
  var basic

  t.doesNotThrow(function () {
    basic = new BasicAuth('', input.password)
  })

  t.equal(basic.username, '')
  t.equal(basic.password, 'secret')

  t.end()
})

test('Basic auth should apply key as header', (t) => {
  const sandbox = sinon.sandbox.create()
  const cbSpy = sandbox.spy()
  const context = input
  const requestMock = {
    auth: function () { }
  }

  const requestAuthStub = sandbox.stub(requestMock, 'auth')

  BasicAuth.prototype.apply.call(context, requestMock, cbSpy)

  t.ok(cbSpy.calledOnce)
  t.ok(requestAuthStub.calledOnce, 'request "auth" should be called')
  t.ok(requestAuthStub.calledWith('user', 'secret'), 'request "auth" should be called with the correct parameters')

  sandbox.restore()
  t.end()
})
