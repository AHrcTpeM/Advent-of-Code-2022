const fs = require("fs");

const FILE_NAME = 'input.txt';

let cubes = fs.readFileSync(FILE_NAME, 'utf8').split('\n').map(e => e.split(',').map(Number))
              .map(c => [c[0] + 1, c[1] + 1, c[2] + 1]);

const distance = (a, b) => Math.sqrt( Math.pow((a[0]-b[0]),2) + Math.pow((a[1]-b[1]),2) + Math.pow((a[2]-b[2]),2));

let part1 = 0;
for (let i = 0; i < cubes.length; i++) {
    let margin = 0;
    for (let j = 0; j < cubes.length; j++) {
        if (i == j) continue;
        margin += distance(cubes[i], cubes[j]) == 1 ? 1 : 0;
    }
    part1 += (6 - margin);
}
console.log(part1);

//part 2
let map =  [...Array(24)].map((e) => [...Array(24)].map((e) => Array(24).fill('.')));
cubes.forEach(cube => {
    map[cube[2]][cube[0]][cube[1]] = '#';
});

let sum = 0;
let queue = [[0, 0, 0]];
let current;
while (current = queue.shift()) {  // thx)
    sum += step(current[0] + 1, current[1], current[2]);
    sum += step(current[0] -  1, current[1], current[2]);
    sum += step(current[0], current[1] + 1, current[2]);
    sum += step(current[0], current[1] - 1, current[2]);
    sum += step(current[0], current[1], current[2] + 1);
    sum += step(current[0], current[1], current[2] - 1);    
}

function step (x, y, z) {
    let sum = 0;
    const isAtBorder = y > -1 && y < 24 && x > -1 && x < 24 && z > -1 && z < 24;
    if (isAtBorder && map[z][x][y] == '.') {
        map[z][x][y] = 1;
        queue.push([x, y, z]);
        cubes.forEach(cube => {
            sum += distance(cube , [x, y, z]) == 1 ? 1 : 0;
        })
    }
    return sum;
}

// console.log(map.map(e => e.map(e => e.join('')) ));
console.log(sum);