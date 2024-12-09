const fs = require("node:fs");
const input = fs.readFileSync("../input/9.txt", { encoding: "utf8" }).split("")
    .map((a) => parseInt(a));
console.log(input.length % 2);

const part1 = () => {
    let silver = 0;
    let leftFileIndex = 0;
    let rightFileIndex = (input.length - 1) / 2;
    let currentInputIndex = 0;
    let blockIndexLeftFile = 0;
    let blockIndexRightFile = input[rightFileIndex * 2] - 1;
    let blockIndexFreeSpace = 0;
    resultBlockPosition = 0;
    let finalArray = "";
    while (
        leftFileIndex < rightFileIndex ||
        (leftFileIndex == rightFileIndex &&
            blockIndexLeftFile <= blockIndexRightFile)
    ) {
        finalArray += currentInputIndex % 2 == 0
            ? leftFileIndex
            : rightFileIndex;
        silver += resultBlockPosition *
            (currentInputIndex % 2 == 0 ? leftFileIndex : rightFileIndex);
        // normal file position
        if (currentInputIndex % 2 == 0) {
            blockIndexLeftFile++;
            // we are at the end of the file
            if (blockIndexLeftFile == input[currentInputIndex]) {
                currentInputIndex++;
                blockIndexFreeSpace = 0;
            }
        } // inside free space
        else {
            blockIndexFreeSpace++;
            blockIndexRightFile--;
            // we are at the end of the free space
            if (blockIndexFreeSpace == input[currentInputIndex]) {
                currentInputIndex++;
                blockIndexLeftFile = 0;
                leftFileIndex++;
            }
            // we are at the end of the right file
            if (
                blockIndexRightFile == -1
            ) {
                rightFileIndex--;
                blockIndexRightFile = input[rightFileIndex * 2] - 1;
            }
        }
        resultBlockPosition++;
    }
    // console.log("0099811188827773336446555566");
    // console.log(finalArray);
    // 4247972648308 too low
    return silver;
};

console.log("Part 1:", part1());
