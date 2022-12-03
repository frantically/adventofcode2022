utils = require('../utils.js')

data = utils.fileToArray('input.txt')
    .map((calories => parseInt(calories)))

elfCalorieTotals = []
currentElfTotal = 0
data.forEach(line => {
    mealCalories = parseInt(line)
    if(isNaN(mealCalories)) {
        if(currentElfTotal > 0) {
            elfCalorieTotals.push(currentElfTotal)
        }
        currentElfTotal = 0
    } else {
        currentElfTotal += mealCalories
    }
})

maxElfCalories = Math.max(...elfCalorieTotals)
elfWithMaxCalories = elfCalorieTotals.indexOf(maxElfCalories)
console.log(`Part 1: ${maxElfCalories}`)

elfCalorieTotals.sort((a, b) => b-a)
firstThreeElvesCalories = elfCalorieTotals[0] + elfCalorieTotals[1] + elfCalorieTotals[2]
console.log(`Part 2: ${firstThreeElvesCalories}`)