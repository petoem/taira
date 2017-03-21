const Taira = require('../taira.js');
const importer = require('./importer.js');
const exporter = require('./exporter.js');

let testdata = importer.CSV(__dirname + '/data.csv');

Taira.smoothen(testdata, Taira.ALGORITHMS.AVERAGE, 5, 1);

exporter.CSV(__dirname + '/data_avg_5_1.csv', testdata);