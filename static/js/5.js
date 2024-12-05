let fs = require("node:fs");

const input = fs.readFileSync("../input/5.txt", { encoding: "utf8" });
const [rulesStr, updatesStr] = input.split("\n\n");
const rules = rulesStr.split("\n").map((rule) =>
    rule.split("|").map((num) => parseInt(num))
);
const updates = updatesStr.split("\n").map((line) =>
    line.split(",").map((num) => parseInt(num))
);

const isValidUpdate = (update) => {
    let validUpdate = true;
    for (let j = 0; j < rules.length; j++) {
        const rule = rules[j];
        if (
            update.indexOf(rule[0]) != -1 && update.indexOf(rule[1]) != -1 &&
            update.indexOf(rule[0]) > update.indexOf(rule[1])
        ) {
            validUpdate = false;
            break;
        }
    }
    return validUpdate;
};

let silver = 0;
for (let i = 0; i < updates.length; i++) {
    const update = updates[i];
    if (isValidUpdate(update)) silver += update[Math.floor(update.length / 2)];
}
console.log(silver);

let gold = 0;
const invalidUpdates = updates.filter((update) => !isValidUpdate(update));
const smallerThenRules = new Map();
const biggerThenRules = new Map();
for (let i = 0; i < rules.length; i++) {
    const rule = rules[i];
    if (!smallerThenRules.has(rule[0])) {
        smallerThenRules.set(rule[0], []);
    }
    smallerThenRules.get(rule[0]).push(rule[1]);

    if (!biggerThenRules.has(rule[1])) {
        biggerThenRules.set(rule[1], []);
    }
    biggerThenRules.get(rule[1]).push(rule[0]);
}

const sortFn = (a, b) => {
    if (smallerThenRules.has(a) && smallerThenRules.get(a).includes(b)) {
        return -1;
    } else if (biggerThenRules.has(a) && biggerThenRules.get(a).includes(b)) {
        return 1;
    } else {
        return 0;
    }
};

for (let i = 0; i < invalidUpdates.length; i++) {
    const update = invalidUpdates[i];
    const sortedUpdate = update.sort(sortFn);
    gold += sortedUpdate[Math.floor(update.length / 2)];
}
console.log(gold);
