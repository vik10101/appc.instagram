/**
 * Test cases for HTTP Requester module
 *
 */

const test = require('tap').test
const sinon = require('sinon')
const superagent = require('superagent')
const Requester = require('./../../lib/utility/request/requester')
const auth = require('./../../lib/utility/request/auth/auth')

const options = {
  path: "/Accounts/{AccountSid}/Messages{mediaTypeExtension}",
  method: "get",
  uri: "https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Messages{mediaTypeExtension}",
  parameters: [
    {
      "in": "path",
      name: "AccountSid",
      required: true,
      type: "string"
    }, {
      "in": "path",
      name: "mediaTypeExtension",
      required: true,
      type: "string"
    }
  ],
  securityDefinitions: {
    basic: {
      type: "basic"
    }
  }
}

const postOptions = {
  path: "/Accounts/{AccountSid}/Messages{mediaTypeExtension}",
  method: "post",
  parameters: [
    {
      "in": "path",
      name: "AccountSid",
      required: true,
      type: "string"
    },
    {
      "in": "path",
      name: "mediaTypeExtension",
      required: true,
      type: "string"
    },
    {
      "in": "formData",
      name: "To",
      required: true,
      type: "string"
    },
    {
      "in": "formData",
      name: "From",
      type: "string"
    },
    {
      "in": "formData",
      name: "MessagingServiceSid",
      type: "string"
    },
    {
      "in": "formData",
      name: "Body",
      type: "string"
    }
  ],
  uri: "https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Messages{mediaTypeExtension}",
  contentType: [
    "application/x-www-form-urlencoded"
  ],
  securityDefinitions: {
    basic: {
      type: "basic"
    }
  }
}

const validResponse = {
  headers: {
    'access-control-allow-methods': 'GET, POST, DELETE',
    'content-type': 'application/json'
  },
  body: {
    messages: [{ message: 1 }, { message: 2 }]
  },
  status: 200
}

const errObject = {
  status: 400,
  errorType: 'Request failed',
  message: 'Bad Request'
}

test('Requester constructor should return proper values with valid parameters', (t) => {
  const sandbox = sinon.sandbox.create()

  const params = {
    AccountSid: 'Account SID',
    mediaTypeExtension: '.json',
    security: {
      username: 'user',
      password: 'password'
    }
  }

  const constructorValidateProperties = sandbox.stub(Requester.prototype, 'validateProperties').callsFake((options, payload) =>
  { })

  const requesterInstance = new Requester(options, params)

  t.equal(typeof requesterInstance, 'object')
  t.ok(requesterInstance.options)
  t.equal(typeof requesterInstance.options, 'object')
  t.equal(requesterInstance.options, options)
  t.ok(requesterInstance.payload)
  t.equal(typeof requesterInstance.payload, 'object')
  t.equal(requesterInstance.payload, params)
  t.ok(requesterInstance.authType)
  t.equal(requesterInstance.authType.type, 'basic')
  t.equal(typeof requesterInstance.authType, 'object')
  t.ok(constructorValidateProperties.calledOnce)
  t.ok(constructorValidateProperties.calledWith())

  sandbox.restore()
  t.end()
})

test('Validate security type should return the proper security type passed', (t) => {
  const params = {
    AccountSid: 'Account SID',
    mediaTypeExtension: '.json',
    security: {
      username: 'user',
      password: 'password'
    }
  }

  const pathOptions = {
    path: "/Accounts/{AccountSid}/Messages{mediaTypeExtension}",
    method: "get",
    uri: "https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Messages{mediaTypeExtension}",
    parameters: [
      {
        "in": "path",
        name: "AccountSid",
        required: true,
        type: "string"
      }, {
        "in": "path",
        name: "mediaTypeExtension",
        required: true,
        type: "string"
      }
    ],
    security: {
      type: 'oauth'
    }
  }

  const requesterInstance = new Requester(pathOptions, params)

  t.equal(typeof requesterInstance, 'object')
  t.ok(requesterInstance.options)
  t.equal(typeof requesterInstance.options, 'object')
  t.equal(requesterInstance.options, pathOptions)
  t.ok(requesterInstance.payload)
  t.equal(typeof requesterInstance.payload, 'object')
  t.equal(requesterInstance.payload, params)
  t.ok(requesterInstance.authType)
  t.equal(requesterInstance.authType.type, 'oauth')
  t.equal(typeof requesterInstance.authType, 'object')

  t.end()
})

test('Validate security type should throw if security params does not have a type property', (t) => {

  const params = {
    AccountSid: 'Account SID',
    mediaTypeExtension: '.json',
    security: {
      username: 'user',
      password: 'password'
    }
  }

  const pathOptions = {
    path: "/Accounts/{AccountSid}/Messages{mediaTypeExtension}",
    method: "get",
    parameters: [
    ],
    security: {
    }
  }

  t.throws(function () {
    Requester(pathOptions, params)
  }, `Swagger definition path should set authentication type!`)

  t.end()
})

test('Requester constructor should throw if invalid ', (t) => {
  const sandbox = sinon.sandbox.create()

  const params = {
    AccountSid: 'Account SID',
    mediaTypeExtension: '.json',
    security: {
      username: 'user',
      password: 'password'
    }
  }

  const invalidOptions = JSON.stringify(options)

  const constructorValidateProperties = sandbox.stub(Requester.prototype, 'validateProperties').throws(new Error(`Request options should be of type 'object'`))

  const context = {
    validateProperties: constructorValidateProperties
  }

  t.throws(function () {
    Requester(invalidOptions, params)
  }, `Request options should be of type 'object'`)

  sandbox.restore()
  t.end()
})

test('Requester property validator should not throw with correct values', (t) => {
  const params = {
    AccountSid: 'Account SID',
    mediaTypeExtension: '.json',
    security: {
      username: 'user',
      password: 'password'
    }
  }

  const context = {
    options: options,
    payload: params
  }

  t.doesNotThrow(function () {
    Requester.prototype.validateProperties.call(context)
  })

  t.end()
})

test('Requester property validator should throw with incorrect options type', (t) => {
  const params = {
    AccountSid: 'Account SID',
    mediaTypeExtension: '.json',
    security: {
      username: 'user',
      password: 'password'
    }
  }

  const invalidOptions = JSON.stringify(options)

  const context = {
    options: invalidOptions,
    payload: params
  }

  t.throws(function () {
    Requester.prototype.validateProperties.call(context)
  }, `Request options should be of type 'object'`, 'Request options should exist and be of type object')

  t.end()
})

test('Requester property validator should throw with incorrect authType type', (t) => {
  const params = {
    AccountSid: 'Account SID',
    mediaTypeExtension: '.json',
    security: {
      username: 'user',
      password: 'password'
    }
  }

  const invalidOptions = {
    authType: 'invalid'
  }

  const context = {
    options: invalidOptions,
    payload: params,
    authType: 'invalid'
  }

  t.throws(function () {
    Requester.prototype.validateProperties.call(context)
  }, `Authentication should be of type 'object'`, 'Request options auth type should be an object')

  t.end()
})

test('Requester property validator should throw with incorrect authType type', (t) => {
  const params = {
    AccountSid: 'Account SID',
    mediaTypeExtension: '.json',
    security: {
      username: 'user',
      password: 'password'
    }
  }

  const context = {
    options: options,
    payload: params,
    authType: {
      type: 'invalid'
    }
  }

  t.throws(function () {
    Requester.prototype.validateProperties.call(context)
  }, `'Authentication should be oauth, basic or api-key)'`, 'Request options auth type should be an object')

  t.end()
})

test('Requester make request should return successful response if valid request is made', (t) => {
  const sandbox = sinon.sandbox.create()
  const cbSpy = sandbox.spy()
  const authCbSpy = sandbox.spy()

  const params = {
    AccountSid: 'Account SID',
    mediaTypeExtension: '.json',
    security: {
      username: 'user',
      password: 'password'
    }
  }

  // Stubs
  const authStub = sandbox.stub(auth, 'formAuthenticationProviders').callsFake(() => {
    return {
      apply: function (req, authCbSpy) {
        authCbSpy()
      }
    }
  })

  const superagentStub = sandbox.stub(superagent, 'get').callsFake(() => {
    return {
      set: function () { },
      auth: function () { },
      end: function (cbSpy) {
        cbSpy(null, validResponse)
      }
    }
  })

  const context = {
    options: options,
    payload: params,
    authType: {
      type: 'basic'
    }
  }

  t.doesNotThrow(function () {
    Requester.prototype.makeRequest.call(context, cbSpy)
  })

  t.ok(superagentStub.calledOnce)
  t.ok(authStub.calledOnce)
  t.equal(authStub.args[0].length, 2, 'Should be called with 2 paramters')
  t.notOk(authCbSpy.called, 'Should not be called if there is no auth error')
  t.ok(cbSpy.calledOnce)
  t.ok(cbSpy.calledWith(null, validResponse.body))

  sandbox.restore()
  t.end()
})

test('Requester make request should return successful response in proper format when response body is of type string', (t) => {
  const sandbox = sinon.sandbox.create()
  const cbSpy = sandbox.spy()
  const authCbSpy = sandbox.spy()

  const params = {
    AccountSid: 'Account SID',
    mediaTypeExtension: '.json',
    security: {
      username: 'user',
      password: 'password'
    }
  }

  const stringResponse = validResponse
  stringResponse.body = JSON.stringify(validResponse.body)

  // Stubs
  const authStub = sandbox.stub(auth, 'formAuthenticationProviders').callsFake(() => {
    return {
      apply: function (req, authCbSpy) {
        authCbSpy()
      }
    }
  })

  const superagentStub = sandbox.stub(superagent, 'get').callsFake(() => {
    return {
      set: function () { },
      auth: function () { },
      end: function (cbSpy) {
        cbSpy(null, stringResponse)
      }
    }
  })

  const context = {
    options: options,
    payload: params,
    authType: {
      type: 'basic'
    }
  }

  t.doesNotThrow(function () {
    Requester.prototype.makeRequest.call(context, cbSpy)
  })

  t.ok(superagentStub.calledOnce)
  t.ok(authStub.calledOnce)
  t.equal(authStub.args[0].length, 2, 'Should be called with 2 paramters')
  t.notOk(authCbSpy.called, 'Should not be called if there is no auth error')
  t.ok(cbSpy.calledOnce)
  t.ok(cbSpy.calledWith(null, validResponse.body))

  sandbox.restore()
  t.end()
})

test('Requester make request should return error in proper format if invalid request is made', (t) => {
  const sandbox = sinon.sandbox.create()
  const cbSpy = sandbox.spy()
  const authCbSpy = sandbox.spy()

  const params = {
    AccountSid: 'Account SID',
    mediaTypeExtension: '.json',
    security: {
      username: 'user',
      password: 'password'
    }
  }

  const respError = {
    code: 400,
    message: 'Bad Request'
  }

  // Stubs
  const authStub = sandbox.stub(auth, 'formAuthenticationProviders').callsFake(() => {
    return {
      apply: function (req, authCbSpy) {
        authCbSpy()
      }
    }
  })

  const superagentStub = sandbox.stub(superagent, 'get').callsFake(() => {
    return {
      set: function () { },
      auth: function () { },
      end: function (cbSpy) {
        cbSpy(errObject)
      }
    }
  })

  const context = {
    options: options,
    payload: params,
    authType: {
      type: 'basic'
    }
  }

  t.doesNotThrow(function () {
    Requester.prototype.makeRequest.call(context, cbSpy)
  })

  t.ok(superagentStub.calledOnce)
  t.ok(authStub.calledOnce)
  t.equal(authStub.args[0].length, 2, 'Should be called with 2 paramters')
  t.notOk(authCbSpy.called, 'Should not be called if there is no auth error')
  t.ok(cbSpy.calledOnce)
  t.ok(cbSpy.calledWith(respError))

  sandbox.restore()
  t.end()
})

test('Requester should throw if not all required path parameters are passed', (t) => {
  const sandbox = sinon.sandbox.create()
  const cbSpy = sandbox.spy()

  const params = {
    AccountSid: 'Account SID',
    mediaTypeExtension: '.json',
    security: {
      username: 'user',
      password: 'password'
    }
  }

  const pathOptions = {
    path: "/Accounts/{AccountSid}/Messages/{messageId}/{mediaTypeExtension}",
    method: "get",
    uri: "https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Messages/{messageId}{mediaTypeExtension}",
    parameters: [
      {
        "in": "path",
        name: "AccountSid",
        required: true,
        type: "string"
      }, {
        "in": "path",
        name: "mediaTypeExtension",
        required: true,
        type: "string"
      }
    ],
    security: {
      type: 'oauth'
    }
  }
  // Stubs
  const authStub = sandbox.stub(auth, 'formAuthenticationProviders').callsFake(() => {
    return {
      apply: function (req, authCbSpy) {
        authCbSpy()
      }
    }
  })

  const superagentStub = sandbox.stub(superagent, 'get').callsFake(() => {
    return {
      set: function () { },
      auth: function () { },
      end: function (cbSpy) {
        cbSpy(errObject)
      }
    }
  })

  const context = {
    options: pathOptions,
    params: params,
    payload: {
      type: 'basic'
    }
  }

  t.throws(function () {
    Requester.prototype.makeRequest.call(context, cbSpy)
  }, `Required parameter: 'messageId' must be provided`)

  sandbox.restore()
  t.end()
})

test('Requester should set content-type and body parameters if passed', (t) => {
  const sandbox = sinon.sandbox.create()
  const cbSpy = sandbox.spy()

  const sendMessageData = {
    AccountSid: 'AccountSid',
    mediaTypeExtension: '.json',
    security: {
      username: 'user',
      password: 'pass'
    },
    From: 'fromNumber',
    To: 'toNumber',
    Body: 'Test'
  }

  // Stubs
  const authStub = sandbox.stub(auth, 'formAuthenticationProviders').callsFake(() => {
    return {
      apply: function (req, authCbSpy) {
        cbSpy(req)
      }
    }
  })

  const superagentStub = sandbox.stub(superagent, 'post').callsFake(() => {
    return {
      set: function () { },
      auth: function () { },
      type: function () { },
      send: function () { },
      end: function (cbSpy) {
        cbSpy(errObject)
      }
    }
  })

  const context = {
    options: postOptions,
    payload: sendMessageData
  }

  t.doesNotThrow(function () {
    Requester.prototype.makeRequest.call(context, cbSpy)
  })

  sandbox.restore()
  t.end()
})

test('Requester should set propery content-type', (t) => {
  const sandbox = sinon.sandbox.create()
  const cbSpy = sandbox.spy()

  const sendMessageData = {
    AccountSid: 'AccountSid',
    mediaTypeExtension: '.json',
    security: {
      username: 'user',
      password: 'pass'
    },
    From: 'fromNumber',
    To: 'toNumber',
    Body: 'Test'
  }

  // Stubs
  const authStub = sandbox.stub(auth, 'formAuthenticationProviders').callsFake(() => {
    return {
      apply: function (req, authCbSpy) {
        cbSpy(req)
      }
    }
  })

  const superagentStub = sandbox.stub(superagent, 'post').callsFake(() => {
    return {
      set: function () { },
      auth: function () { },
      type: function (options) { cbSpy(options) },
      send: function () { },
      end: function () {
      }
    }
  })

  const context = {
    options: postOptions,
    payload: sendMessageData,
    authType: {
      type: 'basic'
    }
  }

  t.doesNotThrow(function () {
    Requester.prototype.makeRequest.call(context, cbSpy)
  })

  const contentType = cbSpy.args[0][0]

  t.ok(superagentStub.calledOnce)
  t.notEqual(contentType, 'application/json', 'Should not be application/json if content-type is set')
  t.equal(contentType, 'application/x-www-form-urlencoded', 'Requester must set proper contentType')

  sandbox.restore()
  t.end()
})

test('Requester should set header parameters to requester set function', (t) => {
  const sandbox = sinon.sandbox.create()
  const cbSpy = sandbox.spy()

  const headerOptions = {
    path: "/Accounts/Messages{mediaTypeExtension}",
    method: "get",
    uri: "https://api.twilio.com/2010-04-01/Accounts",
    parameters: [
      {
        "in": "header",
        name: "AccountSid",
        required: true,
        type: "string"
      },
      {
        "in": "query",
        name: "mediaTypeExtension",
        required: true,
        type: "string"
      }],
    securityDefinitions: {
      basic: {
        type: "basic"
      }
    }
  }

  const params = {
    AccountSid: 'Account SID',
    mediaTypeExtension: '.json',
    security: {
      username: 'user',
      password: 'password'
    }
  }

  const expectedResponse = {
    AccountSid: 'Account SID'
  }

  // Stubs
  const authStub = sandbox.stub(auth, 'formAuthenticationProviders').callsFake(() => {
    return {
      apply: function (req, authCbSpy) {
        authCbSpy()
      }
    }
  })

  const superagentStub = sandbox.stub(superagent, 'get').callsFake(() => {
    return {
      set: function (options) { cbSpy(options) },
      auth: function () { },
      type: function () { },
      send: function () { },
      end: function () { }
    }
  })

  const context = {
    options: headerOptions,
    payload: params,
    authType: {
      type: 'basic'
    }
  }

  t.doesNotThrow(function () {
    Requester.prototype.makeRequest.call(context, cbSpy)
  })

  const headers = cbSpy.args[0][0]

  t.ok(cbSpy.calledOnce)
  t.same(headers, expectedResponse, 'Only Header fields should be passed')

  sandbox.restore()
  t.end()
})

test('Requester should set body parameters to requester send function', (t) => {
  const sandbox = sinon.sandbox.create()
  const cbSpy = sandbox.spy()

  const params = {
    AccountSid: 'AccountSid',
    mediaTypeExtension: '.json',
    security: {
      username: 'user',
      password: 'pass'
    },
    From: 'fromNumber',
    To: 'toNumber',
    Body: 'Test'
  }

  // Stubs
  const authStub = sandbox.stub(auth, 'formAuthenticationProviders').callsFake(() => {
    return {
      apply: function (req, authCbSpy) {
        authCbSpy()
      }
    }
  })

  const superagentStub = sandbox.stub(superagent, 'post').callsFake(() => {
    return {
      set: function () { },
      auth: function () { },
      type: function () { },
      send: function (options) { cbSpy(options) },
      end: function () { }
    }
  })

  const context = {
    options: postOptions,
    payload: params,
    authType: {
      type: 'basic'
    }
  }

  t.doesNotThrow(function () {
    Requester.prototype.makeRequest.call(context, cbSpy)
  })

  const body = cbSpy.args[0][0]

  t.ok(cbSpy.calledOnce)
  t.equal(body.Body, 'Test')
  t.equal(body.From, 'fromNumber')
  t.equal(body.To, 'toNumber')

  sandbox.restore()
  t.end()
})

test('Authentication apply should throw if there is an error', (t) => {
  const sandbox = sinon.sandbox.create()
  const cbSpy = sandbox.spy()

  const params = {
    AccountSid: 'Account SID',
    mediaTypeExtension: '.json',
    security: {
      username: 'user',
      password: 'password'
    }
  }

  // Stubs
  const authStub = sandbox.stub(auth, 'formAuthenticationProviders').callsFake(() => {
    return {
      apply: function (req, cbSpy) {
        cbSpy('authFailed')
      }
    }
  })

  const superagentStub = sandbox.stub(superagent, 'get').callsFake(() => {
    return {
      set: function () { },
      auth: function () { },
      type: function () { },
      send: function () { },
      end: function () { }
    }
  })

  const context = {
    options: options,
    payload: params,
    authType: {
      type: 'api-key'
    }
  }

  t.throws(function () {
    Requester.prototype.makeRequest.call(context, cbSpy)
  })

  sandbox.restore()
  t.end()
})
