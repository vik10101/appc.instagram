const request = require('superagent')
const auth = require('./auth/auth')

/**
 * Constructor for Requester module
 *
 * @constructor
 * @param {Object} options Request options
 * @param {Object} payload User input
 */

const Requester = module.exports = function (options, payload) {
  const securityDefinitionType = Object.keys(options.securityDefinitions || {})[0]

  this.options = options
  this.authType = validateSecurityType(options)
  this.payload = payload

  this.validateProperties()
}

/**
 * Validate security definition either from path or from global security definition
 *
 * @param {*} options
 */
function validateSecurityType(options) {
  const securityDefinitionType = Object.keys(options.securityDefinitions || {})[0]

  if (options.security) {
    if (options.security.type) {
      return options.security
    } else {
      throw new Error(`Security parameter must have a property 'type'`)
    }
  }

  if (securityDefinitionType) {
    return {
      type: securityDefinitionType
    }
  }
}

/**
 * Validates Requester constructor properties
 */
Requester.prototype.validateProperties = function () {
  const authTypes = ['basic', 'api-key', 'apiKey', 'oauth', 'oauth2', 'oauth_2_0']

  if ((typeof this.options) !== 'object') {
    throw new Error(`Request options should be of type 'object'`)
  }

  if (this.authType) {
    if ((typeof this.authType) !== 'object') {
      throw new Error(`Authentication should be of type 'object'`)
    }
    if (!(authTypes.includes(this.authType.type))) {
      throw new Error('Authentication should be oauth, basic or api-key)')
    }
  }
}

Requester.prototype.makeRequest = function (callback) {
  const options = this.options
  const authStrategy = this.authType
  const data = this.payload
  const securityMetadata = data.security
  var provider

  if (options.parameters.length > 0) {
    parseArguments(options, data)
  }

  const req = requestBuilder(options)

  if (authStrategy) {
    provider = auth.formAuthenticationProviders(this.authType, securityMetadata)
  }

  sendRequest(req, provider, function (err, result) {
    if (err) {
      return callback(err)
    }

    return callback(null, result)
  })
}

/**
 * Parses available arguments and sets them on the options object
 *
 * @param {Object} options
 * @param {Object} data
 */
function parseArguments(options, data) {
  const parameters = options.parameters
  const headers = {}

  options.method = options.method.toUpperCase()

  if (options.uri.indexOf('{') >= 0) {
    const urlParams = options.uri.match(/\{[^}]+\}/g).map(function (uriParams) {
      return uriParams.slice(1, -1)
    })

    urlParams.map(function (currentParam) {
      if (!data[currentParam]) {
        throw new Error(`Required parameter: '${currentParam}' must be provided`)
      }
      options.uri = options.uri.replace(/\{[^}]+\}/, data[currentParam])
      delete data[currentParam]
    })
  }

  if (options.method === 'PUT' || options.method === 'POST' || options.method === 'PATCH') {
    options.body = data
  } else {
    for (var key in data) {
      parameters.map(function (params) {
        if (params.in === 'header') {
          if (params.name === key) {
            headers[key] = data[key]
            delete data[key]
          }
        }
        if (params.name === key) {
          options.uri += options.uri.indexOf('?') >= 0 ? '&' : '?'
          options.uri += key + '=' + encodeURIComponent(data[key] || params.default)
        }
      })

      options.headers = headers
    }
  }
}

/**
 * Creates a new superagent request
 *
 * @param {Object} options Options for the new request
 * @return {Request} The created superagent request
 */
function requestBuilder(options) {
  const methodName = options.method.toLowerCase()
  const contentType = options.contentType ? options.contentType[0] : ''

  if (typeof request[methodName] !== 'function') {
    throw new Error('HTTP method ' + options.method + ' is not supported by superagent.')
  }

  const requester = request[methodName](options.uri)

  // set contentType if there is specific one for the path
  if (contentType && typeof contentType === 'string') {
    requester.type(contentType)
  }

  if (options.body) {
    requester.send(options.body)
  }

  if (options.headers) {
    requester.set(options.headers)
  }

  return requester
}

/*
 * Send the final request if all validations passed
 *
 * @param {Request} request Prepared superagent request
 * @param {Provider} provider Authentication provider
 * @param {Function} callback Callback function
 */
function sendRequest(request, provider, next) {
  // If there is auth provider try to apply the security credentials
  if (provider) {
    provider.apply(request, function (err) {
      if (err) {
        throw new Error(`Authentication build failed: ${err}`)
      }
    })
  }

  request.end(function (err, res) {
    if (err) {
      const error = {
        code: err.status,
        message: err.message
      }

      return next(error)
    }

    if (typeof res.body !== 'object') {
      res.body = JSON.parse(res.body)
    }

    next(null, res.body)
  })
}
