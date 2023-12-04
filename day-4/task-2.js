const input = require("./input.js");

//how many total scratchcards do we have? 1 copy of 202 individual games
let scratchcards = {}
for (let i = 1; i <= 202; i++) {
  scratchcards[i] = 1;
}

//for each game, understand how many copies we have and how many points each copy is worth
//then, allocate additional copies out to remaining games accordingly
for (let i = 1; i <= 202; i++) {
  let copies = scratchcards[i];
  let points = cleanseLine(input[i - 1]);
  for (let copy = 0; copy < copies; copy++) {
    for (let j = i + 1; j <= Math.min(i + points, 202); j++) {
      scratchcards[j] += 1;
    }
  }
}

//sum up all cards to determine how many copies we have. it's too many, folks. we have too many lotto cards.
//i'm worried about you, elf friend.
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
