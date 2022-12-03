fs = require('fs')

function fileToArray(filename) {
    return fs.readFileSync(filename).toString()
    .split("\n")
}

module.exports = {
    fileToArray: fileToArray
}