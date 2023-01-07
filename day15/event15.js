const fs = require("fs");

const FILE_NAME = 'input.txt';
const MAIN_ROW = 2000000;

const data = fs.readFileSync(FILE_NAME, 'utf8').split('\n');

const distance = (sensor, beacon) => Math.abs(sensor.x - beacon.x) + Math.abs(sensor.y - beacon.y);

const getRowNumbers = (sensor, y, dist) => {
    const d = dist - Math.abs(y - sensor.y);
    return d > 0 ? [sensor.x - d, sensor.x + d] : undefined;
}

const run = (data, main_row) => {
    const regexp = /Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/;
    let rowNumbers = [];
    let rowBeacons = [];
    data.forEach(row => {    
        const [_, x1, y1, x2, y2] = row.match(regexp).map(Number);
        const dist = distance({x: x1, y: y1}, {x: x2, y: y2});
        let numbers = getRowNumbers({x: x1, y: y1}, main_row, dist);

        if (numbers) rowNumbers.push(numbers);
        if (y2 == main_row) rowBeacons.push([x2, y2].join('-'));
    })
    const tuningPoint = checkPoints(rowNumbers, main_row);

    return {rowNumbers, rowBeacons, tuningPoint};
}

function checkPoints(numbers, row) {
    for (let i = 0; i < numbers.length; i++) {
        for (let j = i + 1; j < numbers.length; j++) {
            if (numbers[i][1] + 2 == numbers[j][0]) {
                let outside = true; 
                for (let k = 0; k < numbers.length; k++) {
                    if (numbers[k][0] <= numbers[i][1] + 1 && numbers[k][1] >= numbers[i][1] + 1) {
                        outside = false;
                    }
                }
                if (outside) {
                    return [row, numbers[i][1] + 1];
                }                
            }            
        }
    }
}
// part 1
let res1 = run(data, MAIN_ROW);
res1.rowNumbers = res1.rowNumbers.flat().sort((a,b)=>a-b);
console.log(res1.rowNumbers.at(-1) - res1.rowNumbers.at(0) + 1 - new Set(res1.rowBeacons).size);
// part 2
for (let i = 0; i <= 2 * MAIN_ROW; i++) {
    if (i % 500000 == 0) console.log('row:', i);
    const res2 = run(data, i).tuningPoint;
    if (res2) console.log(res2[1] * 2 * MAIN_ROW + res2[0]);
}