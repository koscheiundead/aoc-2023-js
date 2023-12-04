const input = require("./input.js");

let total = 0;

input.forEach((line) => {
  const [scratched, winners] = cleanseLine(line)

  total += checkWinners(scratched, winners);
});

function cleanseLine(input) {
  const [cardNumber, output] = input.split(": ");
  let [scratchedOff, winningNumbers] = output.split(" | ");
  scratchedOff = scratchedOff.trim().split(' ');
  winningNumbers = winningNumbers.trim().split(' ');

  return [scratchedOff, winningNumbers]
}

function checkWinners(input, winningNumbers) {
  const winning = new Set(winningNumbers);
  winning.delete('');

  let scratchedWinners = [];

  for (let i = 0; i < input.length; i++) {
    if (winning.has(input[i])) scratchedWinners.push(input[i]);
  }

  return calculatePoints(scratchedWinners);
}

function calculatePoints(input) {
  if (input.length === 0) return 0;
  let points = 1;
  for (let i = 1; i < input.length; i++) {
    points = points * 2;
  }
  return points;
}

console.log(total);
