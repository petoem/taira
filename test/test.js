const test = require('tape');
const Taira = require('../taira.js');
const importer = require('./importer.js');

test('Taira smooth', function (t) {
    t.plan(4);
    t.deepLooseEqual(Taira.smoothen([], Taira.ALGORITHMS.AVERAGE, 1, 1), [], 'Empty Array');
    t.equal(Taira.smoothen([1, 2, 3, 4, 5], Taira.ALGORITHMS.AVERAGE, 1, 1).length, 5, 'Array in/out length');
    t.deepLooseEqual(Taira.smoothen(undefined, Taira.ALGORITHMS.AVERAGE, 1, 1), [], 'undefined outputs Array');
    t.deepLooseEqual(Taira.from([1, 2, 3, 4, 5]), new Taira(1, 2, 3, 4, 5), 'Convert Array to Taira');
});