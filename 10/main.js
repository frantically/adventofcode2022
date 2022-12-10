utils = require("../utils.js")

data = utils.fileToArray("input.txt").reverse()

x = 1
time = 0
currentInstruction = null
currentInstructionCompletion = 0

part1Strengths = [20, 60, 100, 140, 180, 220]
part1 = 0
part2Output = ""

while(data.length > 0 || currentInstruction) {
    if(!currentInstruction) {
        currentInstruction = data.pop()
        if(currentInstruction == "noop") {
            currentInstructionCompletion = time + 1
        } else {
            currentInstructionCompletion = time + 2
        }
    }
    pixel = time%40
    if(pixel == x-1 || pixel == x || pixel == x+1) {
        part2Output += "#"
    } else {
        part2Output += "."
    }
    if(pixel == 39) {
        part2Output += "\n"
    }
    time++
    if(part1Strengths.indexOf(time) > -1) {
        part1 += time * x
    }
    if(time == currentInstructionCompletion) {
        if(currentInstruction.startsWith("addx")) {
            x += parseInt(currentInstruction.substring(5))
        }
        currentInstruction = null
    }
}

console.log(`Part 1: ${part1}`)
console.log(part2Output)