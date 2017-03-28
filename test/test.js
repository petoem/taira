const test = require('tape')
const Taira = require('../taira.js')

test('Taira smooth', function (t) {
  t.plan(6)
  t.throws(() => {
    Taira.smoothen([], Taira.ALGORITHMS.AVERAGE, 1, 1)
    Taira.smoothen([1, 2, 4, 5], Taira.ALGORITHMS.AVERAGE, 20, 2)
  }, 'Empty array throws')
  t.throws(() => {
    Taira.smoothen(undefined, Taira.ALGORITHMS.AVERAGE, 1, 1)
  }, 'undefined throws')
  t.throws(() => {
    Taira.smoothen([1, 2, 4, 5], Taira.ALGORITHMS.AVERAGE, 20, 2)
  }, 'Too short array for size=20 throws')
  t.equal(Taira.smoothen([1, 2, 3, 4, 5], Taira.ALGORITHMS.AVERAGE, 1, 1).length, 5, 'Array in/out length')
  t.deepLooseEqual(Taira.from([1, 2, 3, 4, 5]), new Taira(1, 2, 3, 4, 5), 'Convert Array to Taira')
  t.deepLooseEqual(Taira.smoothen([1, 2, 3, 4, 5], Taira.ALGORITHMS.AVERAGE, 1, 1), [ 1, 2, 3, 4, 5 ], 'Expected output')
})
