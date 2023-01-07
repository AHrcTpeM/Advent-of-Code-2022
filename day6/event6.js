const fs = require("fs");

const FILE_NAME = 'input.txt';
const MESSAGE = 14; // 4

const file = fs.readFileSync(FILE_NAME, 'utf8');
for (let i = 0; i < file.length; i++) {
    if (new Set(file.slice(i, i + MESSAGE)).size === MESSAGE) {
        console.log(i + MESSAGE);
        break;
    }
}