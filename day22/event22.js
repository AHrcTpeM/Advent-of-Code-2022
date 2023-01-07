const fs = require("fs");

const FILE_NAME = 'input.txt';

let data = fs.readFileSync(FILE_NAME, 'utf8').split('\n\n');

let map = data[0].split('\n').map(line => line.split(''));
let commands = data[1];

let start = map[0].findIndex(e => e == '.');
let point = { row: 0, colm: start, dirc: 0 }; 

let dir = {0: '>', 1: 'v', 2: '<', 3: '^' };
let len = map.length / 4;
const ruler = {
    '0-1': { '-10': () => ({ row: 3*len + (point.colm % len), colm: 0, dirc: 0 }),
             '0-1': () => ({ row: 3*len-1 - (point.row % len), colm: 0, dirc: 0 })
            },
    '0-2': { '-10': () => ({ row: 4*len-1, colm: (point.colm % len), dirc: 3 }),
             '10': () => ({ row: len + (point.colm % len), colm: 2*len-1, dirc: 2 }),
             '01': () => ({ row: 3*len-1 - (point.row % len), colm: 2*len-1, dirc: 2 })
            },
    '1-1': { '0-1': () => ({ row: 2*len, colm: (point.row % len), dirc: 1 }),
             '01': () => ({ row: len-1, colm: 2*len + (point.row % len), dirc: 3 })
            },
    '2-0': { '-10': () => ({ row: len + (point.colm % len), colm: len, dirc: 0 }),
             '0-1': () => ({ row: len-1 - (point.row % len), colm: len, dirc: 0 })
            },
    '2-1': { '10': () => ({ row: 3*len + (point.colm % len), colm: len-1, dirc: 2 }),
             '01': () => ({ row: len-1 - (point.row % len), colm: 3*len-1, dirc: 2 })
            },
    '3-0': { '10':  () => ({ row: 0, colm: 2*len + (point.colm % len), dirc: 1 }),
             '0-1': () => ({ row: 0, colm: len + (point.row % len), dirc: 1 }),
             '01': () => ({ row: 3*len-1, colm: len + (point.row % len), dirc: 3 })
           },
}

const isInsideMap = (row, colm) => point.row+row > -1 && point.row+row < map.length && point.colm+colm > -1 && point.colm+colm < map[point.row+row].length && map[point.row+row][point.colm+colm] != ' ';

const run = (number, cmd) => {
    let row = point.dirc == 1 ? 1 : point.dirc == 3 ? -1 : 0;
    let colm = point.dirc == 0 ? 1 : point.dirc == 2 ? -1 : 0;
    for (let i = 0; i < number; i++) {
        if (isInsideMap(row, colm) && map[point.row + row][point.colm + colm] != '#') {            
            point.row += row;
            point.colm += colm;
        } else if (!isInsideMap(row, colm)) {
            //part 2
            let block = Math.floor(point.row / len) + '-' + Math.floor(point.colm / len);
            let goTo = '' + row + colm;
            let tempPoint = ruler[block][goTo]();
            point = map[tempPoint.row][tempPoint.colm] != '#' ? tempPoint : point;
            row = point.dirc == 1 ? 1 : point.dirc == 3 ? -1 : 0;
            colm = point.dirc == 0 ? 1 : point.dirc == 2 ? -1 : 0;   
                     
            //part 1
            // const tempPoint = {row: point.row, colm: point.colm }
            // while (isInsideMap(-1 * row, -1 * colm)) {
            //     point.row += -1 * row;
            //     point.colm += -1 * colm;
            // }
            // if (map[point.row][point.colm] == '#') {
            //     point.row = tempPoint.row;
            //     point.colm = tempPoint.colm;
            // }
        }
    }
    point.dirc = cmd == 'R' ? (point.dirc + 1) % 4 : (point.dirc + 3) % 4;
}

let number = '';
for (let i = 0; i < commands.length; i++) {
    if (!isNaN(commands[i])) {
        number += commands[i];        
    } else { 
        run(+number, commands[i]);
        number = '';        
    }
}
run(+number, 'R');
run(0, 'L'); // updating the last command without turning

console.log('result', point, 1000 * (point.row + 1) + 4 * (point.colm + 1) + point.dirc);

/**
 *   ...111222
 *   ...111222
 *   ...111222
 *   ...333
 *   ...333
 *   ...333
 *   444555
 *   444555
 *   444555
 *   666
 *   666
 *   666
 */