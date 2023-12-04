const input = require("./input.js");

//total we're looking for:

//how many total scratchcards do we have? 1 copy of 202 individual games
let scratchcards = {}
for (let i = 1; i <= 202; i++) {
  scratchcards[i] = 1;
}

for (let i = 1; i <= 202; i++) {
  let copies = scratchcards[i];
  let points = cleanseLine(input[i - 1]);
  for (let copy = 0; copy < copies; copy++) {
    for (let j = i + 1; j <= Math.min(i + points, 202); j++) {
      scratchcards[j] += 1;
    }
  }
}

let totalCopies = Object.values(scratchcards).reduce((sum, value) => sum + value, 0);
console.log(totalCopies)

function cleanseLine(input) {
  let [game, output] = input.split(": ");
  let [scratchedOff, winningNumbers] = output.split(" | ");
  scratchedOff = scratchedOff.trim().split(' ');
  winningNumbers = winningNumbers.trim().split(' ');

  return checkWinners(scratchedOff, winningNumbers);
}

function checkWinners(input, winningNumbers) {
  const winning = new Set(winningNumbers);
  winning.delete('');

  let scratchedWinners = [];

  for (let i = 0; i < input.length; i++) {
    if (winning.has(input[i])) scratchedWinners.push(input[i]);
  }

  return scratchedWinners.length;
}
