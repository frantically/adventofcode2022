

utils = require("../utils.js")

data = utils.fileToArray("input.txt")

rows = data
    .map(line => line.split(''))
    .map(heights => heights.map(heightString => parseInt(heightString)))

function isVisibleFromLeft(x, y) {
    for(let i=x-1;i>=0;i--) {
        if(rows[y][i] >= rows[y][x]) {
            return false
        }
    }
    return true
}

function isVisibleFromRight(x, y) {
    for(let i=x+1;i<rows[0].length;i++) {
        if(rows[y][i] >= rows[y][x]) {
            return false
        }
    }
    return true
}

function isVisibleFromTop(x, y) {
    for(let i=y-1;i>=0;i--) {
        if(rows[i][x] >= rows[y][x]) {
            return false
        }
    }
    return true
}

function isVisibleFromBottom(x, y) {
    for(let i=y+1;i<rows.length;i++) {
        if(rows[i][x] >= rows[y][x]) {
            return false
        }
    }
    return true
}

function visibleTreesLeft(x, y) {
    let visibleTrees = 0
    for(let i=x-1;i>=0;i--) {
        visibleTrees++
        if(rows[y][i] >= rows[y][x]) {
            break
        }
    }
    return visibleTrees 
}

function visibleTreesRight(x, y) {
    let visibleTrees = 0
    for(let i=x+1;i<rows[0].length;i++) {
        visibleTrees++
        if(rows[y][i] >= rows[y][x]) {
            break
        }
    }
    return visibleTrees
}

function visibleTreesTop(x, y) {
    let visibleTrees = 0
    for(let i=y-1;i>=0;i--) {
        visibleTrees++
        if(rows[i][x] >= rows[y][x]) {
            break
        }
    }
    return visibleTrees
}

function visibleTreesBottom(x, y) {
    let visibleTrees = 0
    for(let i=y+1;i<rows.length;i++) {
        visibleTrees++
        if(rows[i][x] >= rows[y][x]) {
            break
        }
    }
    return visibleTrees
}

function isVisible(x, y) {
    return isVisibleFromLeft(x, y) ||
        isVisibleFromRight(x, y) ||
        isVisibleFromTop(x, y) ||
        isVisibleFromBottom(x, y)
}

visibleTrees = 0

for(let i=0;i<rows[0].length;i++) {
    for(let j=0;j<rows.length;j++) {
        visible = isVisible(i, j)
        if(visible) {
            visibleTrees++
        }
    }
}

console.log(`Part 1: ${visibleTrees}`)

scores = []

for(let i=0;i<rows[0].length;i++) {
    for(let j=0;j<rows.length;j++) {
        score = visibleTreesLeft(i, j) * visibleTreesRight(i, j) * visibleTreesTop(i, j) * visibleTreesBottom(i, j)
        scores.push(score)
    }
}

console.log(`Part 2: ${Math.max(...scores)}`)