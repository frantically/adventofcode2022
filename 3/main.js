utils = require('../utils.js')

ITEM_SCORE = "_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

rucksacks = utils.fileToArray('input.txt')
    .map(str => str.split(""))

part1Score = rucksacks
    //split in to arrays of equal size (i.e. it's two compartments)
    .map(rucksack => [rucksack.slice(0, rucksack.length/2), rucksack.slice(rucksack.length/2, rucksack.length)])
    //filter to the item found in both compartments
    .map(rucksack => rucksack[0].filter(item => rucksack[1].indexOf(item) > -1)[0])
    //map the item to a score
    .map(itemInBoth => ITEM_SCORE.indexOf(itemInBoth))
    //add up the total
    .reduce((a, b) => a+b)
    
console.log(`Part 1: ${part1Score}`)

groupsOfRucksacks = []
currentGroup = []

//break the rucksacks into groups of three
rucksacks.forEach(rucksack => {
    currentGroup.push(rucksack)
    if(currentGroup.length == 3) {
        groupsOfRucksacks.push(currentGroup)
        currentGroup = []
    }
})

part2Score = groupsOfRucksacks
    //find the item that exists in all three rucksacks
    .map(group => group[0]
        .filter(item => group[1].indexOf(item) > -1)
        .filter(item => group[2].indexOf(item) > -1)[0])
    //map the item to a score
    .map(itemInBoth => ITEM_SCORE.indexOf(itemInBoth))
    //add up the total
    .reduce((a, b) => a+b)

console.log(`Part 2: ${part2Score}`)