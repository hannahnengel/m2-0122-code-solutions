const takeAChance = require('./take-a-chance');
const promise = takeAChance('Hannah');

promise
  .then(value => { console.log(value); })
  .catch(err => { console.log(err.message); });
