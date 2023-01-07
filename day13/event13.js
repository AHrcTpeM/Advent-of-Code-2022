const fs = require("fs");

const FILE_NAME = 'input.txt';

const input = fs.readFileSync(FILE_NAME, 'utf8')
                .replaceAll('[]', '[?]')
                .replaceAll('10', '!')
                .replaceAll(',', '')
                .split('\n\n')
                .map((e) => e.split('\n'))
                .map((e) => e.map((el) => findArr(el.split(''))[0]));

function findArr(arr) {
    let lastIdx = arr.indexOf(']');  // starts from the innermost brackets
    let firstIdx = arr.slice(0 , lastIdx).lastIndexOf('[');
    let numberArr = arr.slice(firstIdx + 1, lastIdx).map((e) => Array.isArray(e) ? e : (e == '?' ? -1 : (e == '!' ? 10 : +e)));
    let resultArr = arr.slice(0, firstIdx);
    resultArr.push(numberArr);
    resultArr = resultArr.concat(arr.slice(lastIdx +1));
    return resultArr.indexOf(']') != -1 ? findArr(resultArr) : resultArr;
}

// console.dir(input, { depth: null })

function isRight(elem1, elem2) {
    let result = 0;
    for (let i = 0; i < Math.max(elem1.length, elem2.length); i++) {
        let x1 = elem1[i] ?? -3;
        let x2 = elem2[i] ?? -3;
        if (Array.isArray(x1) || Array.isArray(x2)) {
            x1 = !Array.isArray(x1) ? (x1 == -1 ? [--x1] : [x1]) : x1;  // undefined -3, [] -2, [[]] -1
            x2 = !Array.isArray(x2) ? (x2 == -1 ? [--x2] : [x2]) : x2;
            result = isRight(x1, x2);
            if (result == 1) return 1;
            if (result == -1) return -1;
            continue;
        }
        if (x2 > x1) return 1;
        if (x1 > x2) return -1;
    }
    return result;
}

// part 1
console.log(input.reduce((acc, elem, i) => isRight(elem[0], elem[1]) > 0 ? acc + i + 1 : acc, 0));
// part 2
input.push([[[2]], [[6]]]);
console.log(input.flat().sort(isRight).reverse().reduce((acc, a, i) => (a == 2 || a == 6) ? acc * (i + 1) : acc, 1));