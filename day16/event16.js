const fs = require("fs");

const FILE_NAME = 'input.txt';

let data = fs.readFileSync(FILE_NAME, 'utf8').split('\n');

const regexp = /Valve ([A-Z]+) has flow rate=(\d+); tunnels? leads? to valves? (.+)/;

data = data.reduce((acc, row) => {    
    const [_, point, value, points] = row.match(regexp);
    return {
        ...acc,
        [point]: { value: +value, points: points.split(', ') }
    }
}, {});

let dataValue = {};
for (let key in data) {
    dataValue[key] = data[key].value;
}

let queue = [{
    value: 0,    
    data: dataValue,    
    man: {
        time: 26,  // part 1 - 30
        value: 0,
        lastValue: false,
        coord: 'AA',
        lastCoord: 'AA',
        path: '',
    },
    eleph: {
        time: 26,  // part1 - 0
        value: 0,
        lastValue: false,
        coord: 'AA',
        lastCoord: 'AA',
        path: '',
    }
}]

for (let i = 0; i < 100000; i++) {      
    if (i % 1000 == 0) {
        queue = queue.sort((a,b)=>b.value-a.value).slice(0, 1000); // two adjustment elements
    }     

    let current = queue.shift();  

    if (current.man.time < 1) {
        console.log('break', i);
        break;  
    }
    if (isEmpty(current.data) || (current.man.time < 2 && current.eleph.time < 2)) {
        queue.push(current);
    } else {
        data[current.man.coord].points.forEach((e, i) => { 
            if (current.data[e] == 0 && e == current.man.lastCoord && !current.man.lastValue) {  
                //pass
            } else {
                if (current.data[e] > 10) {
                    startEleph(createObj('man', current, 2, true, e, true));
                } else if (current.data[e] < 10 && current.data[e] > 0) {
                    startEleph(createObj('man', current, 2, true, e, true));
                    startEleph(createObj('man', current, 1, false, e, false, '^'));
                } else {
                    startEleph(createObj('man', current, 1, false, e, false));
                }
            }
        })
    }
}

function isEmpty(data) {
    return Object.values(data).filter(x => x).length == 0;
}

function createObj(who, current, t, lastValue, e, turn, path = '') {
    let obj =  {
            time: current[who].time - t,
            value: current[who].value + (turn ? current.data[e] * (current[who].time - t) : 0),
            lastValue: lastValue,
            coord: e,
            lastCoord: current[who].coord,
            path: current[who].path + current[who].coord + path,
        }
    return {
        ...current,
        value: current.value + (turn ? current.data[e] * (current[who].time - t) : 0),
        data: turn ? {...current.data, [e]: 0 } : {...current.data},
        [who]: obj,
    }
}

function startEleph(current) {
    if (current.eleph.time > 1) {
        data[current.eleph.coord].points.forEach((e, i) => { 
            if (current.data[e] == 0 && e == current.eleph.lastCoord && !current.eleph.lastValue) {  
            //pass
            } else {
                if (current.data[e] > 10) {
                    queue.push(createObj('eleph', current, 2, true, e, true));
                } else if (current.data[e] < 10 && current.data[e] > 0) {
                    queue.push(createObj('eleph', current, 2, true, e, true));
                    queue.push(createObj('eleph', current, 1, false, e, false, '^'));
                } else {
                    queue.push(createObj('eleph', current, 1, false, e, false));
                }
            }
        })
    } else {
        queue.push(current);
    }
}

console.log('answer', queue.map(e => ({value: e.value })).sort((a,b)=>b.value-a.value).slice(0,1));