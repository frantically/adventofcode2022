utils = require("../utils.js")

function textAfter(line, after) {
    return line.substring(line.indexOf(after)+after.length)
}

function numberFromEnd(line) {
    return parseInt(line.match(/([0-9]+)/)[1])
}

function operation(line) {
    functionAsString = `(old) => ${textAfter(line, "new = ")}`
    return eval(functionAsString)
}
// https://www.tutorialspoint.com/calculating-the-lcm-of-multiple-numbers-in-javascript
const calculateLCM = (...arr) => {
    const gcd2 = (a, b) => {
       if(!b) return b===0 ? a : NaN;
          return gcd2(b, a%b);
    };
    const lcm2 = (a, b) => {
       return a * b / gcd2(a, b);
    }
    let n = 1;
    for(let i = 0; i < arr.length; ++i){
       n = lcm2(arr[i], n);
    }
    return n;
 };

function run(rounds, divideByThree) {
    data = utils.fileToArray("input.txt")
    let monkeys = []
    while(data.length > 0) {
        monkey = { 
            items: textAfter(data[1], ": ").split(", ").map(i => parseInt(i)),
            testDivisor: numberFromEnd(data[3]),
            operation: operation(data[2]),
            ifTrue: numberFromEnd(data[4]),
            ifFalse: numberFromEnd(data[5]),
            inspections: 0
        }
        monkeys.push(monkey)
    
        data.splice(0 , 7)
    }

    lcm = calculateLCM(...monkeys.map(m => m.testDivisor))
    
    for(let i=0;i<rounds;i++) {
        monkeys.forEach(monkey => {
            monkey.items.forEach(item => {
                item = monkey.operation(item)
                if(divideByThree) {
                    item = Math.floor(item / 3)
                } else {
                    item = item % lcm
                }
                if(item%monkey.testDivisor == 0) {
                    monkeys[monkey.ifTrue].items.push(item)
                } else {
                    monkeys[monkey.ifFalse].items.push(item)
                }
                monkey.inspections++
            })
            monkey.items = []
        })
    }
    monkeys.sort((a, b) => b.inspections-a.inspections)
    monkeyBusiness = monkeys[0].inspections * monkeys[1].inspections
    return monkeyBusiness
}

console.log(`Part 1: ${run(20, true)}`)
console.log(`Part 2: ${run(10000, false)}`)