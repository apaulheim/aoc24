let fs = require("node:fs");

const input = fs.readFileSync("../input/4.txt", { encoding: "utf8" });
const data = input.split("\n");
let word = "XMAS";
let directions = [
  [0, 1],
  [0, -1],
  [1, 0],
  [1, 1],
  [1, -1],
  [-1, 0],
  [-1, 1],
  [-1, -1],
];

const checkPos = (x, y) => {
  return x >= 0 && y >= 0 && x < data[0].length && y < data.length;
};

const searchDirection = (posX, posY, dirX, dirY) => {
  let found = 1;
  let x = posX;
  let y = posY;
  for (let i = 0; i < word.length; i++) {
    if (!checkPos(x, y) || data[y][x] != word[i]) found = 0;
    x += dirX;
    y += dirY;
  }
  // if (found) console.log(posX, posY, dirX, dirY);
  return found;
};

const searchAllDirections = (x, y) => {
  let found = 0;
  for (const dir of directions) {
    found += searchDirection(x, y, dir[0], dir[1]);
  }
  return found;
};

const part1 = () => {
  let silver = 0;
  for (let y = 0; y < data.length; y++) {
    const positions = data[y].matchAll(/X/g);
    for (const pos of positions) {
      // console.log(pos);
      silver += searchAllDirections(pos.index, y);
    }
  }
  return silver;
};

console.log(part1());

word = "MAS";

const findCross = (x, y) => {
  let found = 0;
  found += searchDirection(x - 1, y - 1, 1, 1);
  found += searchDirection(x - 1, y + 1, 1, -1);
  found += searchDirection(x + 1, y + 1, -1, -1);
  found += searchDirection(x + 1, y - 1, -1, 1);
  return (found == 2) ? 1 : 0;
};

const part2 = () => {
  let gold = 0;
  for (let y = 0; y < data.length; y++) {
    const positions = data[y].matchAll(/A/g);
    for (const pos of positions) {
      gold += findCross(pos.index, y);
    }
  }
  return gold;
};

console.log(part2());
