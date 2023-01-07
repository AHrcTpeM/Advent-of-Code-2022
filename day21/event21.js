const fs = require("fs");

const FILE_NAME = 'input.txt';

const eval = (array) =>  array[1] == '+' ? array[0] + array[2] :
                         array[1] == '-' ? array[0] - array[2] :
                         array[1] == '*' ? array[0] * array[2] :
                         array[1] == '/' ? array[0] / array[2] :
                         undefined;

const backEval = (res, operator, x, idx) =>  operator == '+' ?  res - x :
                                             operator == '-' ? (idx == 0 ? x - res : x + res) :
                                             operator == '*' ?  res / x :
                                             operator == '/' ? (idx == 0  ? x / res : x * res) :
                                             undefined;

let data = {};
fs.readFileSync(FILE_NAME, 'utf8').split('\n').forEach((line) => {
    let arr = line.split(": ").map((e, i) => i == 1 && isNaN(e) ? e.split(' ') : e);
    data[arr[0]] = arr[1];
});

while(Array.isArray(data.root)) {
    for (let key in data) {
        if (Array.isArray(data[key])) {
            data[key][0] = !isNaN(data[data[key][0]]) ? +data[data[key][0]] : data[key][0]; // if the number, changed
            data[key][2] = !isNaN(data[data[key][2]]) ? +data[data[key][2]] : data[key][2]; // 418 or [ 768, '+', 'plzp' ]
            if (!isNaN(data[key][0]) && !isNaN(data[key][2])) { // if both numbers
                data[key] = eval(data[key]);
            }
        }
    }
}
console.log('part1:', data.root);

// part 2
data = {};
fs.readFileSync(FILE_NAME, 'utf8').split('\n').forEach((line) => {
    let arr = line.split(": ").map((e, i) => i == 1 && isNaN(e) ? e.split(' ') : e);
    data[arr[0]] = arr[1];
});
data.humn = '?';

while(isNaN(data.root[0]) && isNaN(data.root[2])) {
    for (let key in data) {
        if (Array.isArray(data[key])) {
            data[key][0] = !isNaN(data[data[key][0]]) ? +data[data[key][0]] : data[key][0];
            data[key][2] = !isNaN(data[data[key][2]]) ? +data[data[key][2]] : data[key][2];
            if (!isNaN(data[key][0]) && !isNaN(data[key][2])) {
                data[key] = eval(data[key]);
            }
        }
    }
}

function numberSearch(key, value) {
    if (key == 'humn') return value;

    let idxVal = data[key].findIndex(e => !isNaN(e));  // number index [ 'lfmf', '-', 905 ] -> 2
    let newKey = data[key][2 - idxVal];
    let newValue = data[key][idxVal];
    value = backEval(value, data[key][1], newValue, idxVal);
    return numberSearch(newKey, value);
}

let rootKey = isNaN(data.root[0]) ? data.root[0] : data.root[2];
let rootValue = isNaN(data.root[0]) ? data.root[2] : data.root[0];

console.log('part2:', numberSearch(rootKey, rootValue));