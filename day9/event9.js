const fs = require("fs");

const FILE_NAME = 'input.txt';

const input = fs.readFileSync(FILE_NAME, 'utf8').split('\n').map((e) => e.split(' '));

const SNAKE_SIZE = 10; // part1 - 2
const SIZE_MAP = 500;

const map = new Array(SIZE_MAP).fill(0).map((e) => new Array(SIZE_MAP).fill(0));
const snake = new Array(SNAKE_SIZE).fill(0).map((e) => Object.create({x: SIZE_MAP / 2, y: SIZE_MAP / 2}));

const moveTail = (head, tail) => {
    if (Math.abs(head.x - tail.x) > 1 || Math.abs(head.y - tail.y) > 1) {
        tail.x = head.x > tail.x ? ++tail.x : 
                 head.x < tail.x ? --tail.x : tail.x;
        tail.y = head.y > tail.y ? ++tail.y : 
                 head.y < tail.y ? --tail.y : tail.y;
    }
}

input.forEach((cmd) => {
    for (let i = 0; i < +cmd[1]; i++) {
        snake[0].x = cmd[0] == 'R' ? ++snake[0].x :
                     cmd[0] == 'L' ? --snake[0].x : snake[0].x;
        snake[0].y = cmd[0] == 'U' ? ++snake[0].y :
                     cmd[0] == 'D' ? --snake[0].y : snake[0].y;

        for (let i = 1; i < snake.length; i++) {
            moveTail(snake[i - 1], snake[i]);
        }
        map[snake.at(-1).x][snake.at(-1).y] = 1;
    }    
})

console.log(map.reduce((acc, row) => acc + row.reduce((sum, col) => sum + col, 0), 0));