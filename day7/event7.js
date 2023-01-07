const fs = require("fs");

const FILE_NAME = 'input.txt';

const file = fs.readFileSync(FILE_NAME, 'utf8').split('$ cd ');

const resultArray = [];

const obj = {};
makeDirScheme(0, obj);

function makeDirScheme(i, obj) {
    if (++i == file.length) {       // recursion end condition
        checkParentWithoutSum(obj);        
        return;        
    }   
    
    let block = file[i].split('\n');
    
    if (file[i].includes('..')) {
        if (file[i + 1].includes('..')) {
            makePropSum(obj.parent);
        }
        makeDirScheme(i, obj.parent); // recursion up on parent
        return;
    }

    let newobj = {};
    obj[block[0]] = newobj;
    newobj.parent = obj;

    block.forEach((line) => {
        const command = line.split(' ');
        if (+command[0] > 0) {
            newobj[command[1]] = command[0];
        } else if (command[0] == 'dir') {
            newobj[command[1]] = {};
        }
    })
    if (!file[i].includes('dir')) {
        makePropSum(newobj);
    }
    makeDirScheme(i, newobj);  // recursion deep into
}

function makePropSum(obj) {
    let sum = 0;
    for (let key in obj) {                
        sum = key == 'parent' ? sum :
              obj[key].sum ? sum + obj[key].sum :
              sum + +obj[key];
    }
    obj.sum = sum;
    resultArray.push(sum);
}

function checkParentWithoutSum(obj) {
    if (obj.parent && !obj.parent.sum) {
        makePropSum(obj.parent);
        checkParentWithoutSum(obj.parent);
    }
}


let result = 0;
let result2 = 0;

const number = 30000000 - (70000000 - obj.sum);
let min = number;
resultArray.forEach((elem) => {   
    if (elem - number > 0 && elem - number < min) {        
        min = elem - number;
        result2 = elem;
    }
    result = elem <= 100000 ? result + elem : result;
})
console.log(result);
console.log(result2);
