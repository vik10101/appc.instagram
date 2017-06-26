const cehandler = require('cloudelements-cehandler')
const path = __dirname.replace('lib/utility/cehandler', 'conf/elements.json')
const fs = require('fs')
var element

if (fs.existsSync(path)) {
  try {
    element = require(path)
  } catch (E) {
    throw new Error(`Cloud Elements connector descriptor file "elements.json" file should be provided in ./conf directory of the project!/n ${E}`)
  }
}

/**
 * Constructor for Handler module
 *
 * @constructor
 * @param {Object} options Request options
 * @param {Object} payload User input
 */
const Requester = module.exports = function (options, payload) {
  this.options = options
  this.payload = payload

  this.validateProperties()
}

/**
 * Executor function for the Cloud Elements handler
 *
 * @param {Function} callback Callback function
 */
Requester.prototype.makeRequest = function (callback) {
  const request = ceRequestBuilder(this.options, this.payload)
  const handler = cehandler.handler(element)

  handler(request, {
    requestId: this.options.operationId || 'operation',
    succeed: function (obj) {
      obj = transformResponse(obj)

      callback(null, obj.resposeData)
    },
    fail: (err) => {
      const error = transformError(err)

      return callback(error)
    },
    done: (err, obj) => {
      if (err) {
        const error = transformError(err)

        return callback(error)
      }
      obj = transformResponse(obj)

      callback(null, obj.resposeData)
    }
  })
}

/**
 * Validates Requester constructor properties
 */
Requester.prototype.validateProperties = function () {
  if (!this.options || (typeof this.options) !== 'object') {
    throw new Error(`Handler swagger options should be provided and of type 'object'`)
  }

  if (!this.options.method || !this.options.path) {
    throw new Error('Options method and options path should be provided !')
  }
}

/**
 * Creates new Cloud Elements request
 *
 * @param {Object} options Request options
 * @param {Object} payload User input
 */
function ceRequestBuilder (options, payload) {
  const method = options.method.toUpperCase()
  const parameters = options.parameters || {}
  const requestOptions = {
    operation: {
      method: options.method.toUpperCase(),
      path: options.path
    },
    body: {},
    sql: ''
  }

  if (method === 'PUT' || method === 'POST' || method === 'PATCH') {
    requestOptions.body = addBody(parameters, payload)
  }

  requestOptions.paths = addPaths(options, payload)

  requestOptions.headers = addHeaders(parameters, payload)

  requestOptions.queryOptions = addQueryOptions(parameters, payload)

  requestOptions.sql = addSql(parameters, payload)

  return requestOptions
}

/**
 * The field values for tokenized path parameters
 *
 * @param {Object} options Request options
 * @param {Object} data User input
 */
function addPaths (options, data) {
  const paths = {}

  if (options.path.indexOf('{') >= 0) {
    const urlParams = options.path.match(/\{[^}]+\}/g).map(function (pathParams) {
      return pathParams.slice(1, -1)
    })

    urlParams.map(function (param) {
      if (!data[param]) {
        throw new Error(`Required parameter: '${param}' must be provided`)
      }
      paths[param] = data[param]
      delete data[param]
    })
  }

  return paths
}

/**
 * Any headers sent to the URL
 *
 * @param {Object} parameters Provided option parameters
 * @param {Object} data User input data
 * @return {Object} The created headers object for the Cloud Elements module
 */
function addHeaders (parameters, data) {
  const headers = {}

  for (var key in data) {
    parameters.map(function (param) {
      if (param.name === key && param.in === 'header') {
        if (key === 'x-vendor-authorization' || key === 'Authorization') {
          data[key] = 'Bearer ' + data[key]
        }
        headers[key] = data[key]
      }
    })
  }

  return headers
}

/**
 * The raw HTTP body
 *
 * @param {Object} parameters Provided option parameters
 * @param {Object} data User input data
 */
function addBody (parameters, data) {
  let body

  for (var key in data) {
    parameters.map(function (param) {
      if (param.name === key && param.in === 'body') {
        body = data[key]
      }
    })
  }

  return body
}

/**
 * Parameters that would go on the query part of a URL
 *
 * @param {Object} parameters Provided option parameters
 * @param {Object} data User input data
 */
function addQueryOptions (parameters, data) {
  const queryParameters = {}

  for (var key in data) {
    parameters.map(function (param) {
      if (param.name === key && param.in === 'query') {
        queryParameters[key] = data[key]
      }
    })
  }

  return queryParameters
}

// TODO: Could not test it without actual swagger definition with sql fields etc.
/**
* Only used when connecting to SQL elements
*
* @param {Object} parameters Provided option parameters
* @param {Object} data User input data
*/
function addSql (parameters, data) {
  let sql = ''

  for (var key in data) {
    parameters.map(function (param) {
      if (param.name === key && param.in === 'sql') {
        sql += data[key]
      }
    })
  }

  return sql
}

/**
 * Transforms error message to valid format
 *
 * @param {String} err
 */
function transformError (err) {
  let error

  if (typeof err === 'string') {
    err = JSON.parse(err)
  }

  error = {
    code: err.httpStatus,
    message: `${err.message}: ${err.errorType}`
  }

  return error
}

/**
 * Transforms modules response if it is not an onject
 *
 * @param {*} resp
 */
function transformResponse (resp) {
  if (typeof resp !== 'object') {
    resp = JSON.parse(resp)
  }

  return resp
}
