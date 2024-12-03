const fs = require("node:fs");

const input = fs.readFileSync("../input/1.txt", { encoding: "utf8" });
const lines = input.split("\n");
const regex = /(\d+)\s{3}(\d+)/;
let leftNumbers = [];
let rightNumbers = [];

for (let i = 0; i < lines.length; i++) {
  const match = lines[i].match(regex);
  if (match) {
    leftNumbers.push(parseInt(match[1]));
    rightNumbers.push(parseInt(match[2]));
  }
}

leftNumbers = leftNumbers.sort((a, b) => a - b);
rightNumbers = rightNumbers.sort((a, b) => a - b);

const silver = leftNumbers.reduce(
  (acc, curr, index) => acc + Math.abs(curr - rightNumbers[index]),
  0,
);
console.log(silver);

const rightMap = new Map();
for (let i = 0; i < rightNumbers.length; i++) {
  rightMap.set(rightNumbers[i], (rightMap.get(rightNumbers[i]) || 0) + 1);
}
const gold = leftNumbers.reduce(
  (acc, curr) => acc + curr * (rightMap.get(curr) || 0),
  0,
);
console.log(gold);
