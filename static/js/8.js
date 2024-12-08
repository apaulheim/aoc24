const fs = require("node:fs");
const input = fs.readFileSync("../input/8.txt", { encoding: "utf8" });
const data = input.split("\n");

const sub = (a, b) => {
  return [a[0] - b[0], a[1] - b[1]];
};

const getAntinodes = (p1, p2) => {
  const d = sub(p2, p1);
  return [[p1[0] - d[0], p1[1] - d[1]], [p2[0] + d[0], p2[1] + d[1]]];
};

const getAntennaPositions = () => {
  // create maps for each frequency
  const map = new Map();
  for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[y].length; x++) {
      if (data[y][x] != ".") {
        let points = map.get(data[y][x]);
        if (!points) {
          points = [];
        }
        points.push([x, y]);
        map.set(data[y][x], points);
      }
    }
  }
  return map;
};

const part1 = () => {
  const map = getAntennaPositions();
  const uniqueAntinodes = new Set();
  // iterate over each frequency
  for (const [_frequency, positions] of map.entries()) {
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        getAntinodes(positions[i], positions[j])
          .filter((a) =>
            a[0] >= 0 && a[1] >= 0 && a[0] < data[0].length &&
            a[1] < data.length
          )
          .forEach((a) => uniqueAntinodes.add(`${a[0]}, ${a[1]}`));
      }
    }
  }
  return uniqueAntinodes.size;
};

console.log("Part 1:", part1());

const getAntinodes2 = (p1, p2) => {
  const antinodes = [];
  antinodes.push(p1);
  antinodes.push(p2);
  const d = sub(p2, p1);
  let next = [p1[0] - d[0], p1[1] - d[1]];
  while (
    next[0] >= 0 && next[1] >= 0 && next[0] < data[0].length &&
    next[1] < data.length
  ) {
    antinodes.push(next);
    next = [next[0] - d[0], next[1] - d[1]];
  }
  next = [p1[0] + d[0], p1[1] + d[1]];
  while (
    next[0] >= 0 && next[1] >= 0 && next[0] < data[0].length &&
    next[1] < data.length
  ) {
    antinodes.push(next);
    next = [next[0] + d[0], next[1] + d[1]];
  }
  return antinodes;
};

const part2 = () => {
  const map = getAntennaPositions();
  const uniqueAntinodes = new Set();
  // iterate over each frequency
  for (const [_frequency, positions] of map.entries()) {
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        getAntinodes2(positions[i], positions[j])
          .filter((a) =>
            a[0] >= 0 && a[1] >= 0 && a[0] < data[0].length &&
            a[1] < data.length
          )
          .forEach((a) => uniqueAntinodes.add(`${a[0]}, ${a[1]}`));
      }
    }
  }
  return uniqueAntinodes.size;
};

console.log("Part 2:", part2());
