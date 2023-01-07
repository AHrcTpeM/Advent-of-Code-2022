const fs = require("fs");

const FILE_NAME = 'input.txt';

const sum = fs.readFileSync(FILE_NAME, 'utf8').split('\n').reduce((acc, str) => {
    const array = str.split('');
    const arr1 = new Set([...array.slice(0, array.length / 2)]);
    const arr2 = new Set([...array.slice(array.length / 2)]);
    
    arr1.forEach((char1) => arr2.forEach((char2) => {
        if (char1 == char2) {
            const code = char1.charCodeAt(0);
            acc += code > 64 && code < 91 ? code - 64 + 26 : code - 96;
        }
    }))
    return acc;
}, 0);

console.log(sum);

const file = fs.readFileSync(FILE_NAME, 'utf8').split('\n');
let sum2 = 0;
for (let i = 0; i < file.length; i += 3) {
    let arr1 = new Set([...file[i].split('')]);
    let arr2 = new Set([...file[i + 1].split('')]);
    let arr3 = new Set([...file[i + 2].split('')]);
    [...arr1].forEach((elem1) => {
        [...arr2].forEach((elem2) => {
            if (elem1 == elem2) {
                [...arr3].forEach((elem3) => {
                    if (elem1 == elem3) {
                        const code = elem1.charCodeAt(0);
                        sum2 += code > 64 && code < 91 ? code - 64 + 26 : code - 96;
                    }                    
                })
            }

        })
    })    
}

console.log(sum2);