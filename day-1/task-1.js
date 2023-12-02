const { input } = require("./input.js");

//set sum to 0 to initialize
let sum = 0;

//iterate through each input
input.forEach((line) => {
  sum += findFirstLastNum(line);
});

function findFirstLastNum(input) {
  const numbersStart = findFirstNum(input);
  const numbersEnd = findLastNum(input);
  return Number(`${numbersStart}${numbersEnd}`);
}

function findFirstNum(input) {
  const numberWords = {
    zero: "0",
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9"
  };

  let nums = "0123456789";

  for (let i = 0; i < input.length; i++) {
    //look for either first instance of number OR first substring with numberword
    let substring = input.slice(i);
    if (nums.includes(substring[0])) return substring[0];

    for (const [word, digit] of Object.entries(numberWords)) {
      if (substring.startsWith(word)) return digit;
    }
  }
}

function findLastNum(input) {
  const numberWords = {
    orez: "0",
    eno: "1",
    owt: "2",
    eerht: "3",
    ruof: "4",
    evif: "5",
    xis: "6",
    neves: "7",
    thgie: "8",
    enin: "9"
  };

  let nums = "0123456789";

  let rev = input.split('').reverse().join('');

  for (let i = 0; i < rev.length; i++) {
    //look for either first instance of number OR first substring with numberword
    let substring = rev.slice(i);
    if (nums.includes(substring[0])) return substring[0];

    for (const [word, digit] of Object.entries(numberWords)) {
      if (substring.startsWith((word))) return digit;
    }
  }
}

console.log(sum);
