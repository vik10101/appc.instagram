/**
 * Test cases for required modules in package.json
 *
 */

const packageJson = require('./../../package.json')
const test = require('tap').test

test('Check if required npm modules are installed', function(t) {

  t.ok(packageJson.dependencies)
  t.ok(packageJson.dependencies['cloudelements-cehandler'], 'cloudelements-cehandler should be required')
  t.ok(packageJson.dependencies.superagent, 'superagent should be required')
  t.ok(packageJson.scripts)
  t.ok(packageJson.scripts['check-security'])
  t.ok(packageJson.scripts.start)
  t.ok(packageJson.scripts.test)

  t.end()
})
