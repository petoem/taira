# taira
simple smoothing of one dimensional arrays  

[![GitHub release](https://img.shields.io/github/release/petoem/taira.svg?style=flat-square)](https://github.com/petoem/taira/releases)
[![Travis](https://img.shields.io/travis/petoem/taira.svg?style=flat-square)](https://travis-ci.org/petoem/taira)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](https://standardjs.com)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/petoem/taira/blob/master/LICENSE)  

[![NPM](https://nodei.co/npm/taira.png?downloads=true)](https://www.npmjs.com/package/taira)

## About
Taira enables smoothing of arrays that contain numerical values, using average (mean), median and gaussian filter.

## Usage
``` javascript
const Taira = require('taira')

let arr = [1, 2, 10, 4, 5, 6]

/**
* Static smooth function
* @param {*} array The input data array
* @param {Taira.ALGORITHMS} algorithm The algorithm to use 
* @param {integer} size How many elements before and after (e.g. size=2, means a kernel of 2*size+1)
* @param {integer} pass How often to go over the array
* @param {boolean} circular Joins beginning and end of array, to make the array circular
* @returns {Taira} The smooth array
*/
let foo = Taira.smoothen(arr, Taira.ALGORITHMS.AVERAGE, 1, 1, false)
console.log(foo) // [ 1, 4.333333333333333, 5.333333333333333, 6.333333333333333, 5, 6 ]

// ... and the same for median filtering
foo = Taira.smoothen(arr, Taira.ALGORITHMS.MEDIAN, 2, 1, false)
console.log(`${arr} => ${foo}`) // [1, 2, 10, 4, 5, 6] => [ 1, 2, 4, 5, 5, 6 ]

/*
* ... and gaussian smoothing.
* First integer is the size of the kernel that will be filled with values from a Gaussian distribution.
* Last parameter is the intensity (sigma) of the distribution.
*/
foo = Taira.smoothen(arr, Taira.ALGORITHMS.GAUSSIAN, 2, 0.65, false)
console.log(`${arr} => ${foo}`) // [ 1, 2, 10, 4, 5, 6 ] => [ 1, 2, 7.294375204741146, 5.315049255808814, 5, 6 ]
```

## Extras

Taira inherits from Array, so you can use it like a normal array.
``` javascript
const Taira = require('taira')

let foo = new Taira(1, 2, 3, 4, 5, 6)
let bar = foo.smoothen(Taira.ALGORITHMS.GAUSSIAN, 2, 1.2)
foo.push(10) // ... lets add some more data and recalculate.
bar = foo.smoothen(Taira.ALGORITHMS.GAUSSIAN, 2, 1.2)

// ... or you could do something like this.
let smoothsum = Taira.from([10, 20, 10, 15, 20, 15])
.smoothen(Taira.ALGORITHMS.GAUSSIAN, 2, 0.3)
.reduce((acc, val) => acc + val)
console.log(smoothsum) // 90.05754388528676
```

## Contributing
If you wish to contribute to the code or documentation, feel free to fork the repository and submit a pull request.

## License
MIT © [Michael Petö](https://github.com/petoem)