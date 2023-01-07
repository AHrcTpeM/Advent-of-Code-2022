const fs = require("fs");

const FILE_NAME = 'input.txt';

const input = fs.readFileSync(FILE_NAME, 'utf8').split('\n').map((e) => e.split(''));

// part 1
const isVisible = (start, end, x, y, direction) => {
    let visible = true;
    for (let i = start; i < end; i++) {
        if (direction == 'row' && input[x][y] <= input[x][i] ||
            direction == 'column' && input[x][y] <= input[i][y]) {
            visible = false;
            break;
        }
    }
    return visible;
}
let sum = 0;
for (let x = 1; x < input.length - 1; x++) {
    for (let y = 1; y < input[0].length - 1; y++) {        
        if (isVisible(0, y, x, y, 'row') || 
            isVisible(y + 1, input[0].length, x, y, 'row') ||
            isVisible(0, x, x, y, 'column') ||
            isVisible(x + 1, input.length, x, y, 'column')) {
            sum += 1;
        }   
    }
}
console.log(sum + (input.length - 1) * 4);

// part 2
const scenicScore = (start, end, x, y, direction) => {
    let score = 0;
    for (let i = start; ; ) {
        if (i == end) break;
        
        if (direction == 'row' && input[x][y] >= input[x][i] ||
            direction == 'column' && input[x][y] >= input[i][y]) {
            score += 1;
        }
        if (direction == 'row' && input[x][y] <= input[x][i] ||
            direction == 'column' && input[x][y] <= input[i][y]) {
            break;
        }
        
        i = end - start > 0 ? ++i : --i;
    }
    return score;
}
let rating = 0;
for (let x = 1; x < input.length - 1; x++) {
    for (let y = 1; y < input[0].length - 1; y++) {
        const score = scenicScore(y - 1, -1, x, y, 'row') *
                      scenicScore(y + 1, input[0].length, x, y, 'row') *
                      scenicScore(x - 1, -1, x, y, 'column') *
                      scenicScore(x + 1, input.length, x, y, 'column');
        rating = Math.max(score, rating);
    }
}
console.log(rating);