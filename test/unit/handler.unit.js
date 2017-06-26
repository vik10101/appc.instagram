/**
 * Test cases for CE Handler module
 *
 */

const test = require('tap').test
const sinon = require('sinon')
const cehandler = require('cloudelements-cehandler')
const Handler = require('./../../lib/utility/cehandler/handler')

const options = {
  method: 'get',
  path: 'path',
  parameters: [
    {
      'in': 'header',
      name: 'x-vendor-authorization',
      description: 'The vendor authorization token',
      type: 'string',
      required: true
    },
    {
      'in': 'header',
      name: 'x-vendor-serverAddress',
      required: true
    }
  ]
}

const errObject = {
  httpStatus: 400,
  message: 'Request failed',
  errorType: 'Bad Request'
}

const respData = [{
    status: 'pub',
    type: 'plaintext',
    name: 'Test List'
  },
  {
    status: 'pub',
    type: 'html',
    name: 'Another List'
  },
  {
    status: 'pub',
    type: 'plaintext',
    name: 'Something Else'
}]

const validResponse = {
  resposeData: {
    data: respData,
    returnedCount: 3
  },
  resposeHeaders: {
    "Content-type": "application/json"
  }
}

test('CE Handler constructor should return proper values', (t) => {
  const sandbox = sinon.sandbox.create()

  const params = {
    'x-vendor-authorization': 'auth',
    'x-vendor-serverAddress': 'base_mailchimp'
  }

  const constructorValidatePropertiesStub = sandbox.stub(Handler.prototype, 'validateProperties').callsFake((options, payload) =>
  { })

  const context = {
    validateProperties: constructorValidatePropertiesStub,
    options: options
  }

  const handlerInstance = new Handler(options, params)

  t.equal(typeof handlerInstance, 'object')
  t.ok(handlerInstance.options)
  t.equal(typeof handlerInstance.options, 'object')
  t.equal(handlerInstance.options, options)
  t.ok(handlerInstance.payload)
  t.equal(typeof handlerInstance.payload, 'object')
  t.equal(handlerInstance.payload, params)
  t.ok(constructorValidatePropertiesStub.calledOnce)
  t.ok(constructorValidatePropertiesStub.calledWith())

  sandbox.restore()
  t.end()
})

test('CE Handler property validator should not throw with correct values', (t) => {

  const params = {
    'x-vendor-authorization': 'auth',
    'x-vendor-serverAddress': 'base_mailchimp'
  }

  const context = {
    options: options,
    payload: params
  }

  t.doesNotThrow(function () {
    Handler.prototype.validateProperties.call(context)
  })

  t.end()
})

test('CE Handler property validator should throw if no options are passed', (t) => {
  const params = {
    'x-vendor-authorization': 'auth',
    'x-vendor-serverAddress': 'base_mailchimp'
  }

  const context = {
    payload: params
  }

  t.throws(function () {
    Handler.prototype.validateProperties.call(context)
  }, new Error(`Handler swagger options should be provided and of type 'object'`),
    'Should throw with the correct error message')

  t.end()
})

test('CE Handler property validator should throw if options parameter is not of type object', (t) => {
  const params = {
    'x-vendor-authorization': 'auth'
  }

  const invalidOptions = 'options'

  const context = {
    options: invalidOptions,
    payload: params
  }

  t.throws(function () {
    Handler.prototype.validateProperties.call(context)
  }, new Error(`Handler swagger options should be provided and of type 'object'`),
    'Should throw with the correct error message')

  t.end()
})

test('CE Handler property validator should throw if options parameter does not have required property path', (t) => {
  const params = {
    'x-vendor-authorization': 'auth',
    'x-vendor-serverAddress': 'base_mailchimp'
  }

  const invalidOptions = {
    method: 'get'
  }

  const context = {
    options: invalidOptions,
    payload: params
  }

  t.throws(function () {
    Handler.prototype.validateProperties.call(context)
  }, new Error(`Options method and options path should be provided !`),
    'Should throw with the correct error message')

  t.end()
})

test('CE Handler property validator should throw if options parameter does not have required property method', (t) => {
  const params = {
    'x-vendor-authorization': 'auth'
  }

  const invalidOptions = {
    path: '/path'
  }

  const context = {
    options: invalidOptions,
    payload: params
  }

  t.throws(function () {
    Handler.prototype.validateProperties.call(context)
  }, new Error(`Options method and options path should be provided !`),
    'Should throw with the correct error message')

  t.end()
})

test('CE Handler make request should return fail if invalid request is made', (t) => {
  const sandbox = sinon.sandbox.create()
  const cbSpy = sandbox.spy()
  const innerCbSpy = sandbox.spy()

  const params = {
    'x-vendor-authorization': 'auth',
    'x-vendor-serverAddress': 'base_mailchimp'
  }

  const cbs = {
    requestId: 'operation',
    fail: (err) => {
      const error = transformError(err)

      return cbSpy(error)
    }
  }

  const transformedError = {
    code: 400,
    message: 'Request failed: Bad Request'
  }

  const cehandlerStub = sandbox.stub(cehandler, 'handler').callsFake(function (element) {
    return function (par, cbs) {
      innerCbSpy(cbs.fail(errObject))
    }
  })

  const context = {
    options: options,
    payload: params
  }

  Handler.prototype.makeRequest.call(context, cbSpy)

  t.ok(cbSpy.calledOnce)
  t.ok(cbSpy.calledWith(transformedError))
  t.ok(cehandlerStub.calledOnce)

  sandbox.restore()
  t.end()
})

test('CE Handler make request should return succed if valid request is made', (t) => {
  const sandbox = sinon.sandbox.create()
  const cbSpy = sandbox.spy()
  const innerCbSpy = sandbox.spy()

  const errObject = {
    httpStatus: 400,
    message: 'Request failed',
    errorType: 'Bad Request'
  }

  const transformedError = {
    code: 400,
    message: 'Request failed: Bad Request'
  }

  const params = {
    'x-vendor-authorization': 'auth',
    'x-vendor-serverAddress': 'base_mailchimp'
  }

  const cbs = {
    requestId: 'operation',
    succeed: function (obj) {

      obj = transformResponse(obj)

      return cbSpy(null, obj.resposeData)
    }
  }

  const cehandlerStub = sandbox.stub(cehandler, 'handler').callsFake(function (element) {
    return function (par, cbs) {
      innerCbSpy(cbs.succeed(validResponse))
    }
  })

  const context = {
    options: options,
    payload: params
  }

  Handler.prototype.makeRequest.call(context, cbSpy)

  t.ok(cbSpy.calledOnce)
  t.ok(cbSpy.calledWith(null, validResponse.resposeData))
  t.ok(cehandlerStub.calledOnce)

  sandbox.restore()
  t.end()
})

test('CE Handler make request should return done error if invalid request is made', (t) => {
  const sandbox = sinon.sandbox.create()
  const cbSpy = sandbox.spy()
  const innerCbSpy = sandbox.spy()

  const errObject = {
    httpStatus: 400,
    message: 'Request failed',
    errorType: 'Bad Request'
  }

  const params = {
    'x-vendor-authorization': 'auth',
    'x-vendor-serverAddress': 'base_mailchimp'
  }

  const cbs = {
    requestId: 'operation',
    done: (err, obj) => {
      if (err) {
        const error = transformError(err)

        return callback(error)
      }
      obj = transformResponse(obj)

      callback(null, obj.resposeData)
    }
  }

  const transformedError = {
    code: 400,
    message: 'Request failed: Bad Request'
  }

  const cehandlerStub = sandbox.stub(cehandler, 'handler').callsFake(function (element) {
    return function (par, cbs) {
      innerCbSpy(cbs.done(errObject))
    }
  })

  const context = {
    options: options,
    payload: params
  }

  Handler.prototype.makeRequest.call(context, cbSpy)

  t.ok(cbSpy.calledOnce)
  t.ok(cbSpy.calledWith(transformedError))
  t.ok(cehandlerStub.calledOnce)

  sandbox.restore()
  t.end()
})

test('CE Handler make request should return done if valid request is made', (t) => {
  const sandbox = sinon.sandbox.create()
  const cbSpy = sandbox.spy()
  const innerCbSpy = sandbox.spy()

  const params = {
    'x-vendor-authorization': 'auth',
    'x-vendor-serverAddress': 'base_mailchimp'
  }

  const cbs = {
    requestId: 'operation',
    done: (err, obj) => {
      if (err) {
        const error = transformError(err)

        return cbSpy(error)
      }
      obj = transformResponse(obj)

      return cbSpy(null, obj.resposeData)
    }
  }

  const cehandlerStub = sandbox.stub(cehandler, 'handler').callsFake(function (element) {
    return function (par, cbs) {
      innerCbSpy(cbs.done(null, validResponse))
    }
  })

  const context = {
    options: options,
    payload: params
  }

  Handler.prototype.makeRequest.call(context, cbSpy)

  t.ok(cbSpy.calledOnce)
  t.ok(cbSpy.calledWith(null, validResponse.resposeData))
  t.ok(cehandlerStub.calledOnce)

  sandbox.restore()
  t.end()
})

test('CE Handler should transform the response to object if it is of type string', (t) => {
  const sandbox = sinon.sandbox.create()
  const cbSpy = sandbox.spy()
  const innerCbSpy = sandbox.spy()

  const params = {
    'x-vendor-authorization': 'auth',
    'x-vendor-serverAddress': 'base_mailchimp'
  }

  const stringResponse = JSON.stringify(validResponse)

  const cbs = {
    requestId: 'operation',
    succeed: function (obj) {
      obj = transformResponse(obj)

      return cbSpy(null, obj.resposeData)
    }
  }

  const cehandlerStub = sandbox.stub(cehandler, 'handler').callsFake(function (element) {
    return function (par, cbs) {
      innerCbSpy(cbs.succeed(stringResponse))
    }
  })

  const context = {
    options: options,
    payload: params
  }

  Handler.prototype.makeRequest.call(context, cbSpy)

  t.ok(cbSpy.calledOnce)
  t.ok(cbSpy.calledWith(null, validResponse.resposeData))
  t.ok(cehandlerStub.calledOnce)

  sandbox.restore()
  t.end()
})

test('CE Handler should transform the error to object if it is of type string', (t) => {
  const sandbox = sinon.sandbox.create()
  const cbSpy = sandbox.spy()
  const innerCbSpy = sandbox.spy()

  const params = {
    'x-vendor-authorization': 'auth',
    'x-vendor-serverAddress': 'base_mailchimp'
  }

  const stringError = JSON.stringify(errObject)

  const transformedError = {
    code: 400,
    message: 'Request failed: Bad Request'
  }

  const cbs = {
    requestId: 'operation',
    fail: (err) => {
      const error = transformError(err)

      return cbSpy(error)
    }
  }

  const cehandlerStub = sandbox.stub(cehandler, 'handler').callsFake(function (element) {
    return function (par, cbs) {
      innerCbSpy(cbs.fail(stringError))
    }
  })

  const context = {
    options: options,
    payload: params
  }

  Handler.prototype.makeRequest.call(context, cbSpy)

  t.ok(cbSpy.calledOnce)
  t.ok(cbSpy.calledWith(transformedError))
  t.ok(cehandlerStub.calledOnce)

  sandbox.restore()
  t.end()
})

test('CE Handler should set path parameter if it is passed correctly', (t) => {
  const sandbox = sinon.sandbox.create()
  const cbSpy = sandbox.spy()
  const innerCbSpy = sandbox.spy()

  const optionsWithPathParameter = {
    method: 'get',
    path: '/lists/{id}',
    parameters: [
      {
        'in': 'header',
        name: 'Authorization',
        description: 'The vendor authorization token',
        type: 'string',
        required: true
      },
      {
        'in': 'header',
        name: 'x-vendor-serverAddress',
        required: true
      },
      {
        'in': 'path',
        name: 'id',
        required: true
      }
    ]
  }

  const params = {
    'Authorization': 'auth',
    'x-vendor-serverAddress': 'base_mailchimp',
    id: '4dc5164e1e',
  }

  const stringError = JSON.stringify(errObject)

  const transformedError = {
    code: 400,
    message: 'Request failed: Bad Request'
  }

  const cbs = {
    requestId: 'operation',
    fail: (err) => {
      const error = transformError(err)

      return cbSpy(error)
    }
  }

  const cehandlerStub = sandbox.stub(cehandler, 'handler').callsFake(function (element) {
    return function (par, cbs) {
      innerCbSpy(cbs.fail(stringError))
    }
  })

  const context = {
    options: optionsWithPathParameter,
    payload: params
  }

  Handler.prototype.makeRequest.call(context, cbSpy)

  t.ok(cbSpy.calledOnce)
  t.ok(cbSpy.calledWith(transformedError))
  t.ok(cehandlerStub.calledOnce)

  sandbox.restore()
  t.end()
})

test('CE Handler should throw if url path parameter is not passed', (t) => {
  const sandbox = sinon.sandbox.create()
  const cbSpy = sandbox.spy()
  const innerCbSpy = sandbox.spy()

  const optionsWithPathParameter = {
    method: 'get',
    path: '/lists/{id}',
    parameters: [
      {
        'in': 'header',
        name: 'Authorization',
        description: 'The vendor authorization token',
        type: 'string',
        required: true
      },
      {
        'in': 'header',
        name: 'x-vendor-serverAddress',
        required: true
      },
    ]
  }

  const params = {
    'Authorization': 'auth',
    'x-vendor-serverAddress': 'base_mailchimp'
  }

  const stringError = JSON.stringify(errObject)

  const transformedError = {
    code: 400,
    message: 'Request failed: Bad Request'
  }

  const cbs = {
    requestId: 'operation',
    fail: (err) => {
      const error = transformError(err)

      return cbSpy(error)
    }
  }

  const cehandlerStub = sandbox.stub(cehandler, 'handler').callsFake(function (element) {
    return function (par, cbs) {
      innerCbSpy(cbs.fail(stringError))
    }
  })

  const context = {
    options: optionsWithPathParameter,
    payload: params
  }

  t.throws(function () {
    Handler.prototype.makeRequest.call(context, cbSpy)
  })

  sandbox.restore()
  t.end()
})

test('CE Handler should throw if url path parameter is not passed correctly', (t) => {
  const sandbox = sinon.sandbox.create()
  const cbSpy = sandbox.spy()
  const innerCbSpy = sandbox.spy()

  const optionsWithPathParameter = {
    method: 'get',
    path: '/lists/{id}',
    parameters: [
      {
        'in': 'header',
        name: 'Authorization',
        description: 'The vendor authorization token',
        type: 'string',
        required: true
      },
      {
        'in': 'header',
        name: 'x-vendor-serverAddress',
        required: true
      },
      {
        'in': 'query',
        name: 'id',
        required: true
      }
    ]
  }

  const params = {
    'Authorization': 'auth',
    'x-vendor-serverAddress': 'base_mailchimp',
    ID: '123456789'
  }

  const stringError = JSON.stringify(errObject)

  const transformedError = {
    code: 400,
    message: 'Request failed: Bad Request'
  }

  const cbs = {
    requestId: 'operation',
    fail: (err) => {
      const error = transformError(err)

      return cbSpy(error)
    }
  }

  const cehandlerStub = sandbox.stub(cehandler, 'handler').callsFake(function (element) {
    return function (par, cbs) {
      innerCbSpy(cbs.fail(stringError))
    }
  })

  const context = {
    options: optionsWithPathParameter,
    payload: params
  }

  // path parameters expect parameter 'id', but the user passes 'ID'
  t.throws(function () {
    Handler.prototype.makeRequest.call(context, cbSpy)
  })

  sandbox.restore()
  t.end()
})

test('CE Handler should return fail but not throw if invalid parameters are passed ', (t) => {
  const sandbox = sinon.sandbox.create()
  const cbSpy = sandbox.spy()
  const innerCbSpy = sandbox.spy()

  const optionsWithQueryParameters = {
    method: 'get',
    path: '/lists',
    parameters: [
      {
        'in': 'header',
        name: 'Authorization',
        description: 'The vendor authorization token',
        type: 'string',
        required: true
      },
      {
        'in': 'header',
        name: 'x-vendor-serverAddress',
        required: true
      },
      {
        'in': 'query',
        name: "fields"
      },
      {
        'in': 'query',
        name: "type"
      }
    ]
  }

  const params = {
    'Authorization': 'auth',
    'x-vendor-serverAddress': 'base_mailchimp',
    fields: 'name, type',
    name: 'Djordjano'
  }

  const stringError = JSON.stringify(errObject)

  const transformedError = {
    code: 400,
    message: 'Request failed: Bad Request'
  }

  const cbs = {
    requestId: 'operation',
    fail: (err) => {
      const error = transformError(err)

      return cbSpy(error)
    },
  }

  const cehandlerStub = sandbox.stub(cehandler, 'handler').callsFake(function (element) {
    return function (par, cbs) {
      innerCbSpy(cbs.fail(stringError))
    }
  })

  const context = {
    options: optionsWithQueryParameters,
    payload: params
  }

  t.doesNotThrow(function () {
    Handler.prototype.makeRequest.call(context, cbSpy)
  })

  t.ok(cehandlerStub.calledOnce)
  t.ok(cbSpy.calledOnce)
  t.ok(cbSpy.calledWith(transformedError))

  sandbox.restore()
  t.end()
})

test('CE Handler should set body parameter if it is passed correctly', (t) => {
  const sandbox = sinon.sandbox.create()
  const cbSpy = sandbox.spy()
  const innerCbSpy = sandbox.spy()

  const optionsWithBodyParameter = {
    method: 'post',
    path: '/lists',
    parameters: [
      {
        'in': 'header',
        name: 'Authorization',
        description: 'The vendor authorization token',
        type: 'string',
        required: true
      },
      {
        'in': 'header',
        name: 'x-vendor-serverAddress',
        required: true
      },
      {
        'in': 'body',
        name: 'body',
        required: true
      }
    ]
  }

  const params = {
    'Authorization': 'auth',
    'x-vendor-serverAddress': 'base_mailchimp',
    body: "{\n  \"name\": \"Freddie'''s Favorite Hats\",\n  \"contact\": {\n    \"company\": \"MailChimp\",\n    \"address1\": \"675 Ponce De Leon Ave NE\",\n    \"address2\": \"Suite 5000\",\n    \"city\": \"Atlanta\",\n    \"state\": \"GA\",\n    \"zip\": \"30308\",\n    \"country\": \"US\",\n    \"phone\": \"\"\n  },\n  \"permission_reminder\": \"You'''re receiving this email because you signed up for updates about Freddie'''s newest hats.\",\n  \"campaign_defaults\": {\n    \"from_name\": \"Freddie\",\n    \"from_email\": \"frdie@freddiehats.com\",\n    \"subject\": \"\",\n    \"language\": \"en\"\n  },\n  \"email_type_option\": true\n}"
  }

  const transformedError = {
    code: 400,
    message: 'Request failed: Bad Request'
  }

  const cbs = {
    requestId: 'operation',
    fail: (err) => {
      const error = transformError(err)

      return cbSpy(error)
    }
  }

  const cehandlerStub = sandbox.stub(cehandler, 'handler').callsFake(function (element) {
    return function (par, cbs) {
      innerCbSpy(cbs.fail(errObject))
    }
  })

  const context = {
    options: optionsWithBodyParameter,
    payload: params
  }

  Handler.prototype.makeRequest.call(context, cbSpy)

  t.ok(cbSpy.calledOnce)
  t.ok(cbSpy.calledWith(transformedError))
  t.ok(cehandlerStub.calledOnce)

  sandbox.restore()
  t.end()
})

test('CE Handler should throw if elements.json file does not exists', (t) => {
  const sandbox = sinon.sandbox.create()
  const cbSpy = sandbox.spy()
  const innerCbSpy = sandbox.spy()

  const optionsWithBodyParameter = {
    method: 'post',
    path: '/lists',
    parameters: [
      {
        'in': 'header',
        name: 'Authorization',
        description: 'The vendor authorization token',
        type: 'string',
        required: true
      },
      {
        'in': 'header',
        name: 'x-vendor-serverAddress',
        required: true
      },
      {
        'in': 'body',
        name: 'body',
        required: true
      }
    ]
  }

  const params = {
    'Authorization': 'auth',
    'x-vendor-serverAddress': 'base_mailchimp',
    body: "{\n  \"name\": \"Freddie'''s Favorite Hats\",\n  \"contact\": {\n    \"company\": \"MailChimp\",\n    \"address1\": \"675 Ponce De Leon Ave NE\",\n    \"address2\": \"Suite 5000\",\n    \"city\": \"Atlanta\",\n    \"state\": \"GA\",\n    \"zip\": \"30308\",\n    \"country\": \"US\",\n    \"phone\": \"\"\n  },\n  \"permission_reminder\": \"You'''re receiving this email because you signed up for updates about Freddie'''s newest hats.\",\n  \"campaign_defaults\": {\n    \"from_name\": \"Freddie\",\n    \"from_email\": \"frdie@freddiehats.com\",\n    \"subject\": \"\",\n    \"language\": \"en\"\n  },\n  \"email_type_option\": true\n}"
  }

  const transformedError = {
    code: 400,
    message: 'Request failed: Bad Request'
  }

  const cbs = {
    requestId: 'operation',
    fail: (err) => {
      const error = transformError(err)

      return cbSpy(error)
    }
  }

  const cehandlerStub = sandbox.stub(cehandler, 'handler').callsFake(function (element) {
    return function (par, cbs) {
      innerCbSpy(cbs.fail(errObject))
    }
  })

  const context = {
    options: optionsWithBodyParameter,
    payload: params
  }

  Handler.prototype.makeRequest.call(context, cbSpy)

  t.ok(cbSpy.calledOnce)
  t.ok(cbSpy.calledWith(transformedError))
  t.ok(cehandlerStub.calledOnce)

  sandbox.restore()
  t.end()
})
