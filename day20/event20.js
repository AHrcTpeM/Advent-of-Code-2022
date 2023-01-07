const fs = require("fs");

const FILE_NAME = 'input.txt';
const TIMES = 10;      // part1 - 1, part2 - 10
const KEY = 811589153; // part1 - 1, part2 - 811589153

let input = fs.readFileSync(FILE_NAME, 'utf8').split('\n').map(Number).map(e => e * KEY);

const range = (count, start=0) => [ ...Array(count).keys() ].map(x => x + start); // where have I seen it

let indexes = range(input.length);

for (let i = 0; i < TIMES; i++) {
    input.forEach((number, idx) => {
        let curIdx = indexes.findIndex(e => e == idx);
        number = number % (input.length -1)
        let newIndex = number > 0 ? 
                      (curIdx + number < input.length ? curIdx + number : (curIdx + number + 1) % input.length) : 
                      (curIdx + number > 0 ? curIdx + number : input.length - 1 + curIdx + number);
        let arr = indexes.splice(curIdx, 1);
        indexes = indexes.slice(0, newIndex).concat(arr).concat(indexes.slice(newIndex));
    })
}

let resArray = indexes.map(e => input[e]);

let indexZero = resArray.findIndex(e => e == 0);

let pos1 = (1000 % input.length + indexZero) % input.length;
let pos2 = (2000 % input.length + indexZero) % input.length;
let pos3 = (3000 % input.length + indexZero) % input.length;
console.log(resArray[pos1], resArray[pos2], resArray[pos3]);
console.log(resArray[pos1] + resArray[pos2] + resArray[pos3]);