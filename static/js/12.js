const fs = require("node:fs");
const input = fs.readFileSync("../input/12.txt", { encoding: "utf8" });
const data = input.split("\n").map((s) => s.split(""));

const inBounds = (x, y) => {
    return x >= 0 && x < data[0].length && y >= 0 && y < data.length;
};

const calcFence = (x, y) => {
    let fence = 0;
    if (!inBounds(x - 1, y) || data[y][x - 1] !== data[y][x]) {
        fence++;
    }
    if (!inBounds(x + 1, y) || data[y][x + 1] !== data[y][x]) {
        fence++;
    }
    if (!inBounds(x, y - 1) || data[y - 1][x] !== data[y][x]) {
        fence++;
    }
    if (!inBounds(x, y + 1) || data[y + 1][x] !== data[y][x]) {
        fence++;
    }
    return fence;
};

const calcFence2 = (x, y) => {
    return {
        left: !inBounds(x - 1, y) || data[y][x - 1] !== data[y][x],
        right: !inBounds(x + 1, y) || data[y][x + 1] !== data[y][x],
        up: !inBounds(x, y - 1) || data[y - 1][x] !== data[y][x],
        down: !inBounds(x, y + 1) || data[y + 1][x] !== data[y][x],
    };
};

const goThroughRegion = (x, y, regionId) => {
    if (!plotToRegion.has(`${x},${y}`)) {
        plotToRegion.set(`${x},${y}`, regionId);
        regionToPlot.get(regionId).add(`${x},${y}`);
        if (inBounds(x - 1, y) && data[y][x - 1] == data[y][x]) {
            goThroughRegion(x - 1, y, regionId);
        }
        if (inBounds(x + 1, y) && data[y][x + 1] == data[y][x]) {
            goThroughRegion(x + 1, y, regionId);
        }
        if (inBounds(x, y + 1) && data[y + 1][x] == data[y][x]) {
            goThroughRegion(x, y + 1, regionId);
        }
        if (inBounds(x, y - 1) && data[y - 1][x] == data[y][x]) {
            goThroughRegion(x, y - 1, regionId);
        }
    }
};

const plotToRegion = new Map();
const regionToPlot = new Map();
const plotToFence = new Map();
let regionId = 0;
for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[y].length; x++) {
        if (!plotToRegion.has(`${x},${y}`)) {
            // new region
            regionToPlot.set(regionId, new Set());
            goThroughRegion(x, y, regionId);
            regionId++;
        }
        plotToFence.set(`${x},${y}`, calcFence2(x, y));
    }
}

const calcFenceForRegion = (regionId) => {
    const plots = Array.from(regionToPlot.get(regionId));
    const minX = Math.min(...plots.map((p) => parseInt(p.split(",")[0])));
    const maxX = Math.max(...plots.map((p) => parseInt(p.split(",")[0])));
    const minY = Math.min(...plots.map((p) => parseInt(p.split(",")[1])));
    const maxY = Math.max(...plots.map((p) => parseInt(p.split(",")[1])));
    // vertical fences
    let verticalFences = 0;
    for (let x = minX; x <= maxX; x++) {
        let left = false;
        let right = false;
        for (let y = minY; y <= maxY; y++) {
            // next plot is in different region
            if (plotToRegion.get(`${x},${y}`) !== regionId) {
                left = false;
                right = false;
            } else {
                // next plot is in the same region
                if (plotToFence.get(`${x},${y}`).left !== left) {
                    left = plotToFence.get(`${x},${y}`).left;
                    if (left) {
                        verticalFences++;
                    }
                }
                if (plotToFence.get(`${x},${y}`).right !== right) {
                    right = plotToFence.get(`${x},${y}`).right;
                    if (right) {
                        verticalFences++;
                    }
                }
            }
        }
    }
    // horizontal fences
    let horizontalFences = 0;
    for (let y = minY; y <= maxY; y++) {
        let up = false;
        let down = false;
        for (let x = minX; x <= maxX; x++) {
            if (plotToRegion.get(`${x},${y}`) !== regionId) {
                up = false;
                down = false;
            } else {
                if (plotToFence.get(`${x},${y}`).up !== up) {
                    up = plotToFence.get(`${x},${y}`).up;
                    if (up) {
                        horizontalFences++;
                    }
                }
                if (plotToFence.get(`${x},${y}`).down !== down) {
                    down = plotToFence.get(`${x},${y}`).down;
                    if (down) {
                        horizontalFences++;
                    }
                }
            }
        }
    }
    return verticalFences + horizontalFences;
};

// Part 1
console.log(
    Array.from(regionToPlot.values()).reduce(
        (acc, rtp) =>
            acc +
            rtp.size * Array.from(rtp).reduce((a, plot) => {
                    const [x, y] = plot.split(",").map((a) => parseInt(a));
                    return a + calcFence(x, y);
                }, 0),
        0,
    ),
);

// Part 2
console.log(
    Array.from(regionToPlot.keys()).reduce(
        (acc, rtp) =>
            acc +
            regionToPlot.get(rtp).size * calcFenceForRegion(rtp),
        0,
    ),
);
