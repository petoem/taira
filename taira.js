/**
 * taira - simple smoothing of one dimensional arrays
 */
class Taira {
    /**
     * Smoothen 1D-Array using selected algorithm
     * @param {*} array The input data array (will be overwritten)
     * @param {Taira.ALGORITHMS} algorithm Takes one of the supported algorithms
     * @param {integer} segmentsize The number of neighbor elements to take
     * @param {integer} iterations How many times to go over the array
     */
    static smoothen(array, algorithm, segmentsize, iterations) {
        algorithm = algorithm || 0;
        segmentsize = segmentsize || 2;
        iterations = iterations || 1;

        Taira[algorithm](array, segmentsize, iterations);
    }

    /**
     * Taira.ALGORITHMS.AVERAGE (do not use directly)
     * @param {*} array 
     * @param {*} segmentsize 
     * @param {*} iterations 
     */
    static 0(array, segmentsize, iterations) {
        for (let i = 0; i < iterations; i++) {
            array.forEach((value, index) => {
                let segmentstart = (index - segmentsize < 0) ? (index - segmentsize) + array.length : index - segmentsize;
                let sum = 0;
                for (var a = segmentstart; (index + segmentsize + 1) % array.length != a; a = a % array.length) {
                    sum += array[a];
                    a++;
                }
                array[index] = sum / ((segmentsize * 2) + 1);
            });
        }
    }

    /**
     * Taira.ALGORITHMS.MEDIAN (do not use directly)
     * @param {*} array 
     * @param {*} segmentsize 
     * @param {*} iterations 
     */
    static 1(array, segmentsize, iterations) {
        for (let i = 0; i < iterations; i++) {
            array.forEach((value, index) => {
                let segmentstart = (index - segmentsize < 0) ? (index - segmentsize) + array.length : index - segmentsize;
                let median = new Array();
                for (var a = segmentstart; (index + segmentsize + 1) % array.length != a; a = a % array.length) {
                    median.push(array[a]);
                    a++;
                }
                median = median.sort((a, b) => {
                    if (a < b) { return -1; }
                    if (a > b) { return 1; }
                    return 0;
                });
                array[index] = median[parseInt(((segmentsize * 2) + 1) / 2)];
            });
        }
    }
}

Taira.ALGORITHMS = {
    AVERAGE: 0,
    MEDIAN: 1,
};

module.exports = Taira;