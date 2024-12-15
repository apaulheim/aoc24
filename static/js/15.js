const fs = require("node:fs");
const content = fs.readFileSync("../input/15.txt", { encoding: "utf8" });
const [warehouseStr, movementsStr] = content.split("\n\n");
const width = warehouseStr.split("\n")[0].length;
const height = warehouseStr.split("\n").length;
const data = warehouseStr.split("\n").map((r) => r.split(""));
const movements = movementsStr.split("\n").join("").split("").map((r) => {
  switch (r) {
    case "^":
      return { x: 0, y: -1 };
    case "v":
      return { x: 0, y: 1 };
    case "<":
      return { x: -1, y: 0 };
    case ">":
      return { x: 1, y: 0 };
  }
});
const robot = { x: 0, y: 0 };
for (let i = 0; i < data.length; i++) {
  for (let j = 0; j < data[i].length; j++) {
    if (data[i][j] == "@") {
      robot.x = j;
      robot.y = i;
      data[i][j] = ".";
      break;
    }
  }
}

const print = (data) => {
  data.forEach((r) => {
    console.log(r.join(""));
  });
  console.log("\n\n\n\n\n");
};

for (const dir of movements) {
  // if there is some space between the robot and the next wall item, the robot can move
  let space = { x: robot.x, y: robot.y };
  let canMove = false;
  do {
    space = { x: space.x + dir.x, y: space.y + dir.y };
    if (data[space.y][space.x] == ".") {
      canMove = true;
    }
  } while (data[space.y][space.x] != "#" && data[space.y][space.x] != ".");
  // if it can move, space contains the next free space.
  if (canMove) {
    // Everything between robot and space are objects that have to be moved with it
    const numObjects = Math.abs(space.x - robot.x) +
      Math.abs(space.y - robot.y) - 1;
    robot.x += dir.x;
    robot.y += dir.y;
    data[robot.y][robot.x] = ".";
    let pos = { x: robot.x + dir.x, y: robot.y + dir.y };
    for (let i = 0; i < numObjects; i++) {
      data[pos.y][pos.x] = "O";
      pos = { x: pos.x + dir.x, y: pos.y + dir.y };
    }
  }
  //   print(data);
}

// sum up coordinates of all objects
let sum = 0;
for (let i = 0; i < data.length; i++) {
  for (let j = 0; j < data[i].length; j++) {
    if (data[i][j] == "O") {
      sum += 100 * i + j;
    }
  }
}
console.log(sum);
