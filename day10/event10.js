const fs = require("fs");

const FILE_NAME = 'input.txt';

const input = fs.readFileSync(FILE_NAME, 'utf8').split('\n').map((e) => e.split(' '));

let cycle = 0;
let registerX = 0;
let signalSum = 0;
let image =[...Array(6)].map((e) => []);

const checkCycles = (cycle) => signalSum += (cycle - 20) % 40 == 0 ? cycle * (registerX + 1) : 0;
const drawImage = (cycle) => {
    if (cycle % 40 >= registerX && cycle % 40 <= registerX + 2) {
        image[Math.floor(cycle / 40)].push('#');
    } else {
        image[Math.floor(cycle / 40)].push('.');
    }
};

input.forEach((cmd) => {
    if (cmd.length == 1) {
        drawImage(cycle++);
        checkCycles(cycle);
    } else {
        for (let i = 0; i < 2; i++) {
            drawImage(cycle++);
            checkCycles(cycle);
        }
        registerX += +cmd[1];
    }
})
console.log(signalSum);
console.log(image.map((e) => e.join('')));