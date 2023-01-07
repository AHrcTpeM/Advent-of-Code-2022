const fs = require("fs");

const FILE_NAME = 'input.txt';

let data = fs.readFileSync(FILE_NAME, 'utf8').split('\n').map(e => e.split(''));

let elfs = data.reduce((acc, row) => acc + row.reduce((acc, e) => e == '#' ? ++acc : acc, 0), 0);

let map = [...Array(data.length * 3)].map(e => Array(data[0].length * 3).fill('.'));
data.forEach((row, r) => row.forEach((e, c) => map[r + data.length][c + data[0].length] = e));

const direct = [{r: -1, c: 0}, {r: 1, c: 0},{r: 0, c: -1}, {r: 0, c: 1}];
const around = [{r: -1, c: 0}, {r: -1, c: -1}, {r: -1, c: 1}, {r: 1, c: -1}, {r: 1, c: 0}, {r: 1, c: 1}, {r: 0, c: -1}, {r: 0, c: 1}];

let part1Map;
for (let i = 0; i < 2023; i++) {
    if (i == 10) part1Map = map.map(row => row.map(e => e));

    let tempMap = map.map(row => row.map(e => e));
    let dirc = direct.slice(i % 4).concat(direct.slice(0, i % 4));
    let count = 0;
    map.forEach((row, r) => row.forEach((e, c) => {
        if (e == '#') {
            let isFree = around.filter(e => map[r + e.r][c + e.c] == '.').length == 8;
            count = isFree ? ++count : count;

            if (!isFree) {
                for (let k = 0; k < dirc.length; k++) {
                    if (dirc[k].r==0 && map[r][c+dirc[k].c]=='.' && map[r+1][c+dirc[k].c]=='.' && map[r-1][c+dirc[k].c]=='.' ||
                        dirc[k].c==0 && map[r+dirc[k].r][c]=='.' && map[r+dirc[k].r][c+1]=='.' && map[r+dirc[k].r][c-1]=='.') {
                            if (tempMap[r + dirc[k].r][c + dirc[k].c] == '.') {
                                tempMap[r + dirc[k].r][c + dirc[k].c] = '#';
                                tempMap[r][c] = '.';
                            } else {
                                tempMap[r + dirc[k].r][c + dirc[k].c] = '.';
                                tempMap[r + dirc[k].r + dirc[k].r][c + dirc[k].c + dirc[k].c] = '#';
                            }      
                            break;  
                    }
                }
            }
        }        
    }))
    if (count == elfs) {
        console.log('part2', i + 1);
        break;
    }
    map = tempMap;   
}

let x1 = -1, x2 = -1, y1 = -1, y2 = -1;
for (let i = 0; i < part1Map.length; i++) {  // it's a square
    for(let j = 0; j < part1Map.length; j++) {
        x1 = part1Map[j][i] == '#' && x1 == -1 ? i : x1;
        x2 = part1Map[j][part1Map.length - 1 - i] == '#' && x2 == -1 ? part1Map[0].length - 1 - i : x2;
        y1 = part1Map[i][j] == '#' && y1 == -1 ? i : y1;
        y2 = part1Map[part1Map.length - 1 - i][j] == '#' && y2 == -1 ? part1Map.length - 1 - i : y2;
    }
}

console.log('part1', (y2-y1+1) * (x2-x1+1) - elfs);