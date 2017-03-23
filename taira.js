/**
 * taira - simple smoothing of one dimensional arrays
 */
class Taira {
    /**
     * Smoothen 1D-Array using selected algorithm
     * @param {*} array The input data array (will be overwritten)
     * @param {Taira.ALGORITHMS} algorithm Takes one of the supported algorithms (defaults to AVERAGE)
     * @param {*} options Parameters for the algorithm
     */
    static smoothen(array, algorithm, ...options) {
        let [option1, option2, ...other] = options;
        switch (algorithm || 0) {
            case Taira.ALGORITHMS.MEDIAN:
                Taira[`_${Taira.ALGORITHMS.MEDIAN}`].apply(null, [array, option1 || 2, option2 || 1, ...other]);
                break;
            case Taira.ALGORITHMS.GAUSSIAN:
                Taira[`_${Taira.ALGORITHMS.GAUSSIAN}`].apply(null, [array, option1 || 2, option2 || 2, ...other]);
            default:
                Taira[`_${Taira.ALGORITHMS.AVERAGE}`].apply(null, [array, option1 || 2, option2 || 1, ...other]);
                break;
        }
        return array;
    }

    /**
     * Taira.ALGORITHMS.AVERAGE (do not use directly)
     * @param {*} array The input data array
     * @param {integer} size The number of neighbor elements to take, results in 2*size+1
     * @param {integer} pass How many times to go over the array
     */
    static _0(array, size, pass) {
        for (let i = 0; i < pass; i++) {
            array.forEach((_, index) => {
                let segmentstart = (index - size < 0) ? (index - size) + array.length : index - size;
                let sum = 0;
                for (let a = segmentstart; (index + size + 1) % array.length != a; a = a % array.length) {
                    sum += array[a];
                    a++;
                }
                array[index] = sum / ((size * 2) + 1);
            });
        }
    }

    /**
     * Taira.ALGORITHMS.MEDIAN (do not use directly)
     * @param {*} array The input data array
     * @param {integer} size The number of neighbor elements to take, results in 2*size+1
     * @param {integer} pass How many times to go over the array
     */
    static _1(array, size, pass) {
        for (let i = 0; i < pass; i++) {
            array.forEach((_, index) => {
                let segmentstart = (index - size < 0) ? (index - size) + array.length : index - size;
                let median = new Array();
                for (let a = segmentstart; (index + size + 1) % array.length != a; a = a % array.length) {
                    median.push(array[a]);
                    a++;
                }
                median = median.sort((a, b) => {
                    if (a < b) { return -1; }
                    if (a > b) { return 1; }
                    return 0;
                });
                array[index] = median[Math.trunc(((size * 2) + 1) / 2)];
            });
        }
    }

    /**
     * Taira.ALGORITHMS.GAUSSIAN (do not use directly)
     * @param {*} array The input data array
     * @param {integer} kernel Size of the kernel array is e.g. 2*kernel+1
     * @param {*} radius The blur radius (sigma from the gaussian function)
     */
    static _2(array, kernel, radius) {
        let filter = new Float64Array(2 * kernel + 1);
        let denominator1 = radius * Math.sqrt(2 * Math.PI);
        let denominator2 = Math.pow(radius, 2) * 2;
        filter = filter.map((_, index) => Math.exp(-(Math.pow(index - kernel, 2)) / denominator2) / denominator1);
        let normalizer = filter.reduce((acc, val) => acc + val);
        let normfilter = filter.map((value) => value / normalizer);
        array.forEach((_, index) => {
            let segmentstart = (index - kernel < 0) ? (index - kernel) + array.length : index - kernel;
            let sum = 0;
            let c = 0;
            for (let a = segmentstart; (index + kernel + 1) % array.length != a; a = a % array.length) {
                sum += array[a++] * normfilter[c++];
            }
            array[index] = sum;
        });
    }
}

Taira.ALGORITHMS = {
    AVERAGE: 0,
    MEDIAN: 1,
    GAUSSIAN: 2,
};

module.exports = Taira;