const input = require("./input.js");

let nums = new Set('1234567890');
let totalGearRatio = 0;

for (let i = 0; i < input.length; i++) {
  let prevLine = i - 1 >= 0 ? input[i - 1] : undefined;
  let line = input[i];
  let nextLine = i + 1 < input.length ? input[i + 1] : undefined;

  for (let j = 0; j < line.length; j++) {
    if (line[j] === '*') {
      let adjacentPartNums = findAdjacentPartNums(line, j, prevLine, nextLine);
      if (adjacentPartNums.length === 2) {
        totalGearRatio += adjacentPartNums[0] * adjacentPartNums[1];
      }
    }
  }
}

console.log(totalGearRatio);

function findAdjacentPartNums(line, index, prev, next) {
  let partNums = [];
  for (let i = -1; i <= 1; i++) {
    partNums.push(...getPartNumsAt(line, index + i));
    if (prev) partNums.push(...getPartNumsAt(prev, index + i));
    if (next) partNums.push(...getPartNumsAt(next, index + i));
  }

  return dupeRemove(partNums);
}

function getPartNumsAt(line, index) {
  if (index < 0 || index >= line.length || !nums.has(line[index])) return [];

  let start = index;
  while (start > 0 && nums.has(line[start - 1])) start--;

  let end = index;
  while (end < line.length - 1 && nums.has(line[end + 1])) end++;

  if (start !== index || end !== index) {
    return [Number(line.substring(start, end + 1))];
  }

  return [];
}

function dupeRemove(list) {
  return list.filter((num, idx, self) => self.indexOf(num) === idx)
}
