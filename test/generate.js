const path = require('path')
const exporter = require('./exporter.js')
/**
 * Test Data Generator
 */

/**
 * Command Options
 * ===============
 * - first number specifies amount to generate
 * - second number the range (0-MAX)
 * - a string to choose export method e.g. "CSV" or "JSON"
 */
const genoptions = process.argv.filter((value) => !isNaN(value))
let data = new Float64Array(genoptions[0])

data = data.map(() => {
  return Math.random() * genoptions[1]
})

if (process.argv.includes('CSV')) {
  exporter.CSV(path.resolve(__dirname, './data.csv'), data)
}

if (process.argv.includes('JSON')) {
  exporter.JSON(path.resolve(__dirname, './data.json'), data)
}

if (!process.argv.includes('JSON') && !process.argv.includes('CSV')) {
  console.log(data)
}
