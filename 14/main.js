utils = require("../utils.js")

let rockData = utils.fileToArray("input.txt")
    .map(line => line.split(" -> ").map(location => {
            return location.split(",").map(i => parseInt(i))
        })
    )

function ensureDepth(grid, y) {
    while(grid.length <= y+1) {
        let row = []
        for(let i=0;i<1000;i++) {
            row.push(".")
        }
        grid.push(row)
    }
}

function addRocksToGrid(grid, from, to) {
    ensureDepth(grid, Math.max(from[1], to[1]))
    if(from[0] == to[0]) { //vertical line
        for(let i=Math.min(from[1], to[1]);i<=Math.max(from[1], to[1]);i++) {
            grid[i][from[0]] = "#"
        }
    } else {
        for(let i=Math.min(from[0], to[0]);i<=Math.max(from[0], to[0]);i++) {
            grid[from[1]][i] = "#"
        }
    }
}

function addRockChainsToGrid(grid, rockData) {
    rockData.forEach(rockChain => {
        for(let i=1;i<rockChain.length;i++) {
            addRocksToGrid(grid, rockChain[i-1], rockChain[i])
        }
    })
}

function printGrid(grid) {
    grid.forEach(row => console.log(row.join("")))
}

function addSand(grid) {
    sandX = 500
    sandY = -1
    falling = true
    do {
        if(sandY == grid.length - 1) {
            return [sandX, sandY]
        }
        // console.log(sandY + " + " + sandX)
        if(grid[sandY+1][sandX] == ".") {
            sandY++
        } else if (grid[sandY+1][sandX-1] == ".") {
            sandY++
            sandX--
        } else if (grid[sandY+1][sandX+1] == ".") {
            sandY++
            sandX++
        } else {
            grid[sandY][sandX] = "O"
            return [sandX, sandY]
        }
    } while(true)
}

function part1() {
    let grid = []
    addRockChainsToGrid(grid, rockData)
    while(true) {
        location = addSand(grid)
        if(location[1] == grid.length-1) {
            break
        }
    }
    // printGrid(grid)
    console.log(`Part 1: ${countSand(grid)}`)
}

function part2() {
    let grid = []
    addRockChainsToGrid(grid, rockData)
    addRocksToGrid(grid, [0, grid.length], [999, grid.length])
    while(true) {
        addSand(grid)
        if(grid[0][500] == "O") {
            break
        }
    }
    // printGrid(grid)
    console.log(`Part 2: ${countSand(grid)}`)
}

function countSand(grid) {
    return grid.map(row => row.filter(x => x == "O").join("")).join("").length
}

part1()
part2()

