const fs = require("fs");

const FILE_NAME = 'input.txt';

const sum = fs.readFileSync(FILE_NAME, 'utf8').split('\n').reduce((acc, elem) => {
    const array = elem.split(',').map((arr) => arr.split('-'));
    if (+array[0][0] <= +array[1][0] && +array[0][1] >= +array[1][1] ||
        +array[0][0] >= +array[1][0] && +array[0][1] <= +array[1][1]) {
            return acc + 1;
    } else {
        return acc; 
    }       
}, 0);

console.log(sum);

const file = fs.readFileSync(FILE_NAME, 'utf8').split('\n');
const sum2 = file.length - file.reduce((acc, elem) => {
    const array = elem.split(',').map((arr) => arr.split('-'));
    if (+array[0][0] > +array[1][1] ||
        +array[0][1] < +array[1][0]) {
            return acc + 1;
    } else {
        return acc; 
    }       
}, 0);

console.log(sum2);