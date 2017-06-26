const fs = require('fs')
const path = require('path')

/**
 * This file registers all functions, and returns an Object, that has them attachd
 * as its parameters. Call invoke() Function to get the object.
 *
 * @todo update the lib, to add helper methods such as validate schema, getSchema etc.
 */
module.exports.invoke = function () {
  let fns = functionList()
  let object = {}

  fns.forEach((item, index) => {
    let fnName = item.replace(/.js/, '')
    let fnPath = path.join(__dirname, '../', 'sdk') + '/' + item
    object[fnName] = require(fnPath)
  })
  return object
}

function functionList () {
  const dir = path.join(__dirname, '../', 'sdk')
  let fns
  try {
    fs.statSync(dir)
    let dirFiles = fs.readdirSync(dir)
    if (dirFiles) {
      fns = dirFiles
    } else {
      throw new Error('Functions folder is Empty!')
    }
  } catch (e) {
    throw new Error(e)
  }
  return fns
}
