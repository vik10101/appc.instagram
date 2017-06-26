const Ajv = require('ajv')
const path = require('path')

module.exports = {
  validateResult : validateResult,
  trimFuncName : trimFuncName,
  getType : getType
}

function validateResult(data) {
  var ajv = new Ajv()

  var metaSchema = require('ajv/lib/refs/json-schema-draft-04.json')
  ajv.addMetaSchema(metaSchema)
  ajv._opts.defaultMeta = metaSchema.id

  // optional, using unversioned URI is out of spec, see https://github.com/json-schema-org/json-schema-spec/issues/216
  ajv._refs['http://json-schema.org/schema'] = 'http://json-schema.org/draft-04/schema'

  // Optionally you can also disable keywords defined in draft-06
  ajv.removeKeyword('propertyNames')
  ajv.removeKeyword('contains')
  ajv.removeKeyword('const')

  return ajv.validate(require(path.join(process.cwd(), 'connector.schema.json')), data)
}

function trimFuncName(name) {
  if (name.substring(name.length - 3) === '.js') {
    return name.slice(0, -3)
  }
  return name
}

function getType(element) {
    return element.type === 'string' ? '' : {}
  }