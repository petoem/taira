# taira
simple smoothing of one dimensional arrays

## About
Taira enables smoothing of arrays that contain numerical values, using average (mean), median and gaussian filter.

## Usage
``` javascript
const Taira = require('taira');

let arr = [1, 2, 10, 4, 5, 6];

/**
* Static smooth function
* @param {*} array The input data array
* @param {Taira.ALGORITHMS} algorithm The algorithm to use 
* @param {integer} size How many elements before and after (e.g. size=2, means a kernel of 2*size+1)
* @param {integer} pass How often to go over the array
* @param {boolean} circular Joins beginning and end of array, to make the array circular
* @returns {*} The smoothen input array
*/
let foo = Taira.smoothen(arr, Taira.ALGORITHMS.AVERAGE, 1, 1, false);

console.log(foo);

// ... and the same for median filtering
Taira.smoothen(arr, Taira.ALGORITHMS.MEDIAN, 2, 1, false);

/*
* ... and gaussian smoothing.
* First integer is the size of the kernel that will be filled with values from a Gaussian distribution.
* Last parameter is the intensity (sigma) of the distribution.
*/
Taira.smoothen(arr, Taira.ALGORITHMS.GAUSSIAN, 2, 1, false);
```

## Extras

Taira inherits from Array, so you can use it like a normal array.
``` javascript
const Taira = require('taira');

let foo = new Taira(1, 2, 3, 4, 5);
let bar = foo.smoothen(Taira.ALGORITHMS.GAUSSIAN, 2, 1.2);
foo.push(10); // ... lets add some more data and recalculate.
bar = foo.smoothen(Taira.ALGORITHMS.GAUSSIAN, 2, 1.2);

// ... or you could do something like this.
let smoothsum = Taira.from([10, 20, 10, 15, 20])
.smoothen(Taira.ALGORITHMS.GAUSSIAN, 2, 0.3)
.reduce((acc, val) => acc + val);
```

## Contributing
If you wish to contribute to the code or documentation, feel free to fork the repository and submit a pull request.

## License
MIT © [Michael Petö](https://github.com/petoem)