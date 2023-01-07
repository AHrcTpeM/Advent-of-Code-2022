const fs = require("fs");

const FILE_NAME = 'input.txt';

let data = fs.readFileSync(FILE_NAME, 'utf8').split('\n').map(e => e.split('').map(e => e == '=' ? -2 : e == '-' ? -1 : +e));

function sumSnafu(arr1, arr2) {
    let result = [];
    let [num1, num2] = arr1.length >= arr2.length ? [arr1, arr2] : [arr2, arr1];
    let dif = num1.length - num2.length;
    for (let i = 0; i < dif; i++) {
        num2.unshift(0)
    }
    let trans = 0;
    for (let i = num1.length - 1; i > -1; i--) {
        let [a, b] = [num1[i], num2[i]];
        let [transfer, c] = a + b + trans == 5 ? [1, 0] : a + b + trans == 4 ? [1, -1] : a + b + trans == 3 ? [1, -2] :
                            a + b + trans == -5 ? [-1, 0] : a + b + trans == -4 ? [-1, 1] : a + b + trans == -3 ? [-1, 2] : 
                            [0, a + b + trans];
        trans = transfer;
        result.unshift(c);
    }
    if (trans) result.unshift(trans);
    return result;
}

console.log(data.reduce(sumSnafu).map(e => e == -2 ? '=' : e == -1 ? '-' : '' + e).join(''));