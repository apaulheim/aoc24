const fs = require("node:fs");
const input = fs.readFileSync("../input/10.txt", { encoding: "utf8" });
const data = input.split("\n").map((s) =>
    s.split("")
        .map((a) => parseInt(a))
);

const inBounds = (x, y) => {
    return x >= 0 && x < data[0].length && y >= 0 && y < data.length;
};

const move = (x, y, acc, isPart2) => {
    if (inBounds(x, y)) {
        if (data[y][x] === 9) {
            if (isPart2) {
                acc.push(x + "," + y);
            } else acc.add(x + "," + y);
        }
        if (inBounds(x, y - 1) && data[y - 1][x] === data[y][x] + 1) {
            move(x, y - 1, acc, isPart2);
        }
        if (inBounds(x + 1, y) && data[y][x + 1] === data[y][x] + 1) {
            move(x + 1, y, acc, isPart2);
        }
        if (inBounds(x, y + 1) && data[y + 1][x] === data[y][x] + 1) {
            move(x, y + 1, acc, isPart2);
        }
        if (inBounds(x - 1, y) && data[y][x - 1] === data[y][x] + 1) {
            move(x - 1, y, acc, isPart2);
        }
    }
};

const part1 = () => {
    const silver = [];
    for (let y = 0; y < data.length; y++) {
        for (let x = 0; x < data[y].length; x++) {
            if (data[y][x] === 0) {
                const newset = new Set();
                silver.push(newset);
                move(x, y, newset, false);
            }
        }
    }
    return silver.reduce((acc, s) => acc + s.size, 0);
};

const part2 = () => {
    const gold = [];
    for (let y = 0; y < data.length; y++) {
        for (let x = 0; x < data[y].length; x++) {
            if (data[y][x] === 0) {
                const newset = [];
                gold.push(newset);
                move(x, y, newset, true);
            }
        }
    }
    return gold.reduce((acc, s) => acc + s.length, 0);
};

console.log(part1());
console.log(part2());
