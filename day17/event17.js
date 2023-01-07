const fs = require("fs");

const FILE_NAME = 'input.txt';
const STONES = 10000; // part1 - 2022 

let data = fs.readFileSync(FILE_NAME, 'utf8').split('');

let map = [...Array(100000)].map((e) => Array(7 + 20).fill('.'));

let figure1 = [{ y: 0, x: 0}, { y: 0, x: 1}, { y: 0, x: 2}, { y: 0, x: 3}];
let figure2 = [{ y: 0, x: 1}, { y: 1, x: 0}, { y: 1, x: 1}, { y: 1, x: 2}, { y: 2, x: 1}];    
let figure3 = [{ y: 0, x: 0}, { y: 0, x: 1}, { y: 0, x: 2}, { y: 1, x: 2}, { y: 2, x: 2}];
let figure4 = [{ y: 0, x: 0}, { y: 1, x: 0}, { y: 2, x: 0}, { y: 3, x: 0}];
let figure5 = [{ y: 0, x: 0}, { y: 0, x: 1}, { y: 1, x: 0}, { y: 1, x: 1}];
const arrayFigures = [figure1, figure2, figure3, figure4, figure5];

const move = (figure, y, x) => figure.map(f => ({ y: f.y + y, x: f.x + x}));

let setCoords = new Set();
let heightMap = 0;
let k = 0; // wind index
let cycle = []; 
let startStones = -1; // segment not included in the cycle
for (let i = 0; i < STONES; i++) {    
    let figure = [...arrayFigures[i % 5]];
    figure = move(figure, heightMap + 3, 2); // starting position

    for (let j = k; j < 2*data.length; j++) {
        let idx = j % data.length;
        if (data[idx] == '>' && isFree(figure, 0, 1)) {
            figure = move(figure, 0, 1);
        } else if (data[idx] == '<' && isFree(figure, 0, -1)) {
            figure = move(figure, 0, -1);
        }
        if (isFree(figure, -1, 0)) {
            figure = move(figure, -1, 0);
        } else {
            mapAddFigure(figure);
            heightMap = Math.max(figure.at(-1).y +1, heightMap);
            k = ++j  % data.length;
            findCycleStones(figure);     
            
            if (cycle.length == 2) {
                let trillion = 1000000000000;
                let earlyStones = cycle[0].stones;
                let сycleStones = cycle[1].stones;
                const remainder = trillion - earlyStones - (Math.floor((trillion - earlyStones)/сycleStones) * сycleStones);
                startStones = remainder + (i - 1);
                cycle.push({stones: remainder, height: 'no matter:)'});
            }
            break
        }
    }
    if (i == startStones) {
        cycle.push({stones: i, height: heightMap});
    }
}

function findCycleStones(figure) {
    let coord = k + '-';
    figure.forEach(f => {
        coord += f.x;
    })
    if (setCoords.has(coord)) {
        cycle.push({ stones: setCoords.size, height: heightMap}); // number of stones in cycle and their height
        setCoords = new Set([coord]);
    } else {
        setCoords.add(coord)
    }
}

function isFree(figure, y, x) {
    for (let i = 0; i < figure.length; i++) {
        let checkY = figure[i].y + y;
        let checkX = figure[i].x + x;
        if (checkY < 0 || map[checkY][checkX] == '#') return false;
        if (checkX < 0 || checkX > 6 || map[checkY][checkX] == '#') return false;
    }
    return true;
}

function mapAddFigure(figure) {
    figure.forEach(f => map[f.y][f.x] = '#');

}

console.log('heightMap', heightMap, cycle);
let trillion = 1000000000000;
let earlyStones = cycle[3].stones;
let earlyHeight = cycle[3].height;
let сycleStones = cycle[1].stones;
let cycleHeight = cycle[1].height - cycle[0].height;
console.log(Math.floor((trillion - earlyStones)/сycleStones) * cycleHeight + earlyHeight);