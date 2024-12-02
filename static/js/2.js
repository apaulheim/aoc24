let fs = require("node:fs");

const input = fs.readFileSync("../input/2.txt", { encoding: "utf8" });
const reports = input.split("\n").map((line) =>
    line.split(" ").map((num) => parseInt(num))
);

const checkReport = (report) => {
    let safe = true;
    let increasing = true;
    for (let i = 1; i < report.length; i++) {
        if (i == 1) {
            increasing = report[i] > report[i - 1];
            if (report[i] == report[i - 1]) {
                safe = false;
            }
        } else if (
            (increasing && report[i] < report[i - 1]) ||
            (!increasing && report[i] > report[i - 1]) ||
            report[i] == report[i - 1]
        ) {
            safe = false;
        }
        if (Math.abs(report[i] - report[i - 1]) > 3) {
            safe = false;
        }
    }
    return safe;
};

let silver = 0;
for (let i = 0; i < reports.length; i++) {
    if (checkReport(reports[i])) silver++;
}
console.log(silver);

let gold = 0;
for (let i = 0; i < reports.length; i++) {
    const report = reports[i];
    let safe = checkReport(report);
    if (!safe) {
        const reportsWithOneRemoved = [];
        for (let j = 0; j < report.length; j++) {
            const newReport = report.slice();
            newReport.splice(j, 1);
            reportsWithOneRemoved.push(newReport);
        }
        safe = reportsWithOneRemoved.some((report) => checkReport(report));
    }
    if (safe) gold++;
}
console.log(gold);
