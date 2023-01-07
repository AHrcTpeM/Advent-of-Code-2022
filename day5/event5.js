const fs = require("fs");

const FILE_NAME = 'input.txt';

const file = fs.readFileSync(FILE_NAME, 'utf8').split('\n\n');

const scheme = new Array(10).fill(0).map((e) => []);
file[0].split('\n').forEach((row) => {
    for (let i = 1; i < row.length; i += 4) {
        if (row[i] !== '' && isNaN(+row[i])) {
            scheme[Math.ceil(i/4)].unshift(row[i]);
        }
    }    
});

const scheme1 = scheme.map((e) => e.slice()); //copy
file[1].split('\n').forEach((arr) => {
    const [_, move, from, to] = arr.match(/move\s(\d+)\sfrom\s(\d+)\sto\s(\d+)/).map(Number);
    for (let i = 0; i < move; i++) {
        scheme1[to].push(scheme1[from].pop());        
    }
})
const result1 = scheme1.map((el) => el[el.length - 1]).join('');
console.log(result1);


const scheme2 = scheme.map((e) => e.slice());
file[1].split('\n').forEach((arr) => {
    const [_, move, from, to] = arr.match(/move\s(\d+)\sfrom\s(\d+)\sto\s(\d+)/).map(Number);
    scheme2[to] = scheme2[to].concat(scheme2[from].splice(-move));
})
const result2 = scheme2.map((el) => el[el.length - 1]).join('');
console.log(result2);
