const fs = require("fs");

const FILE_NAME = 'input.txt';

const LOSE = 0, DRAW = 3, WIN = 6;
const ROCK = 1, PAPER = 2, SCISSORS = 3;

const sum2 = fs.readFileSync(FILE_NAME, 'utf8').split('\n').reduce((sum, elem) => {
    let result = (elem.slice(2) == 'X') ? sum + LOSE :
                 (elem[2] == 'Z') ? sum + WIN :
                 sum + DRAW;
    
    result = (elem == 'A X' || elem == 'B Z' || elem == 'C Y') ? result + SCISSORS :
             (elem == 'A Y' || elem == 'B X' || elem == 'C Z') ? result + ROCK :
             result + PAPER;
    return result;
}, 0)

const sum1 = fs.readFileSync(FILE_NAME, 'utf8').split('\n').reduce((sum, elem) => {
    switch (elem) {
        case 'A X':
            return sum + DRAW + ROCK;
        case 'A Y':
            return sum + WIN + PAPER;
        case 'A Z':
            return sum + LOSE + SCISSORS;
        case 'B X':
            return sum + LOSE + ROCK;
        case 'B Y':
            return sum + DRAW + PAPER;
        case 'B Z':
            return sum + WIN + SCISSORS;
        case 'C X':
            return sum + WIN + ROCK;
        case 'C Y':
            return sum + LOSE + PAPER;
        case 'C Z':
            return sum + DRAW + SCISSORS;
        }
}, 0)

console.log(sum1, sum2);

const matrix = { 'A X': DRAW + ROCK, 'A Y': WIN + PAPER, 'A Z': LOSE + SCISSORS,
                 'B X': LOSE + ROCK, 'B Y': DRAW + PAPER, 'B Z': WIN + SCISSORS,
                 'C X': WIN + ROCK, 'C Y': LOSE + PAPER, 'C Z': DRAW + SCISSORS,
}
console.log(fs.readFileSync(FILE_NAME, 'utf8').split('\n').reduce((sum, elem) => sum + matrix[elem], 0));