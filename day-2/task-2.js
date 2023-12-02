const input = require('./input.js');

//determine the minimum cubes per color per game
//that are required to make the game valid
//then, determine the power of each game (minRed * minBlue * minGreen)
//the result we want is the sum of these powers

let total = 0;

input.forEach(line => {
  total += powerPerLine(line);
})

function powerPerLine(input) {
  const [game, results] = input.split(': ')

  const maxRed = findPowerColor(results, 'red');
  const maxBlue = findPowerColor(results, 'blue');
  const maxGreen = findPowerColor(results, 'green')

  return maxRed * maxBlue * maxGreen;
}

function findPowerColor(input, color) {
  const rounds = input.split(';');

  let rightColor = [];
  //parse each round to simplify out everything that ISN'T the correct color
  for (let round of rounds) {
    let result = round.trim().split(', ')
    result.forEach(col => {
      if (col.includes(color)) rightColor.push(col);
    })
  }

  return maxColor(rightColor);
}

function maxColor(input) {
  const cleansedInput = [];
  input.forEach(i => {
    let arr = i.split(' ');
    cleansedInput.push(Number(arr[0]))
  })

  return max(cleansedInput);
}

function max(arr) {
  let max = -Infinity;
  for (let i = 0; i < arr.length; i++) {
    if (max < arr[i]) max = arr[i];
  }

  return max;
}

console.log(total);
