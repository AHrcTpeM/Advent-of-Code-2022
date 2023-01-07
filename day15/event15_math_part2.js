const fs = require("fs");

const FILE_NAME = 'input.txt';

const data = fs.readFileSync(FILE_NAME, 'utf8').split('\n');

const distance = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

const regexp = /Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/;
let points = [];

data.forEach(row => {    
    const [_, x1, y1, x2, y2] = row.match(regexp).map(Number);
    const radius = distance({x: x1, y: y1}, {x: x2, y: y2});
    points.push({y: y1, x: x1, radius})
})

let foundPoints = [];
for (let i = 0; i < points.length - 1; i++) {
    for (let j = i + 1; j < points.length; j++) {
        let distPoints = distance(points[i], points[j]);
        if (distPoints - points[i].radius - points[j].radius == 2) {
            foundPoints.push([points[i], points[j]]);
        }            
    }
}
foundPoints = foundPoints.flat().sort((a,b)=>b.y-a.y);

let x1 = foundPoints[1].x;
let y1 = foundPoints[1].y;
let r1 = foundPoints[1].radius;
let x2 = foundPoints[0].x;
let y2 = foundPoints[0].y;
let r2 = foundPoints[0].radius;
const c1 = (y2 - y1 + x2 - x1 - r2 + r1) / 2; // solution of a system of equations
console.log((x1 + c1) * 4000000 + (y1 - (r1 - c1) - 1));