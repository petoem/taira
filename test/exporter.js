const fs = require('fs')
const os = require('os')

module.exports.CSV = function (path, data) {
  let numbers = new Uint32Array(data.length)
  numbers = numbers.map((value, index) => index)
  fs.writeFile(path, numbers.join(';') + os.EOL + data.join(';') + os.EOL, (err) => { console.log(err) })
}

module.exports.JSON = function (path, data) {
  fs.writeFile(path, JSON.stringify(data, null, 4), (err) => { console.log(err) })
}
