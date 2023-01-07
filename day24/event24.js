const fs = require("fs");

const FILE_NAME = 'input.txt';

let data = fs.readFileSync(FILE_NAME, 'utf8').split('\n').map(e => e.split(''));

let winds = { '>': {r: 0, c: 1}, '<': {r: 0, c: -1}, '^': {r: -1, c: 0}, 'v': {r: 1, c: 0}, '.': {r: 0, c: 0} }

let start = { r: 0, c: data[0].findIndex(e => e == '.') } ;
let end = { r: data.length - 1, c: data.at(-1).findIndex(e => e == '.') };

let cycle = (data.length - 2) * (data[0].length - 2) / 10; // 300 нок -> 150 * 20 / 10 
let trackMaps = [...Array(cycle)].map(e => [...Array(data.length)].map(e => Array(data[0].length).fill('.')));
let windMaps = [data];

for (let i = 0; i < cycle - 1; i++) {
    let map = windMaps[i];
    let newMap = data.map(row => row.map(e => e != '#' ? '.' : '#'));
    for (let row = 0; row < map.length - 2; row++) {
        for (let colm = 0; colm < map[0].length - 2; colm++) {
            if (map[row + 1][colm + 1] != '.') {          // (i) % (length - 2) + 1
                for (let char of map[row + 1][colm + 1]) {
                    let newR = ((map.length - 2) + row + winds[char].r) % (map.length - 2) + 1;
                    let newC = ((map[0].length - 2) + colm + winds[char].c) % (map[0].length - 2) + 1;
                    newMap[newR][newC] = newMap[newR][newC] == '.' ? char : newMap[newR][newC] + char; 
                }
            }
        }
    }
    windMaps.push(newMap);
}

function Node(r, c, step) {
    this.r = r;
    this.c = c;
    this.step = step;
    this.next = null;
}
let head = new Node(start.r, start.c, 0);
let tail = head;

let runCount = 0;
for (let i = 0; i < 1000000; i++) {
    let current = head;
    
    if (current.r == end.r && current.c == end.c && runCount % 2 == 0 ||
        current.r == start.r && current.c == start.c && (runCount + 1) % 2 == 0) {   // reversal
        console.log(runCount === 0 ? 'part1' : 'run' + (runCount + 1), current.step);
        head = current;
        tail = head;
        trackMaps = [...Array(cycle)].map(e => [...Array(data.length)].map(e => Array(data[0].length).fill('.')));
        if (++runCount == 3) break;
        continue;
    }
    
    let map = windMaps[(current.step + 1) % windMaps.length];
    let newMap = trackMaps[(current.step + 1) % trackMaps.length];

    Object.values(winds).forEach(coord => {
        if (current.r + coord.r < map.length && current.r + coord.r > -1 && 
            map[current.r+coord.r][current.c+coord.c] == '.' && newMap[current.r+coord.r][current.c+coord.c] == '.') {
            let node = new Node(current.r + coord.r, current.c + coord.c, current.step + 1);
            tail.next = node;
            tail = node;
    
            newMap[current.r+coord.r][current.c+coord.c] = '1';
        }
    })
    head = head.next;
}
console.log('part2', head.step);