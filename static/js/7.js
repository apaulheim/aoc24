let fs = require("node:fs");
const input = fs.readFileSync("../input/7.txt", { encoding: "utf8" });
let data = input.split("\n").map((line) => {
  const result = line.split(": ");
  return [parseInt(result[0]), result[1].split(" ").map((x) => parseInt(x))];
});
// console.log(data);

const calc = (a, b, op) => {
  if (op == "+") return a + b;
  if (op == "*") return a * b;
  if (op == "||") return parseInt(a.toString() + b.toString());
};

const solve = (numbers, operators) => {
  let result = numbers[0];

  for (let i = 0; i < numbers.length - 1; i++) {
    result = calc(result, numbers[i + 1], operators[i]);
  }
  return result;
};

const part1 = () => {
  let silver = 0;
  for (let line of data) {
    const result = line[0];
    let operators = [["+"], ["*"]];
    for (let i = 0; i < line[1].length - 2; i++) {
      const newOperators = [];
      for (let j = 0; j < operators.length; j++) {
        newOperators.push(operators[j].concat("+"));
        newOperators.push(operators[j].concat("*"));
      }
      operators = newOperators;
    }
    if (operators.some((op) => solve(line[1], op) == result)) silver += result;
  }
  return silver;
};

console.log(part1());

const part2 = () => {
  let gold = 0;
  for (let line of data) {
    const result = line[0];
    let operators = [["+"], ["*"], ["||"]];
    for (let i = 0; i < line[1].length - 2; i++) {
      const newOperators = [];
      for (let j = 0; j < operators.length; j++) {
        newOperators.push(operators[j].concat("+"));
        newOperators.push(operators[j].concat("*"));
        newOperators.push(operators[j].concat("||"));
      }
      operators = newOperators;
    }
    if (operators.some((op) => solve(line[1], op) == result)) gold += result;
  }
  return gold;
};
console.log(part2());
