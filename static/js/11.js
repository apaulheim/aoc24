const fs = require("node:fs");
const input = fs.readFileSync("../input/11.txt", { encoding: "utf8" });
const data = input.split(" ").map((a) => parseInt(a));

const cache = new Map();
function count(stone, blinks) {
    const cacheKey = `${stone}:${blinks}`;
    if (cache.has(cacheKey)) return cache.get(cacheKey);
    if (blinks === 0) return 1;
    if (stone === 0) {
        const result = count(1, blinks - 1);
        cache.set(cacheKey, result);
        return result;
    }
    const str = stone.toString();
    let result;
    if (str.length % 2 === 0) {
        const left = parseInt(str.substring(0, str.length / 2));
        const right = parseInt(str.substring(str.length / 2));
        result = count(left, blinks - 1) + count(right, blinks - 1);
    } else {
        result = count(stone * 2024, blinks - 1);
    }
    cache.set(cacheKey, result);
    return result;
}
console.log(
    data.map((stone) => count(stone, 25)).reduce((acc, val) => acc + val, 0),
);
console.log(
    data.map((stone) => count(stone, 75)).reduce((acc, val) => acc + val, 0),
);
