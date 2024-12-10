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
        finalArray += " ";
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
                // skip empty free space
                if (input[currentInputIndex] == 0) {
                    currentInputIndex++;
                    blockIndexLeftFile = 0;
                    leftFileIndex++;
                }
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
    return silver;
};

console.log("Part 1:", part1());
// 0 1  2  3  45  6  78 91   11   11  11   11
//                       0   12   34  56   78
// 00...111...2...333.44.5555.6666.777.888899

// 0099.111...2...333.44.5555.6666.777.8888..
// 0099.1117772...333.44.5555.6666.....8888..
// 0099.111777244.333....5555.6666.....8888..
// 00992111777.44.333....5555.6666.....8888..

function moveElement(array, fromIndex, toIndex) {
    if (
        fromIndex < 0 || fromIndex >= array.length || toIndex < 0 ||
        toIndex >= array.length
    ) {
        throw new Error("Index out of bounds");
    }
    const element = array.splice(fromIndex, 1)[0];
    array.splice(toIndex, 0, element);
    // add a free space
    array.splice(fromIndex, 0, { id: -1, len: 0, free: element.len });
}
function findNextFileIndex(disk, start, id) {
    let ret = start - 1;
    while (ret >= 0 && disk[ret].id != id) {
        ret--;
    }
    return ret;
}

const part2 = () => {
    const disk = [];
    for (let i = 0; i < input.length; i++) {
        if (i % 2 == 0) {
            disk.push({ id: i / 2, len: input[i], free: 0 });
        } else {
            disk.push({ id: -1, len: 0, free: input[i] });
        }
    }
    let rightFileIndex = disk.length - 1;
    let rightFileId = disk[rightFileIndex].id;
    while (rightFileIndex >= 0) {
        // find the first free space for the file
        for (let i = 0; i < rightFileIndex; i++) {
            if (
                disk[rightFileIndex].len <= disk[i].free
            ) {
                // found space
                // move file to this position
                moveElement(disk, rightFileIndex, i);
                // update free space
                disk[i + 1].free = disk[i + 1].free - disk[i].len;
                break;
            }
        }
        rightFileId--;
        rightFileIndex = findNextFileIndex(disk, rightFileIndex, rightFileId);
    }

    // calc checksum
    let checksum = 0;
    let blockPosition = 0;
    for (let i = 0; i < disk.length; i++) {
        for (let j = 0; j < disk[i].len; j++) {
            // console.log(disk[i].id, "*", blockPosition);
            checksum += (disk[i].id != -1 ? disk[i].id : 0) * blockPosition;
            blockPosition++;
        }
        blockPosition += disk[i].free;
    }
    return checksum;
};

console.log("Part 2:", part2());
