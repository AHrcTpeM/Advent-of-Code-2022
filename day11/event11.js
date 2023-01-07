const fs = require("fs");

const FILE_NAME = 'input.txt';

const DIVIDER = 1;    // 1;     3
const ROUNDS = 10000; // 10000; 20

const input = fs.readFileSync(FILE_NAME, 'utf8').split('\n\n').map((elem) => {
    const arr = elem.split('\n').slice(1);
    const operArr = arr[1].split(' ');
    return {
        items: arr[0].split(': ')[1].split(', ').map(Number),
        operation: (old) => operArr.at(-2) == '*' ?
                            old * (operArr.at(-1) == 'old' ? old : +operArr.at(-1)) :
                            old + (operArr.at(-1) == 'old' ? old : +operArr.at(-1)), // old *+ 12\old
        divisible: +arr[2].split('by ')[1],
        trueMonkey: +arr[3].split('monkey ')[1],
        falseMonkey: +arr[4].split('monkey ')[1],
        inspect: 0,
    }
});

const LCD = input.reduce((acc, monkey) => acc * monkey.divisible, 1); // lowest common denominator
for (let i = 0; i < ROUNDS; i++) {
    input.forEach((monkey) => {
        monkey.items.forEach((item) => {
            let newItem = Math.floor(monkey.operation(item) / DIVIDER) % LCD;
            input[newItem % monkey.divisible == 0 ? monkey.trueMonkey : monkey.falseMonkey].items.push(newItem);
            monkey.inspect++;
        })
        monkey.items = [];
    })
}
const sortMonkey = input.map((m) => m.inspect).sort((a, b) => b - a);
console.log(sortMonkey[0] * sortMonkey[1]);