utils = require("../utils.js")

CORRECT_ORDER = -1
INCORRECT_ORDER = 1
CARRY_ON = 0

function compare(left, right) {
    if(Array.isArray(left) && !Array.isArray(right)) {
        return compare(left, [right])
    } else if(!Array.isArray(left) && Array.isArray(right)) {
        return compare([left], right)
    } else if(Array.isArray(left) && Array.isArray(right)) {
        if(left.length == 0 && right.length == 0) {
            return CARRY_ON
        }
        if(left.length == 0) {
            return CORRECT_ORDER
        } else if (right.length == 0) {
            return INCORRECT_ORDER
        } else {
            let firstItemResult = compare(left.shift(), right.shift())
            if(firstItemResult == CARRY_ON) {
                return compare(left, right)
            } else {
                return firstItemResult
            }
        }
    } else {
        if(left < right) {
            return CORRECT_ORDER
        } else if(left > right) {
            return INCORRECT_ORDER
        } else {
            return CARRY_ON
        }
    }
}

function part1(){
    data = utils.fileToArray("input.txt")
        .map(line => line.length > 0 ? JSON.parse(line) : [])
    part1 = 0
    index = 0
    while(data.length > 0) {
        index++
        let result = compare(data.shift(), data.shift())
        if(result == CORRECT_ORDER) {
            part1 += index
        }
        data.shift()
    }
    console.log(`Part 1: ${part1}`)
}

function nonDestructiveCompare(left, right) {
    return compare(JSON.parse(JSON.stringify(left)), JSON.parse(JSON.stringify(right)))
}

function part2() {
    data = utils.fileToArray("input.txt")
        .filter(line => line.length > 0)
        .map(line => JSON.parse(line))
    two = [[2]]
    six = [[6]]
    data.push(two)
    data.push(six)
    data = data.sort((a, b) => nonDestructiveCompare(a, b))
    decoderKey = (data.indexOf(two)+1)*(data.indexOf(six)+1)
    console.log(`Part 2: ${decoderKey}`)
}

part1()
part2()