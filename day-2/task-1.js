const input = require('./input.js');

let total = 0;

//process each line of input
input.forEach(line => {
  //if is valid game, function returns game ID
  if (validGame(line)) total += validGame(line);
});

//returns either the game ID for a valid game
//or false for an invalid game
function validGame(input) {
  //parse each input into an array
  let [game, results] = input.split(':');
  //define game as its specific id
  game = game.split(' ');
  game = game[1];

  results = results.split(';');
  //process results to confirm 'true' for every input
  //if all inputs pass test, return the game ID as number
  if (results.every(inp => processResult(inp))) return Number(game);

  return false;
}

function processResult(input) {
  const numberMax = {
    red: 12,
    green: 13,
    blue: 14
  }
  //cleanse each input by splitting on commas and trimming whitespace
  let split = input.split(',');
  for (let i = 0; i < split.length; i++ ) {
    //string-state count and color
    const [count, color] = split[i].trim().split(' ');
    if (Number(count) > numberMax[color]) return false;
  }

  return true;
}

console.log(total);
