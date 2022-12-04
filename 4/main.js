utils = require("../utils.js")

data = utils.fileToArray("input.txt")

ranges = data.map(line => {
    found = line.match(/([0-9]+).([0-9]+).([0-9]+).([0-9]+)/)
    return found.slice(1).map(x => parseInt(x))
})

containedPairs = ranges
    .filter(pairOfRanges => {
        return (pairOfRanges[0] <= pairOfRanges[2] && pairOfRanges[1] >= pairOfRanges[3]) ||
            (pairOfRanges[2] <= pairOfRanges[0] && pairOfRanges[3] >= pairOfRanges[1])
    })

console.log(`Part 1: ${containedPairs.length}`)

overlappingSections = ranges
    .filter(pairOfRanges => {
        return (pairOfRanges[0] <= pairOfRanges[2] && pairOfRanges[1] >= pairOfRanges[2]) ||
            (pairOfRanges[2] <= pairOfRanges[0] && pairOfRanges[3] >= pairOfRanges[0])
    })

console.log(`Part 2: ${overlappingSections.length}`)
