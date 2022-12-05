const { parse } = require("path")

utils = require("../utils.js")

function initializeStacks(crateData) {
    stacks = []
    for(let i=0;i<10;i++) {
        stacks.push(new Array())
    }
    for(let line in crateData) {
        for(let i=0;i<9;i++) {
            crate = crateData[line].substring(1+i*4, 1+i*4+1)
            if(crate != " ") {
                stacks[i+1].push(crate)
            }
        }
    }
    return stacks
}

function part1() {
    var {stacks, instructions} = parseFile()
    stacks = initializeStacks(crateData)
    instructions.forEach(instruction => {
        for(let i=0;i<instruction[0];i++) {
            stacks[instruction[2]].push(stacks[instruction[1]].pop())
        }
    })
    console.log(`Part 1: ${listOfTopCrates(stacks).join('')}`)
}

function part2() {
    var {stacks, instructions} = parseFile()
    instructions.forEach(instruction => {
        toMove = []
        for(let i=0;i<instruction[0];i++) {
            toMove.push(stacks[instruction[1]].pop())
        }
        stacks[instruction[2]] = stacks[instruction[2]].concat(toMove.reverse())
    })
    console.log(`Part 2: ${listOfTopCrates(stacks).join('')}`)
}

function listOfTopCrates(stacks) {
    return stacks.map(stack => stack[stack.length-1])
}

function parseFile() {
    data = utils.fileToArray("input.txt")
    crateData = []
    instructionData = []
    data.forEach(line => {
        if(line.startsWith("[")){
            crateData.push(line)
        } else if (line.startsWith("move")) {
            instructionData.push(line)
        }
    })
    crateData = crateData.reverse()
    instructions = instructionData.map(line => line.match(/move ([0-9]+) from ([0-9]+) to ([0-9]+)/).slice(1).map(x => parseInt(x)))
    stacks = initializeStacks(crateData)
    return { stacks, instructions }
}

part1()
part2()