let fs = require("node:fs");

const input = fs.readFileSync("../input/3.txt", { encoding: "utf8" });
let silver = 0;

const regex = /mul\((\d+),(\d+)\)/g;
const mulStrings = input.match(regex);
for (let i = 0; i < mulStrings.length; i++) {
    const match = mulStrings[i].match(/mul\((\d+),(\d+)\)/);
    if (match) {
        silver += parseInt(match[1]) * parseInt(match[2]);
    }
}
console.log(silver);

let gold = 0;
let mulMap = new Map();
let doMap = new Map();
let indices = [];
const mul = input.matchAll(regex);
for (const match of mul) {
    indices.push(match.index);
    mulMap.set(match.index, [match[1], match[2]]);
}
const dos = input.matchAll(/do(?!n't)/g);
for (const match of dos) {
    indices.push(match.index);
    doMap.set(match.index, 1);
}
const donts = input.matchAll(/don't/g);
for (const match of donts) {
    indices.push(match.index);
    doMap.set(match.index, 0);
}
indices = indices.sort((a, b) => a - b);
let count = true;
let i = 0;
while (i < indices.length) {
    if (mulMap.has(indices[i])) {
        if (count) {
            gold += mulMap.get(indices[i])[0] * mulMap.get(indices[i])[1];
        }
    } else if (doMap.has(indices[i])) {
        if (doMap.get(indices[i]) == 1) {
            count = true;
        } else count = false;
    }
    i++;
}
console.log(gold);
