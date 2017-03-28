const fs = require('fs')
const os = require('os')

module.exports.CSV = function (path) {
  return new Float64Array(fs.readFileSync(path, 'utf8').split(os.EOL)[1].split(';'))
}

module.exports.JSON = function (path) {
  let data = JSON.parse(fs.readFileSync(path, 'utf8'))
  return new Float64Array(Object.keys(data).map((val) => data[val]))
}
