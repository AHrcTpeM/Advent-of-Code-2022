const fs = require("fs");

const FILE_NAME = 'input.txt';

let max1 = 0;
let max2 = 0;
let max3 = 0;

let sum = 0;

fs.readFileSync(FILE_NAME, 'utf8').split('\r\n').concat(['']).forEach((elem) => {
    if (elem !== '') {
        sum += +elem;
    } else {
        if (sum > max1) {
            max3 = max2;
            max2 = max1;
            max1 = sum;
        } else if (sum > max2) {
            max3 = max2;
            max2 = sum;
        } else if (sum > max3) {
            max3 = sum;
        }
        sum = 0;
    }
});

console.log(max1, max2, max3);
console.log(max1 + max2 + max3);
