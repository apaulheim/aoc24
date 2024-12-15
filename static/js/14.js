import { readFileSync } from "node:fs";
const content = readFileSync("../input/14.txt", { encoding: "utf8" });
const regex = /p=(\d+),(\d+)\s+v=(-?\d+),(-?\d+)/g;
let match;
const data = [];

while ((match = regex.exec(content)) !== null) {
  const p = { x: parseInt(match[1]), y: parseInt(match[2]) };
  const v = { x: parseInt(match[3]), y: parseInt(match[4]) };
  data.push({ p, v });
}
const space = { width: 101, height: 103 };

const endPositions = data.map((
  r,
) => [
  (space.width + ((r.p.x + r.v.x * 100) % space.width)) % space.width,
  (space.height + ((r.p.y + r.v.y * 100) % space.height)) % space.height,
]);

const part1 =
  endPositions.filter((p) =>
    p[0] < Math.floor(space.width / 2) && p[1] < Math.floor(space.height / 2)
  ).length *
  endPositions.filter((p) =>
    p[0] > Math.floor(space.width / 2) && p[1] < Math.floor(space.height / 2)
  ).length *
  endPositions.filter((p) =>
    p[0] < Math.floor(space.width / 2) && p[1] > Math.floor(space.height / 2)
  ).length *
  endPositions.filter((p) =>
    p[0] > Math.floor(space.width / 2) && p[1] > Math.floor(space.height / 2)
  ).length;

console.log(part1);

const print = (positions, space) => {
  const grid = Array(space.height)
    .fill()
    .map(() => Array(space.width).fill(" "));
  positions.forEach((p) => {
    grid[p[1]][p[0]] = "#";
  });
  grid.forEach((r) => {
    console.log(r.join(""));
  });
};

// for (let i = 170; i < 100000; i += 101) {
//   const positions = data.map((r) => [
//     (space.width + ((r.p.x + r.v.x * i) % space.width)) % space.width,
//     (space.height + ((r.p.y + r.v.y * i) % space.height)) % space.height,
//   ]);
//   console.log(i, "\n\n");
//   print(positions, space);
//   console.log("\n\n\n\n\n");
// }

// for (let i = 115; i < 100000; i += 103) {
//   const positions = data.map((r) => [
//     (space.width + ((r.p.x + r.v.x * i) % space.width)) % space.width,
//     (space.height + ((r.p.y + r.v.y * i) % space.height)) % space.height,
//   ]);
//   console.log(i, "\n\n");
//   print(positions, space);
//   console.log("\n\n\n\n\n");
// }

console.log(8149);
const positions = data.map((r) => [
  (space.width + ((r.p.x + r.v.x * 8149) % space.width)) % space.width,
  (space.height + ((r.p.y + r.v.y * 8149) % space.height)) % space.height,
]);
print(positions, space);
