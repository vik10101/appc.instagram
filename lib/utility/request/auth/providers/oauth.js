/**
 * Contructor function for oauth authentication
 *
 * @constructor
 * @param {*} token Access token for oauth authentication
 */
const OauthAuthentication = module.exports = function (token) {
  this.token = token

  this.validateConfiguration()
}

/**
 * Checks wether this oauth authentication provider has a valid and supported
 * configuration or not.
 *
 * @throws Error Error describing the invalid configuration value
 */
OauthAuthentication.prototype.validateConfiguration = function () {
  if (this.token === undefined || null) {
    throw new Error('To use oauth you should provide access token!')
  }
}

/**
 * Applies the oauth bearer token in the superagent request header
 *
 * @param {Request} request Superagent request object
 * @param {Function} callback Function to call after authentication is applied
 */
OauthAuthentication.prototype.apply = function (request, callback) {
  request.set('Authorization', `Bearer ${this.token}`)

  callback()
}
