const fs = require('fs')
const test = require('tap').test
const path = require('path')
const delimiter = path.sep
const rootDir = __dirname.split(delimiter).slice(0, -2).join(delimiter)
const pathToFile = path.join(rootDir, 'LICENSE')

test('check if licence file exists', function (t) {
    t.ok(fs.existsSync(pathToFile))
    t.end()
})
