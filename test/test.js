const test = require('tape')
const Taira = require('../taira.js')

test('Taira', function (t) {
  t.plan(1)
  t.deepLooseEqual(Taira.from([1, 2, 3, 4, 5]), new Taira(1, 2, 3, 4, 5), 'convert Array to Taira')
})

test('average', function (t) {
  t.plan(6)
  t.throws(() => {
    Taira.smoothen([], Taira.ALGORITHMS.AVERAGE, 1, 1)
  }, 'empty array throws')
  t.throws(() => {
    Taira.smoothen(undefined, Taira.ALGORITHMS.AVERAGE, 1, 1)
  }, 'undefined throws')
  t.throws(() => {
    Taira.smoothen([1, 2, 4, 5], Taira.ALGORITHMS.AVERAGE, 20, 1)
  }, 'too short array for size=20 throws')
  t.equal(Taira.smoothen([1, 2, 3, 4, 5], Taira.ALGORITHMS.AVERAGE, 1, 1).length, 5, 'returned array length equals input array length')
  t.deepLooseEqual(Taira.smoothen([1, 2, 3, 4, 5], Taira.ALGORITHMS.AVERAGE, 1, 1), [1, 2, 3, 4, 5], 'returns expected output')
  t.deepLooseEqual(Taira.smoothen([1, 2, 3, 4, 5], Taira.ALGORITHMS.AVERAGE, 1, 3), [1, 2, 3, 4, 5], 'smoothen multiple times')
})

test('median', function (t) {
  t.plan(6)
  t.throws(() => {
    Taira.smoothen([], Taira.ALGORITHMS.MEDIAN, 1, 1)
  }, 'empty array throws')
  t.throws(() => {
    Taira.smoothen(undefined, Taira.ALGORITHMS.MEDIAN, 1, 1)
  }, 'undefined throws')
  t.throws(() => {
    Taira.smoothen([1, 2, 4, 5], Taira.ALGORITHMS.MEDIAN, 20, 1)
  }, 'too short array for size=20 throws')
  t.equal(Taira.smoothen([1, 2, 3, 4, 5], Taira.ALGORITHMS.MEDIAN, 1, 1).length, 5, 'returned array length equals input array length')
  t.deepLooseEqual(Taira.smoothen([1, 2, 10, 4, 5, 6], Taira.ALGORITHMS.MEDIAN, 2, 1), [1, 2, 4, 5, 5, 6], 'returns expected output')
  t.deepLooseEqual(Taira.smoothen([1, 2, 10, 4, 5, 6], Taira.ALGORITHMS.MEDIAN, 1, 2), [1, 2, 4, 5, 5, 6], 'smoothen multiple times')
})

test('gaussian', function (t) {
  t.plan(5)
  t.throws(() => {
    Taira.smoothen([], Taira.ALGORITHMS.GAUSSIAN, 1, 1)
  }, 'empty array throws')
  t.throws(() => {
    Taira.smoothen(undefined, Taira.ALGORITHMS.GAUSSIAN, 1, 1)
  }, 'undefined throws')
  t.throws(() => {
    Taira.smoothen([1, 2, 4, 5], Taira.ALGORITHMS.GAUSSIAN, 20, 1)
  }, 'too short array for size=20 throws')
  t.equal(Taira.smoothen([1, 2, 3, 4, 5], Taira.ALGORITHMS.GAUSSIAN, 1, 1).length, 5, 'returned array length equals input array length')
  t.deepLooseEqual(Taira.smoothen([1, 2, 3, 4, 5], Taira.ALGORITHMS.GAUSSIAN, 1, 1), [1, 2, 3, 4, 5], 'returns expected output')
})
