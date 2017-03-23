/**
 * taira - simple smoothing of one dimensional arrays
 */
class Taira {
    /**
     * Smoothen 1D-Array using selected algorithm
     * @param {*} array The input data array (will be overwritten)
     * @param {Taira.ALGORITHMS} algorithm Takes one of the supported algorithms
     * @param {*} options Parameters for the algorithm
     */
    static smoothen(array, algorithm, ...options) {
        switch (algorithm || 0) {
            case Taira.ALGORITHMS.AVERAGE:
                let [size, pass, ...other] = options;
                Taira[`_${Taira.ALGORITHMS.AVERAGE}`].apply(null, [array, size || 2, pass || 1, ...other]);
                break;
            case Taira.ALGORITHMS.MEDIAN:
                let [size, pass, ...other] = options;
                Taira[`_${Taira.ALGORITHMS.MEDIAN}`].apply(null, [array, size || 2, pass || 1, ...other])
                break;
            default:
                let [size, pass, ...other] = options;
                Taira[`_${Taira.ALGORITHMS.AVERAGE}`].apply(null, [array, size || 2, pass || 1, ...other]);
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
            array.forEach((value, index) => {
                let segmentstart = (index - size < 0) ? (index - size) + array.length : index - size;
                let sum = 0;
                for (var a = segmentstart; (index + size + 1) % array.length != a; a = a % array.length) {
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
            array.forEach((value, index) => {
                let segmentstart = (index - size < 0) ? (index - size) + array.length : index - size;
                let median = new Array();
                for (var a = segmentstart; (index + size + 1) % array.length != a; a = a % array.length) {
                    median.push(array[a]);
                    a++;
                }
                median = median.sort((a, b) => {
                    if (a < b) { return -1; }
                    if (a > b) { return 1; }
                    return 0;
                });
                array[index] = median[parseInt(((size * 2) + 1) / 2)];
            });
        }
    }
}

Taira.ALGORITHMS = {
    AVERAGE: 0,
    MEDIAN: 1,
};

module.exports = Taira;