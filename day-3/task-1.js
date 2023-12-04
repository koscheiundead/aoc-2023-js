const input = require("./input.js");

//declare symbols and numbers
let symbols = new Set("-#=*+@$&/%");
let nums = new Set("1234567890");
let total = 0;

for (let i = 0; i < input.length; i++) {
  let prevLine = i - 1 >= 0 ? input[i - 1] : undefined;
  let line = input[i];
  let nextLine = i + 1 < input.length ? input[i + 1] : undefined;
  let prevIndexes, nextIndexes;
  if (prevLine) {
    //determine list of symbols above and on each upper diagonal
    prevIndexes = findSymbolIndex(prevLine);
  }
  if (nextLine) {
    //determine list of symbols below and on each lower diagonal
    nextIndexes = findSymbolIndex(nextLine);
  }

  for (let j = 0; j < line.length; j++) {
    if (nums.has(line[j])) {
      //identify entire number
      let numStr = "";
      let k = j;
      while (k < line.length && nums.has(line[k])) {
        numStr += line[k];
        k++;
      }
      //check if it's a part number
      if (isPartNumber(line, j, k - j, prevIndexes, nextIndexes)) {
        total += Number(numStr);
      }

      //skip rest of number to continue line
      j = k - 1;
    }
  }
}

console.log(total);

function findSymbolIndex(line) {
  let indexList = [];

  for (let i = 0; i < line.length; i++) {
    if (symbols.has(line[i])) indexList.push(i);
  }

  return indexList;
}

function isPartNumber(line, index, numLength, previousIndexes, nextIndexes) {
  for (let i = 0; i < numLength; i++) {
    for (let j = -1; j <= 1; j++) {
      if (
        symbols.has(line[index + i + j]) ||
        (previousIndexes && previousIndexes.includes(index + i + j)) ||
        (nextIndexes && nextIndexes.includes(index + i + j))
      ) {
        return true;
      }
    }
  }
  return false;
}
