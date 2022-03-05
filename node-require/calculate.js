const add = require('./add');
const subtract = require('./subtract');
const divide = require('./divide');
const multiply = require('./multiply');

if (process.argv[3] === 'plus') {
  console.log(add(parseFloat(process.argv[2]), parseFloat(process.argv[4])));
}

if (process.argv[3] === 'minus') {
  console.log(subtract(parseFloat(process.argv[2]), parseFloat(process.argv[4])));
}

if (process.argv[3] === 'over') {
  console.log(divide(parseFloat(process.argv[2]), parseFloat(process.argv[4])));
}

if (process.argv[3] === 'times') {
  console.log(multiply(parseFloat(process.argv[2]), parseFloat(process.argv[4])));
}
