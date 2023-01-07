const fs = require("fs");

const FILE_NAME = 'input.txt';
const START = 500;

const input = fs.readFileSync(FILE_NAME, 'utf8').split('\n').map((e) => e.split(' -> ').map((e) => e.split(',').map(Number)));

const height = input.flat().map(e => e[1]).sort((a,b)=>b-a)[0] + 1;
let map =  [...Array(height + 2)].map((e) => Array(2 * START).fill('.'));

map[map.length - 1] = map.at(-1).map(e => '#'); // the floor is lava

input.forEach((line) => {
    line.forEach((cmd, i) => {
        if (i != 0 && cmd[0] == line[i - 1][0]) {
            let y1 = cmd[1] > line[i - 1][1] ? line[i - 1][1] : cmd[1];
            let y2 = cmd[1] > line[i - 1][1] ? cmd[1] : line[i - 1][1];
            for (let i = y1; i < y2 + 1; i++) {
                map[i][cmd[0]] = '#';
            }
        } else if (i != 0 && cmd[1] == line[i - 1][1]) {
            let x1 = cmd[0] > line[i - 1][0] ? line[i - 1][0] : cmd[0];
            let x2 = cmd[0] > line[i - 1][0] ? cmd[0] : line[i - 1][0];
            for (let i = x1; i < x2 + 1; i++) {
                map[cmd[1]][i] = '#';
            }
        }
    })
})

while (true) {
    let sand = { y: 0, x: START };
    sand = falling(sand);     

    map[sand.y][sand.x] = 'o';        // part 2
    if (sand.y == 0) break;   
    
    // if (sand.y == height) break;    // part1 
    // map[sand.y][sand.x] = 'o';    
}

function falling(sand) {
    let falling = true;
    // while (falling && sand.y != height) {  // part1
    while (falling) {                        // part2
        if (map[sand.y + 1][sand.x] == '.') {
            sand.y++;
        } else if (map[sand.y + 1][sand.x - 1] == '.') {
            sand.x--;
            sand.y++;
        } else if (map[sand.y + 1][sand.x + 1] == '.') {
            sand.x++;
            sand.y++;
        } else {
            falling = false;
        }
    }
    return sand;
}

// console.log(map.map(e => e.join('')));
console.log(map.flat().filter(e => e == 'o').length);