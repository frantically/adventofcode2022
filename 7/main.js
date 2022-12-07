utils = require("../utils.js")

data = utils.fileToArray("input.txt")

fileSystem = {}
currentDirectory = fileSystem

data.slice(1).forEach(line => {
    lineParts = line.split(" ")
    if(lineParts[0] == "$") {
        if(lineParts[1] == "cd") {
            currentDirectory = currentDirectory[lineParts[2]]
        }
    } else { //must be ls output
        if(lineParts[0] == "dir" && !(lineParts[1] in currentDirectory)) {
            newDirectory = {}
            newDirectory[".."] = currentDirectory
            currentDirectory[lineParts[1]] = newDirectory
        } else {
            currentDirectory[lineParts[1]] = parseInt(lineParts[0])
        }
    }
})

smallDirectoriesTotalSize = 0
directorySizes = []

function checkSize(directory, name) {
    var total = 0
    for(key in directory) {
        if(typeof directory[key] === "object") {
            if(key != "..") {
                subDirectorySize = checkSize(directory[key], key)
                directorySizes.push({name: name, size: subDirectorySize})
                total += subDirectorySize
            }
        } else {
            total += directory[key]
        }
    }
    if(total <= 100000) {
        smallDirectoriesTotalSize += total
    }
    return total
}

rootTotal = checkSize(fileSystem, "/")
console.log(`Part 1: ${smallDirectoriesTotalSize}`)

spaceNeeded =  30000000 - (70000000-rootTotal)
directorySizes = directorySizes
    .filter(dirSize => dirSize['size'] > spaceNeeded)
    .sort((a, b) => a.size - b.size)
console.log(`Part 1: ${directorySizes[0]['name']}`)
