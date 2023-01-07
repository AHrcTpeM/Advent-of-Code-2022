const fs = require("fs");

const FILE_NAME = 'input.txt';
const TIME = 24;             // part1 - 24, part2 - 32
const BLUEPRINT_AMOUNT = 30;  // part1 - 30, part2 - 3

let data = fs.readFileSync(FILE_NAME, 'utf8').split('\n');

const regexp = /Blueprint (\d+): Each ore robot costs (\d+) ore. Each clay robot costs (\d+) ore. Each obsidian robot costs (\d+) ore and (\d+) clay. Each geode robot costs (\d+) ore and (\d+) obsidian./;

data = data.map((row) => {
    const [_, n, costs1, costs2, costs3, costs4, costs5, costs6] = row.match(regexp);
    return {
        time: TIME,
        wait: 0,
        oreRobot: { cor: 0, oreCost: +costs1, amount: 1 },  // cor-(correct) new robot will work on the next turn
        clayRobot: { cor: 0, oreCost: +costs2, amount: 0 },
        obsidianRobot: { cor: 0, oreCost: +costs3, clayCost: +costs4, amount: 0 },
        geodeRobot: { cor: 0, oreCost: +costs5, obsidianCost: +costs6, amount: 0 },
        oreValue: 0,
        clayValue: 0,
        obsidianValue: 0,
        geodeValue: 0,
        path: '',
        next: null,
    }
});

function Node(print) {  // left over from other ideas, works faster
    this.time = print.time;
    this.wait = print.wait;
    this.oreRobot = {cor:0, oreCost: print.oreRobot.oreCost, amount: print.oreRobot.amount};
    this.clayRobot = {cor:0, oreCost: print.clayRobot.oreCost, amount: print.clayRobot.amount};
    this.obsidianRobot = {cor:0, oreCost: print.obsidianRobot.oreCost, clayCost: print.obsidianRobot.clayCost, amount: print.obsidianRobot.amount};
    this.geodeRobot = {cor:0, oreCost: print.geodeRobot.oreCost, obsidianCost: print.geodeRobot.obsidianCost, amount: print.geodeRobot.amount};
    this.oreValue = print.oreValue;
    this.clayValue = print.clayValue;
    this.obsidianValue = print.obsidianValue;
    this.geodeValue = print.geodeValue;
    this.path = print.path;
    this.next = null;
}

let part1 = 0;
let part2 = 1;
data.slice(0, BLUEPRINT_AMOUNT).forEach((print, index) => {
    let maxOreAmount = Math.max(print.oreRobot.oreCost, print.clayRobot.oreCost, print.obsidianRobot.oreCost, print.geodeRobot.oreCost);
    let max = 0;
    let res = recursion(print);

    console.log('Blueprint', index + 1, res);
    part1 += res* (index + 1);
    part2 *= res;
    
    function recursion(current) {
        let diff1 = current.obsidianValue < current.geodeRobot.obsidianCost ? 1 : 0;
        let diff2 = current.obsidianValue + current.obsidianRobot.amount < current.geodeRobot.obsidianCost ? 1 : 0;
        let diff3 = current.clayValue < current.obsidianRobot.clayCost && current.obsidianValue + current.obsidianRobot.amount * 2 < current.geodeRobot.obsidianCost ? 1 : 0;
        let time = current.time - diff1 - diff2 - diff3;
        let maxPossible = (time * (time - 1) / 2 + current.geodeValue + current.geodeRobot.amount * current.time);
        if (maxPossible <= max) return 0;  // trying to reduce options        
        
        let var1 = 0, var2 = 0, var3 = 0, var4 = 0, var5 = 0;
        if (current.time == 0) {
            max = Math.max(max, current.geodeValue);           
            return current.geodeValue;
        }

        if (current.obsidianValue >= current.geodeRobot.obsidianCost && current.oreValue >= current.geodeRobot.oreCost) {
            makeRobot(current, 'geodeRobot');
            addValue(current);
            var1 =  recursion(current);
        } else if (current.clayValue >= current.obsidianRobot.clayCost && current.oreValue >= current.obsidianRobot.oreCost && 
                 !(current.obsidianValue + current.obsidianRobot.amount >= current.geodeRobot.obsidianCost &&
                   current.oreValue + current.oreRobot.amount - current.obsidianRobot.oreCost < current.geodeRobot.oreCost)) { 
                   // if the next turn is not enough ori for geodeRobot, skip it
                let current1 = new Node(current);
                makeRobot(current1, 'obsidianRobot');
                addValue(current1);
                var2 = recursion(current1);
        } else {
            if (current.oreValue >= current.clayRobot.oreCost) {
                let current2 = new Node(current);
                makeRobot(current2, 'clayRobot');
                addValue(current2);
                var3 = recursion(current2);
            }
            if (current.oreValue >= current.oreRobot.oreCost && current.oreRobot.amount < maxOreAmount) {
                let current3 = new Node(current);
                makeRobot(current3, 'oreRobot');
                addValue(current3);
                var4 = recursion(current3);
            }
            if (current.wait < 4) {
                current.path += ' '
                current.wait += 1;
                addValue(current);     
                var5 = recursion(current);
            }            
        } 
        return Math.max(var1, var2, var3, var4, var5);
    }

    function makeRobot(blueprint, robot) {
        blueprint.wait = 0;
        blueprint[robot].amount++;
        blueprint[robot].cor = 1;
        blueprint.oreValue -= blueprint[robot].oreCost; 
        blueprint.clayValue -= robot == 'obsidianRobot' ? blueprint.obsidianRobot.clayCost : 0;
        blueprint.obsidianValue -= robot == 'geodeRobot' ? blueprint.geodeRobot.obsidianCost : 0;
    }

    function addValue(blueprint) {
        blueprint.oreValue += blueprint.oreRobot.amount - blueprint.oreRobot.cor;
        blueprint.clayValue += blueprint.clayRobot.amount - blueprint.clayRobot.cor;
        blueprint.obsidianValue += blueprint.obsidianRobot.amount - blueprint.obsidianRobot.cor;
        blueprint.geodeValue += blueprint.geodeRobot.amount - blueprint.geodeRobot.cor;
    
        blueprint.geodeRobot.cor = 0;
        blueprint.obsidianRobot.cor = 0;
        blueprint.clayRobot.cor = 0;
        blueprint.oreRobot.cor = 0;

        blueprint.time -= 1;
    }
})

console.log('result:', TIME == 24 ? part1 : part2);