const ApiKeyAuthentication = require('./providers/api-key')
const BasicAuthentication = require('./providers/basic')
const OauthAuthentication = require('./providers/oauth')

module.exports = {
  formAuthenticationProviders: formAuthenticationProviders
}

/**
 *
 * @param {*} authProvider
 * @param {Object} securityMetadata
 * @return {Provider} The conscructed authentication provider
 */
function formAuthenticationProviders (authProvider, securityMetadata) {
  const provider = selectAuthenticationProvider(authProvider, securityMetadata)

  return provider
}

/**
 *
 * @param {Object} providerConfig
 * @return {*} The constructed authentication provider
 */
function selectAuthenticationProvider (providerConfig, securityMetadata) {
  if (providerConfig.type === 'api-key' || providerConfig.type === 'apiKey') {
    return new ApiKeyAuthentication(providerConfig.name, securityMetadata.value, providerConfig.in)
  }
  if (providerConfig.type === 'basic') {
    return new BasicAuthentication(securityMetadata.username, securityMetadata.password)
  }
  if (providerConfig.type === 'oauth' || providerConfig.type === 'oauth2') {
    return new OauthAuthentication(securityMetadata.token)
  }

  return null
}
