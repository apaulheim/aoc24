let fs = require("node:fs");
const input = fs.readFileSync("../input/6.txt", { encoding: "utf8" });
let data = input.split("\n").map((line) => line.split(""));

const move = (x, y, direction, obstacle) => {
    if (isObstacleInFront(x, y, direction, obstacle)) {
        direction = turnRight(direction);
        return move(x, y, direction, obstacle);
    }
    return [x + direction[0], y + direction[1], direction[0], direction[1]];
};

const turnRight = (direction) => {
    if (direction[0] == 0 && direction[1] == -1) return [1, 0];
    if (direction[0] == 1 && direction[1] == 0) return [0, 1];
    if (direction[0] == 0 && direction[1] == 1) return [-1, 0];
    if (direction[0] == -1 && direction[1] == 0) return [0, -1];
};

const isObstacleInFront = (x, y, direction, obstaclePosition) => {
    const nextX = x + direction[0];
    const nextY = y + direction[1];
    if (
        nextX >= 0 && nextX < data[0].length && nextY >= 0 &&
        nextY < data.length
    ) {
        return data[nextY][nextX] == "#" ||
            (obstaclePosition &&
                (nextY == obstaclePosition[1] && nextX == obstaclePosition[0]));
    }
    return false;
};

const isLeavingGrid = (x, y) => {
    return x < 0 || x >= data[0].length || y < 0 ||
        y >= data.length;
};

const part1 = () => {
    let x = 0;
    let y = 0;
    let direction = [0, -1];
    // find guard
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            if (data[i][j] == "^") {
                x = j;
                y = i;
            }
        }
    }
    const visited = new Set();
    while (!isLeavingGrid(x, y)) {
        visited.add(`${x},${y}`);
        [x, y, direction[0], direction[1]] = move(
            x,
            y,
            direction,
        );
    }
    // count X
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            if (data[i][j] == "X") silver++;
        }
    }
    return visited.size;
};

console.log(part1());

const nextPotentialObstacle = (startX, startY) => {
    let stX = startX + 1;
    let stY = startY;
    if (stX >= data[0].length) {
        stX = 0;
        stY++;
    }
    for (let y = stY; y < data.length; y++) {
        for (let x = stX; x < data[y].length; x++) {
            if (data[y][x] != "X") {
                return [x, y];
            }
        }
    }
    return null;
};

const isLoop = (x, y, direction, visited) => {
    return visited.has(`${x},${y},${direction[0]},${direction[1]}`);
};

const part2 = () => {
    let startX = 0;
    let startY = 0;
    let startDirection = [0, -1];
    let gold = 0;
    // find guard
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            if (data[i][j] == "^") {
                startX = j;
                startY = i;
            }
        }
    }

    let obstacle = [-1, 0];
    while (nextPotentialObstacle(obstacle[0], obstacle[1])) {
        obstacle = nextPotentialObstacle(obstacle[0], obstacle[1]);
        let x = startX;
        let y = startY;
        let direction = startDirection.slice();
        const visited = new Set();
        let loop = false;
        while (!isLeavingGrid(x, y) && !loop) {
            loop = isLoop(x, y, direction, visited);
            visited.add(`${x},${y},${direction[0]},${direction[1]}`);
            [x, y, direction[0], direction[1]] = move(
                x,
                y,
                direction,
                obstacle,
            );
        }
        if (loop) gold++;
    }
    return gold;
};
// 1890 too high
console.time("part2");
console.log(part2());
console.timeEnd("part2");
