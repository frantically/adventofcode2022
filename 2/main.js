utils = require('../utils.js')

ROCK_PLAYED = 1
PAPER_PLAYED = 2
SCISSORS_PLAYED = 3

WIN = 6
DRAW = 3
LOSS = 0


var PART_1_SCORING_SYSTEM = {
    "A X": ROCK_PLAYED + DRAW,
    "A Y": PAPER_PLAYED + WIN,
    "A Z": SCISSORS_PLAYED + LOSS,
    "B X": ROCK_PLAYED + LOSS,
    "B Y": PAPER_PLAYED + DRAW,
    "B Z": SCISSORS_PLAYED + WIN,
    "C X": ROCK_PLAYED + WIN,
    "C Y": PAPER_PLAYED + LOSS,
    "C Z": SCISSORS_PLAYED + DRAW,
}

var PART_2_SCORING_SYSTEM = {
    "A X": SCISSORS_PLAYED + LOSS,
    "A Y": ROCK_PLAYED + DRAW,
    "A Z": PAPER_PLAYED + WIN,
    "B X": ROCK_PLAYED + LOSS,
    "B Y": PAPER_PLAYED + DRAW,
    "B Z": SCISSORS_PLAYED + WIN,
    "C X": PAPER_PLAYED + LOSS,
    "C Y": SCISSORS_PLAYED + DRAW,
    "C Z": ROCK_PLAYED + WIN,
}

function run(scoringSystem) {
    return utils.fileToArray('input.txt')
        .map(game => scoringSystem[game])
        .reduce((a, b) => a + b )
}

console.log(`Part 1: ${run(PART_1_SCORING_SYSTEM)}`)
console.log(`Part 2: ${run(PART_2_SCORING_SYSTEM)}`)
