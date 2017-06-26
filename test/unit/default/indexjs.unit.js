const test = require('tap').test
const fs = require('fs')
const path = require('path')
const utils = require('./utils.js')

test('index.js exports an object with all connector functions attached', (t) => {
  const result = require('../../../index.js')
  const methods = fs.readdirSync(path.join(process.cwd(), 'sdk'))
  t.type(result, 'object')

  methods.forEach(function (method) {
    t.ok(result.hasOwnProperty(utils.trimFuncName(method)))
  });

  t.end()
})