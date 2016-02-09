// start webpack watcher via `webpack --progress --colors --watch`

require('../css/main.css')
require('lodash')
let Deck = require('./lib/deck')

const WHO = 'MIKE';
let greeter = (who) => 'Hello from ' + who + '!';
document.getElementById('app').appendChild(
  document.createTextNode(greeter(WHO))
);

// let options = { decks: 1, jokers: 0, excludeKnights: true }
// let badOptions = { decks: 'ddff', jokers: 0, excludeKnights: true }

console.log('Loading...');
let stack = new Deck();
stack.shuffle()

