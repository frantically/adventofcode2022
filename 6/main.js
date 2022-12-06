utils = require("../utils.js")

data = utils.fileToArray("input.txt")[0]

function getHeaderIndex(data, uniqueCharacters) {
    for(let i=0;i<data.length-uniqueCharacters;i++) {
        if(new Set(data.substring(i, i+uniqueCharacters)).size == uniqueCharacters) {
            return i + uniqueCharacters
        }
    }
}

console.log(`Part 1: ${getHeaderIndex(data, 4)}`)
console.log(`Part 2: ${getHeaderIndex(data, 14)}`)