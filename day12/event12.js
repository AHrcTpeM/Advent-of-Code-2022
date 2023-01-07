const fs = require("fs");

const FILE_NAME = 'input.txt';

let input = fs.readFileSync(FILE_NAME, 'utf8').split('\n');

function hillClimbing (input, start) {
    input = input.map((e) => e.split('').map((e) => e.charCodeAt(0)));

    const map = [...Array(input.length)].map((e) => Array(input[0].length).fill(0));

    let end;
    input.forEach((row, y) => row.forEach((e, x) => {
        if (e == 'S'.charCodeAt(0)) {
            start = start ?? [y, x];
            input[y][x] = 'a'.charCodeAt(0);
        } 
        if (e == 'E'.charCodeAt(0)) {
            end = [y, x];
            input[y][x] = 'z'.charCodeAt(0);
        } 
    }))

    let queue = [start];
    while (true) {
        let point = queue.shift();
        if (!point) break;
        
        step(point[0], point[1] + 1, point);
        step(point[0], point[1] - 1, point);
        step(point[0] + 1, point[1], point);
        step(point[0] - 1, point[1], point);
    }
    
    function step (y, x, point) {
        const isAtBorder = y > -1 && y < map.length && x > -1 && x < map[0].length;
        if (isAtBorder && input[point[0]][point[1]] >= input[y][x] - 1 && map[y][x] == 0) {
            map[y][x] = map[point[0]][point[1]] + 1;
            queue.push([y, x]);
        }
    }
    return map[end[0]][end[1]];
}
// part 1
console.log(hillClimbing(input));
// part 2
console.log(input.map((row, y) => row.split('')
                 .map((e, x) => e == 'a' ? hillClimbing(input, [y, x]) : 0)
                 .filter(e => e)).flat().sort((a,b)=>a-b)[0]);