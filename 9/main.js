utils = require("../utils.js")

data = utils.fileToArray("input.txt")
instructions = data.map(line => {
    splitLine = line.split(" ")
    return {direction: splitLine[0], distance: parseInt(splitLine[1])}    
})

function moveYCloser(leader, follower) {
    if(leader.y > follower.y) {
        follower.y++
    } else if(follower.y > leader.y) {
        follower.y --
    }
}

function moveXCloser(leader, follower) {
    if(leader.x > follower.x) {
        follower.x++
    } else if(follower.x > leader.x) {
        follower.x --
    }
}

function followKnot(leader, follower) {
    if(leader.x - follower.x == 2) {
        follower.x++
        moveYCloser(leader, follower)
    } else if(follower.x - leader.x == 2) {
        follower.x--
        moveYCloser(leader, follower)
    } else if(leader.y - follower.y == 2) {
        follower.y++
        moveXCloser(leader, follower)
    } else if (follower.y - leader.y == 2) {
        follower.y--
        moveXCloser(leader, follower)
    }
}


function run(instructions, knotCount) {
    knots = []
    for(let i=0;i<knotCount;i++) {
        knots.push({x: 0, y: 0})
    }
    let tailVisits = new Set()
    tailVisits.add(`0_0`)
    instructions.forEach(instruction => {
        for(let i=0;i<instruction.distance;i++) {
            leaderOld = { x: knots[0].x, y: knots[0].y }
            switch (instruction.direction) {
                case 'R':
                    knots[0].x = knots[0].x + 1
                    break
                case 'L':
                    knots[0].x = knots[0].x - 1
                    break
                case 'U':
                    knots[0].y = knots[0].y + 1
                    break
                case 'D':
                    knots[0].y = knots[0].y - 1
                    break
            }
            for(let i = 1;i<knots.length;i++) {
                followKnot(knots[i-1], knots[i])
            }
            tailVisits.add(`${knots[knots.length-1].x}_${knots[knots.length-1].y}`)
            // printDebug()
        }
    })
    return tailVisits.size
}

function printDebug() {
    console.log(knots)
    for(let y=20;y>=-20;y--) {
        let line = ""
        
        for(let x=-20;x<20;x++) {
            let spaceIcon = "."
            if (x == 0 && y == 0) {
                spaceIcon = "s"
            }
            for(let j=knots.length-1;j>=0;j--) {
                if (x == knots[j].x && y == knots[j].y) {
                    spaceIcon = `${j}`    
                }
            }
            line = line + spaceIcon
        }
        console.log(line)
    }
    console.log()
}

console.log(`Part 1: ${run(instructions, 2)}`)
console.log(`Part 2: ${run(instructions, 10)}`)
