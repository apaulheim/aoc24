const fs = require("node:fs");
const content = fs.readFileSync("../input/13.txt", { encoding: "utf8" });
const lines = content.split("\n");
const data = [];
for (let i = 0; i < lines.length; i += 4) {
  const buttonA = lines[i].match(/Button A: X\+(\d+), Y\+(\d+)/);
  const buttonB = lines[i + 1].match(/Button B: X\+(\d+), Y\+(\d+)/);
  const prize = lines[i + 2].match(/Prize: X=(\d+), Y=(\d+)/);

  if (buttonA && buttonB && prize) {
    data.push({
      a: { x: parseInt(buttonA[1]), y: parseInt(buttonA[2]) },
      b: { x: parseInt(buttonB[1]), y: parseInt(buttonB[2]) },
      prize: { x: parseInt(prize[1]), y: parseInt(prize[2]) },
    });
  }
}

const part1 = data.map((m) => {
  // get as close as possible to the prize with B
  let bPresses = Math.min(
    Math.floor(m.prize.x / m.b.x),
    Math.floor(m.prize.y / m.b.y),
  );
  // try to fill the rest with A
  let restX = m.prize.x - bPresses * m.b.x;
  let restY = m.prize.y - bPresses * m.b.y;
  let aPresses = Math.min(
    Math.floor(restX / m.a.x),
    Math.floor(restY / m.a.y),
  );

  while (
    bPresses >= 0 &&
    !((bPresses * m.b.x + aPresses * m.a.x) == m.prize.x &&
      (bPresses * m.b.y + aPresses * m.a.y) == m.prize.y)
  ) {
    bPresses--;
    restX = m.prize.x - bPresses * m.b.x;
    restY = m.prize.y - bPresses * m.b.y;
    aPresses = Math.min(
      Math.floor(restX / m.a.x),
      Math.floor(restY / m.a.y),
    );
  }
  if (
    ((aPresses * m.a.x + bPresses * m.b.x) == m.prize.x &&
      (aPresses * m.a.y + bPresses * m.b.y) == m.prize.y)
  ) return aPresses * 3 + bPresses;
  else return 0;
}).reduce((acc, cur) => acc + cur, 0);
console.log(part1);

data2 = data.map((m) => {
  m.prize.x = parseInt("10000000000000" + m.prize.x);
  m.prize.y = parseInt("10000000000000" + m.prize.y);
});

const part2 = data.map((m) => {
  // get as close as possible to the prize with B
  let bPresses = Math.min(
    Math.floor(m.prize.x / m.b.x),
    Math.floor(m.prize.y / m.b.y),
  );
  // try to fill the rest with A
  let restX = m.prize.x - bPresses * m.b.x;
  let restY = m.prize.y - bPresses * m.b.y;
  let aPresses = Math.min(
    Math.floor(restX / m.a.x),
    Math.floor(restY / m.a.y),
  );

  while (
    bPresses >= 0 &&
    !((bPresses * m.b.x + aPresses * m.a.x) == m.prize.x &&
      (bPresses * m.b.y + aPresses * m.a.y) == m.prize.y)
  ) {
    bPresses--;
    restX = m.prize.x - bPresses * m.b.x;
    restY = m.prize.y - bPresses * m.b.y;
    aPresses = Math.min(
      Math.floor(restX / m.a.x),
      Math.floor(restY / m.a.y),
    );
  }
  if (
    ((aPresses * m.a.x + bPresses * m.b.x) == m.prize.x &&
      (aPresses * m.a.y + bPresses * m.b.y) == m.prize.y)
  ) return aPresses * 3 + bPresses;
  else return 0;
}).reduce((acc, cur) => acc + cur, 0);
console.log(part2);
