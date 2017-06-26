/**
 * Contructor function for http basic authentication
 *
 * @constructor
 * @param {string} username Username for basic authentication
 * @param {string} password Password for basic authentication
 */
var BasicAuthentication = module.exports = function (username, password) {
  this.username = username
  this.password = password

  this.validateConfiguration()
}

/**
 * Checks wether this basic authentication provider has a valid and supported
 * configuration or not.
 *
 * @throws Error Error describing the invalid configuration value
 */
BasicAuthentication.prototype.validateConfiguration = function () {
  if (!this.username) {
    this.username = ''
  }
  if (!this.password) {
    this.password = ''
  }
}

/**
 * Apply http basic auth by delegating to superagent's auth method.
 *
 * @param {Request} request Superagent request object
 * @param {Function} callback Function to call after authentication is applied
 */
BasicAuthentication.prototype.apply = function (request, callback) {
  request.auth(this.username, this.password)

  callback()
}
