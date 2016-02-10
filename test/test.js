const fs = require('fs')
const test = require('tape').test
const imba = require('../')

test('fly-imba', (t) => {
  t.plan(3)

  const file1 = fs.readFileSync('test/a.imba')
  const file2 = fs.readFileSync('test/a.js', 'utf8')

  imba.call({
    filter: function(name, fn) {
      const results = fn(file1)

      t.equal(name, 'imba', 'add imba filter to fly')
      t.equal(results.ext, '.js', 'compiled to ".js" file')
      t.equal(results.code.js, file2, 'compiled to javascript')
    }
  })
})
