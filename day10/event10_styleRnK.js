const fs = require("fs");

const FILE_NAME = 'input.txt';

const createObj = (cycle, registerX, cmd = 0) => ({
    cycle: cycle + 1,
    registerX: registerX + cmd,
    image: (cycle - 1) % 40 >= registerX - 1 && (cycle - 1) % 40 <= registerX + 1 ? '#' : '.',
})

const input = fs.readFileSync(FILE_NAME, 'utf8').split('\n').map((e) => e.split(' ')).reduce((acc, cmd) => {
    let obj = [createObj(acc.at(-1).cycle, acc.at(-1).registerX),
               createObj(acc.at(-1).cycle + 1, acc.at(-1).registerX, +cmd[1])]
    obj = cmd.length == 1 ? [obj[0]] : obj;
    return [
        ...acc,
        ...obj,
       ]
}, [{
    cycle: 1,
    registerX: 1,
    image: ''
}]);

// part 1
console.log(input.filter((e) => (e.cycle - 20) % 40 == 0).reduce((acc, e) => acc + e.cycle * e.registerX, 0));
// part 2
console.log(input.reduce((acc, a, i) => ({    
    array: i % 40 == 0 && i != 0 ? acc.array.concat(acc.string + a.image) : acc.array,
    string: (i - 1) % 40 == 0 && i != 1 ? a.image : acc.string + a.image,    
}), { array: [], string: ''}).array);